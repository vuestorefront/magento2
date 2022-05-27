import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import type { UseExternalCheckoutInterface } from '~/composables/useExternalCheckout/useExternalCheckout';

/**
 * Allows redirecting to external checkout process. It depends on the {@link https://github.com/Vendic/magento2-external-checkout | magento2-external-checkout repository}.
 *
 * See the {@link UseExternalCheckoutInterface} for a list of methods and values available in this composable.
 */
export function useExternalCheckout(): UseExternalCheckoutInterface {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref(null);

  // eslint-disable-next-line consistent-return
  const initializeCheckout = (params) => {
    Logger.debug('[Magento]: Initialize external checkout', { params });

    try {
      const { externalCheckout, state } = app.context.$vsf.$magento.config;
      const userToken = state.getCustomerToken();
      const cartToken = state.getCartId();

      Logger.debug({ userToken, cartToken });
      loading.value = true;

      if (externalCheckout.enable) {
        if (userToken && cartToken) {
          window.location.replace(`${externalCheckout.cmsUrl}${externalCheckout.syncUrlPath}/token/${userToken}/cart/${cartToken}`);
          return '';
        }

        window.location.replace(`${externalCheckout.cmsUrl}${externalCheckout.syncUrlPath}/token//cart/${cartToken}`);
        return '';
      }

      return params.baseUrl;
    } catch (err) {
      error.value = err;
      Logger.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    initializeCheckout,
    loading: readonly(loading),
    error: readonly(error),
  };
}

export * from './useExternalCheckout';
export default useExternalCheckout;
