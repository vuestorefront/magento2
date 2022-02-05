/* istanbul ignore file */
import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import { Customer, CustomerCreateInput, CustomerUpdateInput } from '@absolute-web/magento-api';
import useCart from '../useCart';
import { generateUserData } from '../../helpers/userDataGenerator';
import { UseUserFactoryParams, useUserFactory } from '../../factories/useUserFactory';

const factoryParams: UseUserFactoryParams<
Customer,
CustomerUpdateInput & { email?: string; password?: string },
CustomerCreateInput & { email: string; password: string }
> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: Context, params) => {
    Logger.debug('[Magento] Load user information');
    const apiState = context.$magento.config.state;

    if (!apiState.getCustomerToken()) {
      return null;
    }
    try {
      const { data } = await context.$magento.api.customer();

      Logger.debug('[Result]:', { data });

      return data.customer as unknown as Customer;
    } catch {
      // eslint-disable-next-line no-void
      // @ts-ignore
      await factoryParams.logOut(context);
    }

    return null;
  },
  logOut: async (context: Context, params) => {
    const apiState = context.$magento.config.state;

    await context.$magento.api.revokeCustomerToken(params?.customQuery || {});

    apiState.setCustomerToken(null);
    apiState.setCartId(null);
    context.cart.setCart(null);
  },
  updateUser: async (context: Context, params) => {
    Logger.debug('[Magento] Update user information', { params });

    const { email: oldEmail } = params.currentUser;
    const { email, password, ...updateData } = params.updatedUserData;

    const userData = generateUserData(updateData);

    if (email && email !== oldEmail) {
      await context.$magento.api.updateCustomerEmail({
        email,
        password,
      });
    }

    const { data } = await context.$magento.api.updateCustomer(userData);

    Logger.debug('[Result]:', { data });

    return data.updateCustomerV2.customer as unknown as Customer;
  },
  register: async (context: Context, params) => {
    const { email, password, ...baseData } = generateUserData(params);

    const { data, errors } = await context.$magento.api.createCustomer(
      { email, password, ...baseData },
    );

    Logger.debug('[Result]:', { data });

    if (errors) {
      Logger.error(errors);

      throw new Error(errors.map((e) => e.message).join(','));
    }
    if (!data.createCustomerV2 || !data.createCustomerV2.customer) {
      throw new Error('Customer registration error');
    }

    return factoryParams.logIn(context, { username: email, password });
  },
  logIn: async (context: Context, params) => {
    Logger.debug('[Magento] Authenticate user');
    const apiState = context.$magento.config.state;

    const { data, errors } = await context.$magento.api.generateCustomerToken(
      {
        email: params.username,
        password: params.password,
      },
    );

    Logger.debug('[Result]:', { data });

    if (errors) {
      Logger.error(errors);

      throw new Error(errors.map((e) => e.message).join(','));
    }
    if (!data.generateCustomerToken || !data.generateCustomerToken.token) {
      throw new Error('Customer sign-in error');
    }
    apiState.setCustomerToken(data.generateCustomerToken.token);

    // merge existing cart with customer cart
    const currentCartId = apiState.getCartId();
    const cart = await context.$magento.api.customerCart();
    const newCartId = cart.data.customerCart.id;
    let cartErrors;

    if (cart.errors?.length) {
      cartErrors = cart.errors;
    }

    if (newCartId) {
      if (currentCartId && currentCartId !== newCartId) {
        const { data: dataMergeCart, errors: errorsMergeCart } = await context.$magento.api.mergeCarts(
          {
            sourceCartId: currentCartId,
            destinationCartId: newCartId,
          },
          params?.customQuery || {},
        );

        if (errorsMergeCart?.length) {
          cartErrors = cartErrors ? [
            ...cartErrors,
            ...errorsMergeCart,
          ] : errorsMergeCart;
        }

        context.cart.setCart(dataMergeCart.mergeCarts);

        apiState.setCartId(dataMergeCart.mergeCarts.id);
      } else {
        context.cart.setCart(cart.data.customerCart);

        apiState.setCartId(newCartId);
      }
    }

    await context.$magento.api.wishlist({});

    return {
      userData: await factoryParams.load(context),
      errors: cartErrors,
    };
  },
  changePassword: async (context: Context, params) => {
    Logger.debug('[Magento] changing user password');
    const { data, errors } = await context.$magento.api.changeCustomerPassword(params);

    if (errors) {
      Logger.error(errors);

      throw new Error(errors.map((e) => e.message).join(','));
    }

    Logger.debug('[Result] ', { data });

    return data?.changeCustomerPassword as unknown as Customer;
  },
};

export default useUserFactory<
Customer,
CustomerUpdateInput & { email?: string; password?: string },
CustomerCreateInput & { email: string; password: string }
>(factoryParams);
