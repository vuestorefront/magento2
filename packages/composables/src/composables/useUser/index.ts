/* istanbul ignore file */
import {
  Context,
  useUserFactory,
  UseUserFactoryParams,
} from '@vue-storefront/core';
import { CustomerUpdateParameters } from '@vue-storefront/magento-api';
import useCart from '../useCart';
import { User } from '../../types';

const generateUserData = (userData): CustomerUpdateParameters => {
  const baseData = {
    email: userData.email,
    firstname: userData.firstName || userData.firstname,
    lastname: userData.lastName || userData.lastname,
  } as CustomerUpdateParameters;

  if (Object.prototype.hasOwnProperty.call(userData, 'is_subscribed')) {
    baseData.is_subscribed = userData.is_subscribed;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'dateOfBirth') || Object.prototype.hasOwnProperty.call(userData, 'date_of_birth')) {
    baseData.date_of_birth = userData.dateOfBirth || userData.date_of_birth;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'allow_remote_shopping_assistance')) {
    baseData.allow_remote_shopping_assistance = userData.allow_remote_shopping_assistance;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'gender')) {
    baseData.gender = userData.gender;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'taxvat')) {
    baseData.taxvat = userData.taxvat;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'prefix')) {
    baseData.prefix = userData.prefix;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'suffix')) {
    baseData.suffix = userData.suffix;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'password')) {
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
      const { data } = await context.$magento.api.customer();
      return data.customer;
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
  updateUser: async (context: Context, params) => {
    const { email: oldEmail } = params.currentUser;
    const { email, password, ...updateData } = params.updatedUserData;

    const userData = generateUserData(updateData);

    if (email !== oldEmail) {
      await context.$magento.api.updateCustomerEmail({
        email,
        password,
      });
    }

    const { data } = await context.$magento.api.updateCustomer(userData);

    return data.updateCustomerV2.customer;
  },
  register: async (context: Context, registerParams) => {
    const { email, password, ...baseData } = generateUserData(registerParams);

    await context.$magento.api.createCustomer({ email, password, ...baseData });

    return factoryParams.logIn(context, { username: email, password });
  },
  logIn: async (context: Context, { username, password }) => {
    const apiState = context.$magento.config.state;

    const { data } = await context.$magento.api.generateCustomerToken(username, password);

    apiState.setCustomerToken(data.generateCustomerToken.token);

    // merge existing cart with customer cart
    const currentCartId = apiState.getCartId();
    const cart = await context.$magento.api.customerCart();
    const newCartId = cart.data.customerCart.id;

    if (newCartId && currentCartId && currentCartId !== newCartId) {
      const { data: dataMergeCart } = await context.$magento.api.mergeCarts(currentCartId, newCartId);

      context.cart.setCart(dataMergeCart.mergeCarts);

      apiState.setCartId(dataMergeCart.mergeCarts.id);
    }

    return factoryParams.load(context, { username, password });
  },
  changePassword: async function changePassword(context: Context, { currentPassword, newPassword }) {
    return context.$magento.api.changeCustomerPassword(currentPassword, newPassword);
  },
};

export default useUserFactory<User, any, any>(factoryParams);
