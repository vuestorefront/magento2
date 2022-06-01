import { UseContextReturn } from '~/types/core';
import type { SetShippingMethodsOnCartInput, Cart } from '~/modules/GraphQL/types';

export const setShippingMethodsOnCartCommand = {
  execute: async (context: UseContextReturn, shippingMethodParams: SetShippingMethodsOnCartInput): Promise<Cart | null> => {
    const { data } = await context.app.$vsf.$magento.api.setShippingMethodsOnCart(shippingMethodParams);

    // TODO: Find out why 'Cart' doesn't match the type of the response data.
    return (data?.setShippingMethodsOnCart?.cart as unknown as Cart) ?? null;
  },
};
