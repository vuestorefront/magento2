import { ref, useContext } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';
import { Logger } from '~/helpers/logger';
import { AttachToCartParams, UseGuestUser, UseGuestUserErrors } from '~/composables/useGuestUser/useGuestUser';
import { attachToCartCommand } from '~/composables/useGuestUser/commands/attachToCartCommand';

export const useGuestUser = <PARAMS extends AttachToCartParams>(): UseGuestUser<PARAMS> => {
  const loading = ref(false);
  const error = ref<UseGuestUserErrors>({ attachToCart: null });
  const { app } = useContext();
  const context = app.$vsf;

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
    loading,
    error,
  };
};

export default useGuestUser;
