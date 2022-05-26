import type { useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { SetGuestEmailOnCartInput } from '~/modules/GraphQL/types';

type Context = ReturnType<typeof useContext>;

export const attachToCartCommand = {
  execute: async (context: Context, params): Promise<void> => {
    Logger.debug('[Magento]: Attach guest cart to user');

    const emailOnCartInput: SetGuestEmailOnCartInput = {
      email: params?.email,
      cart_id: params?.cart?.value?.id,
    };

    await context.app.$vsf.$magento.api.setGuestEmailOnCart({
      ...emailOnCartInput,
    });
  },
};
