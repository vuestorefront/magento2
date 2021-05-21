import { Ref, computed } from 'vue-demi';
import {
  Context,
  configureFactoryParams,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseGuestUser, UseGuestUserErrors } from '../types/composeables';

export interface UseGuestUserFactoryParams<GUEST_USER, REGISTER_GUEST_USER_PARAMS> extends FactoryParams {
  attachToCart: (context: Context, params: REGISTER_GUEST_USER_PARAMS) => Promise<GUEST_USER>;
}

export const useUserFactory = <GUEST_USER, REGISTER_GUEST_USER_PARAMS extends { email: string; password: string }>(
  factoryParams: UseGuestUserFactoryParams<GUEST_USER, REGISTER_GUEST_USER_PARAMS>,
) => function useUser(): UseGuestUser<GUEST_USER> {
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
    Logger.debug('useUserFactory.setGuestUser', newUser);
  };

  const resetErrorValue = () => {
    error.value = errorsFactory();
  };

  const attachToCart = async ({ user: providedUser }) => {
    Logger.debug('useUserFactory.attachToCart', providedUser);
    resetErrorValue();

    try {
      loading.value = true;
      guestUser.value = await _factoryParams.attachToCart(providedUser);
      error.value.attachToCart = null;
    } catch (err) {
      error.value.attachToCart = err;
      Logger.error('useUser/attachToCart', err);
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
