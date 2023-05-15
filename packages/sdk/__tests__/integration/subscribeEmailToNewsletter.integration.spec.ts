import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('subscribeEmailToNewsletter'), () => {
  it('subscribes email to newsletter', async () => {
    const email = 'user-1@vsf-1.local';

    const result = await sdk.magento.subscribeEmailToNewsletter({ email });

    expect(result.data?.subscribeEmailToNewsletter?.status).toBe('SUBSCRIBED');
  });
});
