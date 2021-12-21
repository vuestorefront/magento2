import { Ref, computed } from '@vue/composition-api';
import {
  Context,
  configureFactoryParams,
  FactoryParams,
  Logger,
  sharedRef, ComposableFunctionArgs,
} from '@vue-storefront/core';
import { PlatformApi } from '@vue-storefront/core/lib/src/types';
import { UseGuestUser, UseGuestUserErrors } from '../types/composables';

export interface UseGuestUserFactoryParams<GUEST_USER,
  REGISTER_GUEST_USER_PARAMS,
  API extends PlatformApi = any> extends FactoryParams<API> {
  attachToCart: (context: Context, params: ComposableFunctionArgs<REGISTER_GUEST_USER_PARAMS>) => Promise<GUEST_USER>;
}

export const useGuestUserFactory = <GUEST_USER,
  REGISTER_GUEST_USER_PARAMS extends { email: string; password: string },
  API extends PlatformApi = any>(
  factoryParams: UseGuestUserFactoryParams<GUEST_USER, REGISTER_GUEST_USER_PARAMS, API>,
) => function useGuestUser(): UseGuestUser<GUEST_USER, REGISTER_GUEST_USER_PARAMS, API> {
  const errorsFactory = (): UseGuestUserErrors => ({
    attachToCart: null,
  });

  const guestUser: Ref<GUEST_USER> = sharedRef(null, 'useGuestUser-user');
  const loading: Ref<boolean> = sharedRef(false, 'useGuestUser-loading');
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);
  const error: Ref<UseGuestUserErrors> = sharedRef(errorsFactory(), 'useGuestUser-error');

  const setGuestUser = (newUser: GUEST_USER) => {
    guestUser.value = newUser;
    Logger.debug('useGuestUserFactory.setGuestUser', newUser);
  };

  const resetErrorValue = () => {
    error.value = errorsFactory();
  };

  const attachToCart = async (params: ComposableFunctionArgs<REGISTER_GUEST_USER_PARAMS>) => {
    Logger.debug('useGuestUserFactory.attachToCart', { params });
    resetErrorValue();

    try {
      loading.value = true;
      guestUser.value = await _factoryParams.attachToCart(params);
      error.value.attachToCart = null;
    } catch (err) {
      error.value.attachToCart = err;
      Logger.error('useGuestUser/attachToCart', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    setGuestUser,
    attachToCart,
    guestUser: computed(() => guestUser.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};
