/* istanbul ignore file */
import {
  Context, Logger,
  useUserFactory,
  UseUserFactoryParams,
} from '@vue-storefront/core';
import useCart from '../useCart';
import { generateUserData } from '../../helpers/userDataGenerator';

const factoryParams: UseUserFactoryParams<any, any, any> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: Context) => {
    Logger.debug('[Magento] Load user information');
    const apiState = context.$magento.config.state;

    if (!apiState.getCustomerToken()) {
      return null;
    }
    try {
      const { data } = await context.$magento.api.customer();

      Logger.debug('[Result]:', { data });

      return data.customer;
    } catch {
      // eslint-disable-next-line no-void
      // @ts-ignore
      await factoryParams.logOut(context);
    }

    return null;
  },
  logOut: async (context: Context) => {
    const apiState = context.$magento.config.state;

    await context.$magento.api.revokeCustomerToken();

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
      });
    }

    const { data } = await context.$magento.api.updateCustomer(userData);

    Logger.debug('[Result]:', { data });

    return data.updateCustomerV2.customer;
  },
  register: async (context: Context, registerParams) => {
    const { email, password, ...baseData } = generateUserData(registerParams);

    const { data, errors } = await context.$magento.api.createCustomer({ email, password, ...baseData });

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
  logIn: async (context: Context, { username, password }) => {
    Logger.debug('[Magento] Authenticate user', { username });
    const apiState = context.$magento.config.state;

    const { data, errors } = await context.$magento.api.generateCustomerToken(username, password);

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

    if (newCartId && currentCartId && currentCartId !== newCartId) {
      const { data: dataMergeCart } = await context.$magento.api.mergeCarts(currentCartId, newCartId);

      context.cart.setCart(dataMergeCart.mergeCarts);

      apiState.setCartId(dataMergeCart.mergeCarts.id);
    } else {
      context.cart.setCart(cart.data.customerCart);
    }

    await context.$magento.api.wishlist({});

    return factoryParams.load(context);
  },
  changePassword: async (context: Context, {
    currentPassword,
    newPassword,
  }) => {
    const { data, errors } = await context.$magento.api.changeCustomerPassword(currentPassword, newPassword);

    if (errors) {
      Logger.error(errors);

      throw new Error(errors.map((e) => e.message).join(','));
    }

    return data?.changeCustomerPassword;
  },
};

export default useUserFactory<any, any, any>(factoryParams);
