import { Logger } from '~/helpers/logger';
import { SetGuestEmailOnCartInput } from '~/modules/GraphQL/types';

export const attachToCartCommand = {
  execute: async (context, params): Promise<void> => {
    Logger.debug('[Magento]: Attach guest cart to user');

    const emailOnCartInput: SetGuestEmailOnCartInput = {
      email: params?.email,
      cart_id: params?.cart?.value?.id,
    };

    await context.$magento.api.setGuestEmailOnCart({
      ...emailOnCartInput,
    });
  },
};
