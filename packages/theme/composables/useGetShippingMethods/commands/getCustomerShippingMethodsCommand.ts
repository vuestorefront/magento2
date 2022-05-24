import { AvailableShippingMethod } from '~/modules/GraphQL/types';
import { VsfContext } from '~/composables/context';

export const getCustomerShippingMethodsCommand = {
  execute: async (context: VsfContext): Promise<AvailableShippingMethod[]> => {
    const { data: { customerCart: { shipping_addresses: shippingAddresses } } } = await context.$magento.api.getAvailableCustomerShippingMethods();
    return shippingAddresses[0]?.available_shipping_methods ?? [];
  },
};
