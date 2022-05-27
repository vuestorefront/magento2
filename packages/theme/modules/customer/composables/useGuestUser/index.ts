import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';
import { Logger } from '~/helpers/logger';
import { AttachToCartParams, UseGuestUserInterface, UseGuestUserErrors } from '~/modules/customer/composables/useGuestUser/useGuestUser';
import { attachToCartCommand } from '~/modules/customer/composables/useGuestUser/commands/attachToCartCommand';

/**
 * Allows to attach a guest cart to a user.
 *
 * See the {@link UseGuestUserInterface} for a list of methods and values available in this composable.
 */
export function useGuestUser<PARAMS extends AttachToCartParams>(): UseGuestUserInterface<PARAMS> {
  const loading = ref(false);
  const error = ref<UseGuestUserErrors>({ attachToCart: null });
  const context = useContext();

  const attachToCart = async (params: ComposableFunctionArgs<PARAMS>) => {
    Logger.debug('useGuestUserFactory.attachToCart', { params });

    try {
      loading.value = true;
      await attachToCartCommand.execute(context, params);

      error.value.attachToCart = null;
    } catch (err) {
      error.value.attachToCart = err;
      Logger.error('useGuestUser/attachToCart', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    attachToCart,
    loading: readonly(loading),
    error: readonly(error),
  };
}

export * from './useGuestUser';
export default useGuestUser;
