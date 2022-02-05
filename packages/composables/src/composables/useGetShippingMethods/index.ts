import {
  Context, Logger,
} from '@absolute-web/vsf-core';
import { ShippingMethod } from '@absolute-web/magento-api';
import { UseGetShippingMethodsFactory, useGetShippingMethodsFactory } from '../../factories/useGetShippingMethodsFactory';

const factoryParams: UseGetShippingMethodsFactory<ShippingMethod> = {
  load: async (context: Context, params): Promise<ShippingMethod[]> => {
    const apiState = context.$magento.config.state;
    Logger.debug('[Magento]: Load shipping methods', { params });
    const customerToken = apiState.getCustomerToken();

    if (customerToken) {
      try {
        const { data: customerData } = await context.$magento.api.getAvailableCustomerShippingMethods();
        Logger.debug('[Result]:', { data: customerData });

        return customerData.customerCart.shipping_addresses.length > 0 ? customerData.customerCart.shipping_addresses[0].available_shipping_methods : [];
      } catch {
        apiState.setCustomerToken();
      }
    }

    const cartId = apiState.getCartId();

    try {
      const { data } = await context.$magento.api.getAvailableShippingMethods({ cartId });

      Logger.debug('[Result]:', { data });

      return data.cart.shipping_addresses.length > 0 ? data.cart.shipping_addresses[0].available_shipping_methods : [];
    } catch {
      apiState.setCartId();
    }
  },
};

const useGetShippingMethods = useGetShippingMethodsFactory<ShippingMethod>(factoryParams);

export default useGetShippingMethods;
