/* istanbul ignore file */
import {
  Context,
  useUserFactory,
  UseUserFactoryParams,
} from '@vue-storefront/core';
import { CustomerUpdateParameters } from '@vue-storefront/magento-api';
import {
  RegisterUserParams,
  UpdateUserParams,
  User,
} from '../../types';
import useCart from '../useCart';

const generateUserData = (userData): CustomerUpdateParameters => {
  const baseData = {
    email: userData.email,
    firstname: userData.firstName || userData.firstname,
    lastname: userData.lastName || userData.lastname,
  } as CustomerUpdateParameters;

  if (userData.dateOfBirth) {
    baseData.date_of_birth = userData.dateOfBirth;
  }
  if (userData.gender) {
    baseData.gender = userData.gender;
  }
  if (userData.taxvat) {
    baseData.taxvat = userData.taxvat;
  }
  if (userData.prefix) {
    baseData.prefix = userData.prefix;
  }
  if (userData.suffix) {
    baseData.suffix = userData.suffix;
  }
  if (userData.password) {
    baseData.password = userData.password;
  }

  return baseData;
};

const factoryParams: UseUserFactoryParams<User, any, any> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: Context) => {
    const apiState = context.$magento.config.state;

    if (!apiState.getCustomerToken()) {
      return null;
    }
    try {
      const response = await context.$magento.api.customer();
      return response.data.customer;
    } catch {
      // eslint-disable-next-line no-void
      await factoryParams.logOut(context);
    }

    return null;
  },
  logOut: async (context: Context) => {
    const apiState = context.$magento.config.state;

    await context.$magento.api.revokeCustomerToken();

    apiState.setCustomerToken(null);
    apiState.setCartId(null);
  },
  updateUser: async (context: Context, { updatedUserData }) => context.$magento.api.updateCustomer(generateUserData(updatedUserData)),
  register: async (context: Context, registerParams) => {
    const { email, password, ...baseData } = generateUserData(registerParams);

    await context.$magento.api.createCustomer({ email, password, ...baseData });

    return factoryParams.logIn(context, { username: email, password });
  },
  logIn: async (context: Context, { username, password }) => {
    const apiState = context.$magento.config.state;
    const response = await context.$magento.api.generateCustomerToken(username, password);

    apiState.setCustomerToken(response.data.generateCustomerToken.token);

    // merge existing cart with customer cart
    const currentCartId = apiState.getCartId();
    const cart = await context.$magento.api.customerCart();
    const newCartId = cart.data.customerCart.id;
    if (newCartId && currentCartId && currentCartId !== newCartId) {
      const { data } = await context.$magento.api.mergeCarts(currentCartId, newCartId);
      context.cart.setCart(data.mergeCarts);
      apiState.setCartId(data.mergeCarts.id);
    }

    return factoryParams.load(context, { username, password });
  },
  changePassword: async function changePassword(context: Context, { currentPassword, newPassword }) {
    return context.$magento.api.changeCustomerPassword(currentPassword, newPassword);
  },
};

export default useUserFactory<User, UpdateUserParams, RegisterUserParams>(factoryParams);
