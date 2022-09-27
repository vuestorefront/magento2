import { UseContextReturn } from '~/types/core';
import type { SubscriptionStatusesEnum } from '~/modules/GraphQL/types';
import type { UseNewsletterUpdateSubscriptionParams } from '~/composables';

export const updateSubscriptionCommand = {
  execute: async (context: UseContextReturn, params: UseNewsletterUpdateSubscriptionParams): Promise<SubscriptionStatusesEnum | null> => {
    const { data } = await context.app.$vsf.$magento.api.subscribeEmailToNewsletter({
      email: params.email,
    }, params?.customQuery ?? null, params?.customHeaders ?? null);

    return data?.subscribeEmailToNewsletter?.status ?? null;
  },
};
