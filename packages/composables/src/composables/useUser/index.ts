/* istanbul ignore file */
import {
  Context, Logger,
  useUserFactory,
  UseUserFactoryParams,
} from '@vue-storefront/core';
import { CustomerCreateInput, UpdateCustomerEmailMutationVariables } from '@vue-storefront/magento-api';
import useCart from '../useCart';
import { generateUserData } from '../../helpers/userDataGenerator';

const factoryParams: UseUserFactoryParams<
any,
UpdateCustomerEmailMutationVariables,
CustomerCreateInput
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
      const { data } = await context.$magento.api.customer(params.customQuery || {});

      Logger.debug('[Result]:', { data });

      return data.customer;
    } catch {
      // eslint-disable-next-line no-void
      // @ts-ignore
      await factoryParams.logOut(context);
    }

    return null;
  },
  logOut: async (context: Context, params) => {
    const apiState = context.$magento.config.state;

    await context.$magento.api.revokeCustomerToken(params);

    apiState.setCustomerToken(null);
    apiState.setCartId(null);
    // context.cart.setCart(null);
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
      }, params.customQuery || {});
    }

    const { data } = await context.$magento.api.updateCustomer(userData, params.customQuery || {});

    Logger.debug('[Result]:', { data });

    return data.updateCustomerV2.customer;
  },
  register: async (context: Context, params) => {
    const { email, password, ...baseData } = generateUserData(params);

    const { data, errors } = await context.$magento.api.createCustomer(
      { email, password, ...baseData },
      params.customQuery || {},
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
      params.customQuery || {},
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
    const cart = await context.$magento.api.customerCart(params.customQuery || {});
    const newCartId = cart.data.customerCart.id;

    if (newCartId && currentCartId && currentCartId !== newCartId) {
      const { data: dataMergeCart } = await context.$magento.api.mergeCarts(
        {
          sourceCartId: currentCartId,
          destinationCartId: newCartId,
        },
        params.customQuery || {},
      );

      context.cart.setCart(dataMergeCart.mergeCarts);

      apiState.setCartId(dataMergeCart.mergeCarts.id);
    } else {
      context.cart.setCart(cart.data.customerCart);
    }

    await context.$magento.api.wishlist({}, params.customQuery || {});

    return factoryParams.load(context);
  },
  changePassword: async (context: Context, params) => {
    Logger.debug('[Magento] changing user password');
    const { data, errors } = await context.$magento.api.changeCustomerPassword(params, params.customQuery || {});

    if (errors) {
      Logger.error(errors);

      throw new Error(errors.map((e) => e.message).join(','));
    }

    Logger.debug('[Result] ', { data });

    return data?.changeCustomerPassword;
  },
};

export default useUserFactory<
any,
UpdateCustomerEmailMutationVariables,
CustomerCreateInput & { email: string; password: string }
>(factoryParams);
