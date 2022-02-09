import {
  Ref, ref, computed, useContext,
} from '@nuxtjs/composition-api';
import { Logger, mask } from '@vue-storefront/core';
import { useCart } from '@vue-storefront/magento'; // todo: replace by the new useCart composable when it will be done

import { useCustomerStore } from '~/stores/customer';
import { generateUserData } from '~/helpers/customer/userDataGenerator';
import { UseUser } from '~/composables/useUser/useUser';

export const useUser = (): UseUser => {
  const customerStore = useCustomerStore();
  const { app } = useContext();
  const { setCart } = useCart();
  const loading: Ref<boolean> = ref(false);
  const isAuthenticated = computed(() => Boolean(customerStore.user?.firstname));
  const errorsFactory = () => ({
    updateUser: null,
    register: null,
    login: null,
    logout: null,
    changePassword: null,
    load: null,
  });
  const error: Ref = ref(errorsFactory());

  const setUser = (newUser) => {
    customerStore.user = newUser;
    Logger.debug('useUserFactory.setUser', newUser);
  };

  const resetErrorValue = () => {
    error.value = errorsFactory();
  };

  // eslint-disable-next-line consistent-return
  const updateUser = async ({ user: providedUser, customQuery }) => {
    Logger.debug('[Magento] Update user information', { providedUser, customQuery });
    resetErrorValue();

    try {
      loading.value = true;
      const { email: oldEmail } = customerStore.user;
      const { email, password, ...updateData } = providedUser;

      const userData = generateUserData(updateData);

      if (email && email !== oldEmail) {
        await app.context.$vsf.$magento.api.updateCustomerEmail({
          email,
          password,
        });
      }

      const { data, errors } = await app.context.$vsf.$magento.api.updateCustomer(userData);
      Logger.debug('[Result]:', { data });

      if (errors) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        Logger.error(errors.map((e) => e.message).join(','));
      }

      customerStore.user = data?.updateCustomerV2?.customer || {};
      error.value.updateUser = null;
    } catch (err) {
      error.value.updateUser = err;
      Logger.error('useUser/updateUser', err);
    } finally {
      loading.value = false;
    }
  };

  const logout = async ({ customQuery = {} } = {}) => {
    Logger.debug('[Magento] useUserFactory.logout');
    resetErrorValue();

    try {
      const apiState = app.context.$vsf.$magento.config.state;

      await app.context.$vsf.$magento.api.revokeCustomerToken({ customQuery });

      apiState.setCustomerToken(null);
      apiState.setCartId(null);
      setCart(null);
      error.value.logout = null;
      customerStore.user = null;
    } catch (err) {
      error.value.logout = err;
      Logger.error('useUser/logout', err);
    }
  };

  const load = async ({ customQuery } = { customQuery: undefined }) => {
    Logger.debug('[Magento] useUser.load');
    resetErrorValue();

    try {
      loading.value = true;
      // user.value = await _factoryParams.load({customQuery});

      const apiState = app.context.$vsf.$magento.config.state;

      if (!apiState.getCustomerToken()) {
        return null;
      }
      try {
        const { data } = await app.context.$vsf.$magento.api.customer(customQuery);

        Logger.debug('[Result]:', { data });

        customerStore.user = data?.customer ?? {};

        return customerStore.user;
      } catch {
        // eslint-disable-next-line no-void
        // @ts-ignore
        await logout();
      }
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useUser/load', err);
    } finally {
      loading.value = false;
    }
  };

  // eslint-disable-next-line @typescript-eslint/require-await,no-empty-pattern
  const login = async ({ user: providedUser, customQuery }) => {
    Logger.debug('[Magento] useUser.login', providedUser);
    resetErrorValue();

    try {
      loading.value = true;
      const apiState = app.context.$vsf.$magento.config.state;

      const { data, errors } = await app.context.$vsf.$magento.api.generateCustomerToken(
        {
          email: providedUser.username,
          password: providedUser.password,
          recaptchaToken: providedUser.recaptchaToken,
        },
        customQuery || {},
      );

      Logger.debug('[Result]:', { data });

      if (errors) {
        Logger.error(errors.map((e) => e.message).join(','));
      }

      if (!data.generateCustomerToken || !data.generateCustomerToken.token) {
        Logger.error('Customer sign-in error'); // todo: handle errors in better way
      }
      apiState.setCustomerToken(data.generateCustomerToken.token);

      // merge existing cart with customer cart
      // todo: move this logic to separate method
      const currentCartId = apiState.getCartId();
      const cart = await app.context.$vsf.$magento.api.customerCart();
      const newCartId = cart.data.customerCart.id;

      if (newCartId && currentCartId && currentCartId !== newCartId) {
        const { data: dataMergeCart } = await app.context.$vsf.$magento.api.mergeCarts(
          {
            sourceCartId: currentCartId,
            destinationCartId: newCartId,
          },
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setCart(dataMergeCart.mergeCarts);

        apiState.setCartId(dataMergeCart.mergeCarts.id);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setCart(cart.data.customerCart);
      }

      error.value.login = null;
      customerStore.user = load();

      return customerStore.user;
    } catch (err) {
      error.value.login = err;
      Logger.error('useUser/login', err);
    } finally {
      loading.value = false;
    }
  };

  // eslint-disable-next-line consistent-return
  const register = async ({ user: providedUser, customQuery }) => {
    Logger.debug('[Magento] useUser.register', providedUser);
    resetErrorValue();

    try {
      loading.value = true;

      console.log('data', providedUser);

      const {
        email,
        password,
        recaptchaToken,
        ...baseData
      } = generateUserData(providedUser);

      const { data, errors } = await app.context.$vsf.$magento.api.createCustomer(
        {
          email,
          password,
          recaptchaToken,
          ...baseData,
        },
        customQuery || {},
      );

      Logger.debug('[Result]:', { data });

      if (errors) {
        Logger.error(errors.map((e) => e.message).join(','));
      }

      if (!data || !data.createCustomerV2 || !data.createCustomerV2.customer) {
        Logger.error('Customer registration error'); // todo: handle errors in better way
      }

      // if (recaptchaToken) { // todo: move recaptcha to separate module
      //   // generate a new token for the login action
      //   const { recaptchaInstance } = params;
      //   const newRecaptchaToken = await recaptchaInstance.getResponse();
      //
      //   return factoryParams.logIn(context, { username: email, password, recaptchaToken: newRecaptchaToken });
      // }
      error.value.register = null;
      customerStore.user = login({ user: { username: email, password }, customQuery: {} });

      return customerStore.user;
    } catch (err) {
      error.value.register = err;
      Logger.error('useUser/register', err);
    } finally {
      loading.value = false;
    }
  };

  // eslint-disable-next-line consistent-return
  const changePassword = async (params) => {
    Logger.debug('[Magento] useUser.changePassword', { currentPassword: mask(params.current), newPassword: mask(params.new) });
    resetErrorValue();

    try {
      loading.value = true;

      const { data, errors } = await app.context.$vsf.$magento.api.changeCustomerPassword({
        currentUser: customerStore.user,
        currentPassword: params.current,
        newPassword: params.new,
        customQuery: params.customQuery,
      });

      if (errors) {
        Logger.error(errors.map((e) => e.message).join(','));
      }

      Logger.debug('[Result] ', { data });

      customerStore.user = data?.changeCustomerPassword;
      error.value.changePassword = null;
    } catch (err) {
      error.value.changePassword = err;
      Logger.error('useUser/changePassword', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    user: computed(() => customerStore.user),
    loading,
    isAuthenticated,
    error,
    setUser,
    updateUser,
    register,
    login,
    logout,
    changePassword,
    load,
  };
};

export default useUser;
