import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

describe(describeGroup('customer'), () => {
  it('fetches customer', async () => {
    const token = await getUserToken();

    //  On the frontend token should be passed automatically using cookie, but in integration tests we have no browser context so it's done manually
    const result = await sdk.magento.customer({ customHeaders: { Authorization: `Bearer ${token}` } });

    expect(result.data.customer!.firstname).toBe('Magento SDK Test Account');
  });

  it('fetches customer using custom query', async () => {
    const token = await getUserToken();
    const customQuery = {
      customer: 'customer-custom-query',
      metadata: {
        fields: 'email',
      },
    };

    const result = await sdk.magento.customer({ customQuery, customHeaders: { Authorization: `Bearer ${token}` } });

    expect(result.data.customer!.email).toBeDefined();
    // check if default (non-custom) query isn't ran on accident
    expect(result.data.customer!.firstname).not.toBeDefined();
  });
});
