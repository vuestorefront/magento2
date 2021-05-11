import { Context } from '@vue-storefront/core';
import { useExternalCheckoutFactory, UseExternalCheckoutFactoryParams } from '../../factories/useExternalCheckoutFactory';
import useUser from '../useUser';
import useCart from '../useCart';
// import useConfig from '../useConfig';

const factoryParams: UseExternalCheckoutFactoryParams = {
  provide() {
    return {
      user: useUser(),
      cart: useCart(),
    };
  },
  initializeCheckout: async (context: Context, baseUrl: string) => {
    const { externalCheckout, state } = context.$magento.config;
    const userToken = state.getCustomerToken();
    const cartToken = state.getCartId();

    if (userToken && cartToken && externalCheckout.enable) {
      // @TODO: Implements Multiple Store
      /* if (Object.keys(externalCheckout.stores).length) {

      } */
      await context.cart.$magento.load();

      return Promise.resolve(`${externalCheckout.cmsUrl}${externalCheckout.syncUrlPath}/token/${userToken}/cart/${cartToken}`);
    }

    return Promise.resolve(baseUrl);
  },
};

export default useExternalCheckoutFactory(factoryParams);
