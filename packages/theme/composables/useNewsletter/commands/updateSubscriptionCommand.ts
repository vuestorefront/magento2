import type { NuxtAppOptions } from '@nuxt/types';
import type { SubscriptionStatusesEnum } from '~/modules/GraphQL/types';
import type { UseNewsletterUpdateSubscriptionParams } from '../useNewsletter';

export const updateSubscriptionCommand = {
  execute: async (app: NuxtAppOptions, params: UseNewsletterUpdateSubscriptionParams): Promise<SubscriptionStatusesEnum | null> => {
    const { data } = await app.$vsf.$magento.api.subscribeEmailToNewsletter({
      email: params.email,
    });

    return data?.subscribeEmailToNewsletter?.status ?? null;
  },
};
