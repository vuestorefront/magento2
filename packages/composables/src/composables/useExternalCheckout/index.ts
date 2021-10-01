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
  initializeCheckout: async (context: Context, baseUrl: string) => {
    Logger.debug('[Magento]: Initialize external checkout', { baseUrl });

    const { externalCheckout, state } = context.$magento.config;

    const userToken = state.getCustomerToken();
    const cartToken = state.getCartId();

    Logger.debug({ userToken, cartToken });

    if (externalCheckout.enable) {
      if (userToken && cartToken) {
        // @TODO: Implements Multiple Store
        /* if (Object.keys(externalCheckout.stores).length) {

        } */
        window.location.replace(`${externalCheckout.cmsUrl}${externalCheckout.syncUrlPath}/token/${userToken}/cart/${cartToken}`);
        return Promise.resolve('');
      }

      window.location.replace(`${externalCheckout.cmsUrl}${externalCheckout.syncUrlPath}/token//cart/${cartToken}`);
      return Promise.resolve('');
    }

    return Promise.resolve(baseUrl);
  },
};

export default useExternalCheckoutFactory(factoryParams);
