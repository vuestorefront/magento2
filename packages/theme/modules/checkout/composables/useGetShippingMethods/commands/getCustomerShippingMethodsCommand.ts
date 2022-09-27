import { AvailableShippingMethod } from '~/modules/GraphQL/types';
import { VsfContext } from '~/composables/context';
import { ComposableFunctionArgs } from '~/composables';

export const getCustomerShippingMethodsCommand = {
  execute: async (context: VsfContext, params: ComposableFunctionArgs<{}>): Promise<AvailableShippingMethod[]> => {
    const {
      data: { customerCart: { shipping_addresses: shippingAddresses } },
    } = await context.$magento.api.getAvailableCustomerShippingMethods(params?.customQuery ?? null, params?.customHeaders);
    return shippingAddresses[0]?.available_shipping_methods ?? [];
  },
};
