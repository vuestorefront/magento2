import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { UseExternalCheckoutInterface } from '~/composables/useExternalCheckout/useExternalCheckout';

/**
 * The `useExternalCheckout` composable is responsible for
 * redirecting checkout process and depends on {@link https://github.com/Vendic/magento2-external-checkout | Magento 2 External Checkout for Vue Storefront} repository.
 *
 * See the {@link UseExternalCheckoutInterface} page for more information.
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
          // @TODO: Implements Multiple Store
          /* if (Object.keys(externalCheckout.stores).length) {

          } */
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
