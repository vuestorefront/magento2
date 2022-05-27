/**
 * @deprecated since version 1.0.0
 */
import { Context, Logger } from '@vue-storefront/core';
import { useExternalCheckoutFactory, UseExternalCheckoutFactoryParams } from '../../factories/useExternalCheckoutFactory';
import useCart from '../useCart';
// import useConfig from '../useConfig';

const factoryParams: UseExternalCheckoutFactoryParams = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  initializeCheckout: async (context: Context, params) => {
    Logger.debug('[Magento]: Initialize external checkout', { params });

    const { externalCheckout, state } = context.$magento.config;

    const userToken = state.getCustomerToken();
    const cartToken = state.getCartId();

    Logger.debug({ userToken, cartToken });

    if (externalCheckout.enable) {
      if (userToken && cartToken) {
        /* if (Object.keys(externalCheckout.stores).length) {

        } */
        window.location.replace(`${externalCheckout.cmsUrl}${externalCheckout.syncUrlPath}/token/${userToken}/cart/${cartToken}`);
        return '';
      }

      window.location.replace(`${externalCheckout.cmsUrl}${externalCheckout.syncUrlPath}/token//cart/${cartToken}`);
      return '';
    }

    return params.baseUrl;
  },
};

export default useExternalCheckoutFactory(factoryParams);
