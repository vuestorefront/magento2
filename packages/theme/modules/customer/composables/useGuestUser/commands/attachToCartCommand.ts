import { UseContextReturn } from '~/types/core';
import { Logger } from '~/helpers/logger';
import { SetGuestEmailOnCartInput } from '~/modules/GraphQL/types';
import { AttachToCartParams } from '~/modules/customer/composables/useGuestUser';
import { ComposableFunctionArgs } from '~/composables';

export const attachToCartCommand = {
  execute: async (context: UseContextReturn, params: ComposableFunctionArgs<AttachToCartParams>): Promise<void> => {
    Logger.debug('[Magento]: Attach guest cart to user');

    const emailOnCartInput: SetGuestEmailOnCartInput = {
      email: params?.email,
      cart_id: params?.cart?.value?.id,
    };

    await context.app.$vsf.$magento.api.setGuestEmailOnCart({
      ...emailOnCartInput,
    }, params?.customQuery ?? null, params?.customHeaders);
  },
};
