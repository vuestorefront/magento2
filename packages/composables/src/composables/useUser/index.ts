/* istanbul ignore file */

import { useUserFactory, UseUserFactoryParams, Context } from '@vue-storefront/core';
import { CustomerUpdateParameters } from '@vue-storefront/magento-api';
import { RegisterUserParams, UpdateUserParams, User } from '../../types';

const params: UseUserFactoryParams<User, any, any> = {
  load: async (context: Context, parameters) => {
    const apiState = context.$ma.config.state;

    if (!apiState.getCustomerToken()) {
      return null;
    }
    try {
      const response = await context.$ma.api.customer();
      return response.data.customer;
    } catch {
      await params.logOut(context, parameters);
    }

    return null;
  },
  logOut: async (context: Context) => {
    const apiState = context.$ma.config.state;

    if (apiState.getCustomerToken()) {
      await context.$ma.api.revokeCustomerToken();
    }

    apiState.setCustomerToken(null);
    apiState.setCartId(null);
  },
  updateUser: async (context: Context, { updatedUserData }) => await context.$ma.api.updateCustomer({
    email: updatedUserData.email,
    firstname: updatedUserData.firstName,
    lastname: updatedUserData.lastName,
  } as CustomerUpdateParameters),
  register: async (context: Context, {
    email, password, firstName, lastName,
  }) => {
    await context.$ma.api.createCustomer({
      email,
      firstname: firstName,
      lastname: lastName,
      password,
    } as CustomerUpdateParameters);
    return params.logIn(context, { username: email, password });
  },
  logIn: async (context: Context, { username, password }) => {
    const apiState = context.$ma.config.state;
    const response = await context.$ma.api.generateCustomerToken(username, password);

    apiState.setCustomerToken(response.data.generateCustomerToken.token);

    // merge existing cart with customer cart
    const currentCartId = apiState.getCartId();
    const cart = await context.$ma.api.customerCart();
    const newCartId = cart.data.customerCart.id;
    if (newCartId && currentCartId && currentCartId !== newCartId) {
      const newCart = await context.$ma.api.mergeCarts(currentCartId, newCartId);
      apiState.setCartId(newCart.data.mergeCarts.id);
    }

    return params.load(context, { username, password });
  },
  changePassword: async function changePassword(context: Context, { currentPassword, newPassword }) {
    return await context.$ma.api.changeCustomerPassword(currentPassword, newPassword);
  },
};

export default useUserFactory<User, UpdateUserParams, RegisterUserParams>(params);
