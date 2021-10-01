import {
  Context, Logger,
} from '@vue-storefront/core';
import { ShippingMethod } from '@vue-storefront/magento-api';
import { UseGetShippingMethods } from '../../types/composables';
import { UseGetShippingMethodsFactory, useGetShippingMethodsFactory } from '../../factories/useGetShippingMethodsFactory';

const factoryParams: UseGetShippingMethodsFactory<ShippingMethod> = {
  load: async (context: Context, params): Promise<ShippingMethod[]> => {
    Logger.debug('[Magento]: Load shipping methods', { params });
    const isGuest = params.cartId;

    if (isGuest) {
      const { data } = await context.$magento.api.getAvailableShippingMethods({ cartId: params.cartId });

      Logger.debug('[Result]:', { data });

      const hasAddresses = data.cart.shipping_addresses.length > 0;

      return hasAddresses ? data.cart.shipping_addresses[0].available_shipping_methods : [];
    }

    const { data } = await context.$magento.api.getAvailableCustomerShippingMethods();

    Logger.debug('[Result]:', { data });

    const hasAddresses = data.customerCart.shipping_addresses.length > 0;

    return hasAddresses ? data.customerCart.shipping_addresses[0].available_shipping_methods : [];
  },
};

const useGetShippingMethods:
(cacheId?: string) => UseGetShippingMethods<ShippingMethod> = useGetShippingMethodsFactory<ShippingMethod>(factoryParams);

export default useGetShippingMethods;
