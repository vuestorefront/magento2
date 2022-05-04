export const updateSubscriptionCommand = {
  execute: async (context, params): Promise<string> => {
    const { data } = await context.$vsf.$magento.api.subscribeEmailToNewsletter(
      {
        email: params.email,
      },
    );

    return data.subscribeEmailToNewsletter.status;
  },
};
