import type { SubscriptionStatusesEnum } from '~/modules/GraphQL/types';

export const updateSubscriptionCommand = {
  execute: async (context, params): Promise<SubscriptionStatusesEnum> => {
    const { data } = await context.$vsf.$magento.api.subscribeEmailToNewsletter(
      {
        email: params.email,
      },
    );

    return data.subscribeEmailToNewsletter.status;
  },
};
