import {
  ref,
  readonly,
  computed,
  useContext,
} from '@nuxtjs/composition-api';
import type { Ref } from '@nuxtjs/composition-api';
import mask from '~/composables/utils/mask';
import { Logger } from '~/helpers/logger';
import { useCustomerStore } from '~/stores/customer';
import { useCart } from '~/composables';
import { generateUserData } from '~/modules/customer/helpers/generateUserData';
import type {
  User,
  UseUserInterface,
  UseUserLoadParams,
  UseUserLoginParams,
  UseUserLogoutParams,
  UseUserRegisterParams,
  UseUserUpdateUserParams,
  UseUserChangePasswordParams,
} from './useUser';

/**
 * The `useUser()` composable allows loading and manipulating data of the current user.
 *
 * See the {@link UseUserInterface} page for more information.
 */
export function useUser(): UseUserInterface {
  const customerStore = useCustomerStore();
  const { app } = useContext();
  const { setCart } = useCart();
  const loading: Ref<boolean> = ref(false);
  const errorsFactory = () => ({
    updateUser: null,
    register: null,
    login: null,
    logout: null,
    changePassword: null,
    load: null,
  });
  const error: Ref = ref(errorsFactory());

  const setUser = (newUser: User) => {
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
  const updateUser = async ({ user: providedUser, customQuery }: UseUserUpdateUserParams) => {
    Logger.debug('[Magento] Update user information', { providedUser, customQuery });
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

      const { data, errors } = await app.context.$vsf.$magento.api.updateCustomer(userData);
      Logger.debug('[Result]:', { data });

      if (errors) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        Logger.error(errors.map((e) => e.message).join(','));
        error.value.updateUser = errors.map((e) => e.message).join(',');
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

  const logout = async ({ customQuery = {} }: UseUserLogoutParams = {}) => {
    Logger.debug('[Magento] useUserFactory.logout');
    resetErrorValue();

    try {
      const apiState = app.context.$vsf.$magento.config.state;

      await app.context.$vsf.$magento.api.revokeCustomerToken({ customQuery });

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

  const load = async ({ customQuery = {} }: UseUserLoadParams = {}) => {
    Logger.debug('[Magento] useUser.load');
    resetErrorValue();

    try {
      loading.value = true;
      const apiState = app.context.$vsf.$magento.config.state;

      if (!apiState.getCustomerToken()) {
        return null;
      }
      try {
        const { data } = await app.context.$vsf.$magento.api.customer(customQuery);

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
  const login = async ({ user: providedUser, customQuery }: UseUserLoginParams) : Promise<void> => {
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
      customerStore.setIsLoggedIn(true);
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
    } catch (err) {
      error.value.login = err;
      Logger.error('useUser/login', err);
    } finally {
      loading.value = false;
    }
  };

  // eslint-disable-next-line consistent-return
  const register = async ({ user: providedUser, customQuery }: UseUserRegisterParams) : Promise<void> => {
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
      await login({ user: { username: email, password }, customQuery: {} });
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
