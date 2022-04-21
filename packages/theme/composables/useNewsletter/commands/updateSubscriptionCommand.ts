import type { useContext } from '@nuxtjs/composition-api';
import type { SubscriptionStatusesEnum } from '~/modules/GraphQL/types';
import type { UseNewsletterUpdateSubscriptionParams } from '../useNewsletter';

type Context = ReturnType<typeof useContext>;

export const updateSubscriptionCommand = {
  execute: async (context: Context, params: UseNewsletterUpdateSubscriptionParams): Promise<SubscriptionStatusesEnum | null> => {
    const { data } = await context.app.$vsf.$magento.api.subscribeEmailToNewsletter({
      email: params.email,
    });

    return data?.subscribeEmailToNewsletter?.status ?? null;
  },
};
