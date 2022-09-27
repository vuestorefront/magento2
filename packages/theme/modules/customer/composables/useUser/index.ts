import {
  ref,
  readonly,
  computed,
  useContext,
} from '@nuxtjs/composition-api';
import type { Ref } from '@nuxtjs/composition-api';
import mask from '~/composables/utils/mask';
import { Logger } from '~/helpers/logger';
import { useCustomerStore } from '~/modules/customer/stores/customer';
import { useCart } from '~/modules/checkout/composables/useCart';
import { generateUserData } from '~/modules/customer/helpers/generateUserData';
import { useUiNotification } from '~/composables/useUiNotification';
import type { Customer } from '~/modules/GraphQL/types';
import type {
  UseUserInterface,
  UseUserErrors,
  UseUserLoadParams,
  UseUserLoginParams,
  UseUserLogoutParams,
  UseUserRegisterParams,
  UseUserUpdateUserParams,
  UseUserChangePasswordParams,
} from './useUser';

/**
 * Allows loading and manipulating data of the current user.
 *
 * See the {@link UseUserInterface} for a list of methods and values available in this composable.
 */
export function useUser(): UseUserInterface {
  const customerStore = useCustomerStore();
  // @ts-ignore
  const { app, $recaptcha } = useContext();
  const { setCart } = useCart();
  const { send: sendNotification } = useUiNotification();
  const loading: Ref<boolean> = ref(false);
  const errorsFactory = () : UseUserErrors => ({
    updateUser: null,
    register: null,
    login: null,
    logout: null,
    changePassword: null,
    load: null,
  });
  const error: Ref = ref(errorsFactory());

  const setUser = (newUser: Customer) => {
    customerStore.user = newUser;
    Logger.debug('useUserFactory.setUser', newUser);
  };

  const resetErrorValue = () => {
    error.value = errorsFactory();
  };

  const updateCustomerEmail = async (credentials: { email: string, password: string }): Promise<void> => {
    const { errors } = await app.context.$vsf.$magento.api.updateCustomerEmail(credentials);

    if (errors) {
      throw errors.map((e) => e.message).join(',');
    }
  };

  // eslint-disable-next-line consistent-return
  const updateUser = async ({ user: providedUser, customQuery, customHeaders }: UseUserUpdateUserParams) => {
    Logger.debug('[Magento] Update user information', { providedUser, customQuery, customHeaders });
    resetErrorValue();

    try {
      loading.value = true;
      const { email: oldEmail } = customerStore.user;
      const { email, password, ...updateData } = providedUser;

      const userData = generateUserData(updateData);

      if (email && email !== oldEmail) {
        await updateCustomerEmail({
          email,
          password,
        });
      }

      const { data, errors } = await app.context.$vsf.$magento.api.updateCustomer(userData, customQuery, customHeaders);
      Logger.debug('[Result]:', { data });

      if (errors) {
        const allErrorMessages = errors.map((e) => e.message).join(',');
        Logger.error(allErrorMessages);
        error.value.updateUser = allErrorMessages;
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

  const logout = async ({ customQuery = {}, customHeaders = {} }: UseUserLogoutParams = {}) => {
    Logger.debug('[Magento] useUserFactory.logout');
    resetErrorValue();

    try {
      const apiState = app.context.$vsf.$magento.config.state;

      await app.context.$vsf.$magento.api.revokeCustomerToken(customQuery, customHeaders);

      apiState.removeCustomerToken();
      apiState.removeCartId();
      setCart(null);
      customerStore.setIsLoggedIn(false);
      error.value.logout = null;
      customerStore.user = null;
    } catch (err) {
      error.value.logout = err;
      Logger.error('useUser/logout', err);
    }
  };

  const load = async ({ customQuery = {}, customHeaders = {} }: UseUserLoadParams = {}) => {
    Logger.debug('[Magento] useUser.load');
    resetErrorValue();

    try {
      loading.value = true;
      const apiState = app.context.$vsf.$magento.config.state;

      if (!apiState.getCustomerToken()) {
        return null;
      }
      try {
        const { data } = await app.context.$vsf.$magento.api.customer(customQuery, customHeaders);

        Logger.debug('[Result]:', { data });

        customerStore.user = data?.customer ?? {};
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

    return customerStore.user;
  };

  // eslint-disable-next-line @typescript-eslint/require-await,no-empty-pattern
  const login = async ({ user: providedUser, customQuery, customHeaders }: UseUserLoginParams) : Promise<void> => {
    Logger.debug('[Magento] useUser.login', providedUser);
    resetErrorValue();

    try {
      loading.value = true;
      const apiState = app.context.$vsf.$magento.config.state;

      const { data, errors } = await app.$vsf.$magento.api.generateCustomerToken(
        {
          email: providedUser.email,
          password: providedUser.password,
          recaptchaToken: providedUser.recaptchaToken,
        },
        customQuery || {},
        customHeaders || {},
      );
      Logger.debug('[Result]:', { data });

      if (errors) {
        const joinedErrors = errors.map((e) => e.message).join(',');
        Logger.error(joinedErrors);
        errors.forEach((registerError, i) => sendNotification({
          icon: 'error',
          id: Symbol(`registration_error-${i}`),
          message: registerError.message,
          persist: true,
          title: 'Registration error',
          type: 'danger',
        }));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new Error(joinedErrors);
      }

      customerStore.setIsLoggedIn(true);
      apiState.setCustomerToken(data.generateCustomerToken.token);

      // merge existing cart with customer cart
      // todo: move this logic to separate method
      const currentCartId = apiState.getCartId();
      const cart = await app.context.$vsf.$magento.api.customerCart();
      const newCartId = cart.data.customerCart.id;

      try {
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
      } catch {
        // Workaround for Magento 2.4.4 mergeCarts mutation error related with Bundle products
        // It can be removed when Magento 2.4.5 will be release
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setCart(cart.data.customerCart);
      }
      error.value.login = null;
    } catch (err) {
      error.value.login = err;
      Logger.error('useUser/login', err);
    } finally {
      loading.value = false;
    }
  };

  // eslint-disable-next-line consistent-return
  const register = async ({ user: providedUser, customQuery, customHeaders }: UseUserRegisterParams) : Promise<void> => {
    Logger.debug('[Magento] useUser.register', providedUser);
    resetErrorValue();

    try {
      loading.value = true;

      const {
        email,
        password,
        recaptchaToken,
        ...baseData
      } = generateUserData(providedUser);

      const { data, errors } = await app.$vsf.$magento.api.createCustomer(
        {
          email,
          password,
          recaptchaToken,
          ...baseData,
        },
        customQuery || {},
        customHeaders || {},
      );

      Logger.debug('[Result]:', { data });

      if (errors) {
        const joinedErrors = errors.map((e) => e.message).join(',');
        Logger.error(joinedErrors);
        errors.forEach((registerError, i) => sendNotification({
          icon: 'error',
          id: Symbol(`registration_error-${i}`),
          message: registerError.message,
          persist: true,
          title: 'Registration error',
          type: 'danger',
        }));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new Error(joinedErrors);
      }
      error.value.register = null;
      let loginRecaptchaToken = '';
      if ($recaptcha && recaptchaToken) {
        loginRecaptchaToken = await $recaptcha.getResponse();
      }

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { customer: { customer_create_account_confirm } } = app.context.$vsf.$magento.config;

      if (customer_create_account_confirm) {
        return await new Promise((resolve) => {
          sendNotification({
            id: Symbol('registration_confirmation'),
            message: app.i18n.t('You must confirm your account. Please check your email for the confirmation link.') as string,
            persist: true,
            title: 'Registration confirmation',
            type: 'success',
            icon: 'check',
          });

          resolve();
        });
      }
      await login({ user: { email, password, recaptchaToken: loginRecaptchaToken }, customQuery: {} });
    } catch (err) {
      error.value.register = err;
      Logger.error('useUser/register', err);
    } finally {
      loading.value = false;
    }
  };

  // eslint-disable-next-line consistent-return
  const changePassword = async (params: UseUserChangePasswordParams) => {
    Logger.debug('[Magento] useUser.changePassword', { currentPassword: mask(params.current), newPassword: mask(params.new) });
    resetErrorValue();

    try {
      loading.value = true;

      const { data, errors } = await app.context.$vsf.$magento.api.changeCustomerPassword({
        currentUser: customerStore.user,
        currentPassword: params.current,
        newPassword: params.new,
      }, params.customQuery, params?.customHeaders);

      let joinedErrors = null;

      if (errors) {
        joinedErrors = errors.map((e) => e.message).join(',');
        Logger.error(joinedErrors);
      }

      Logger.debug('[Result] ', { data });

      customerStore.user = data?.changeCustomerPassword;
      error.value.changePassword = joinedErrors;
    } catch (err) {
      error.value.changePassword = err;
      Logger.error('useUser/changePassword', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    setUser,
    updateUser,
    register,
    login,
    logout,
    changePassword,
    load,
    loading: readonly(loading),
    error: readonly(error),
    user: computed(() => customerStore.user),
    isAuthenticated: computed(() => customerStore.isLoggedIn),
  };
}

export default useUser;
export * from './useUser';
