import { Logger } from '@vue-storefront/core';

import { ref, useContext } from '@nuxtjs/composition-api';
import { UseExternalCheckout } from '~/composables/useExternalCheckout/useExternalCheckout';

export const useExternalCheckout = (): UseExternalCheckout => {
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
    loading,
    error,
  };
};

export default useExternalCheckout;
