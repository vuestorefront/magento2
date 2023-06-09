import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

describe(describeGroup('revokeCustomerToken'), () => {
  it('should revoke customer token', async () => {
    const token = await getUserToken();
    const result = await sdk.magento.revokeCustomerToken({ customHeaders: { Authorization: `Bearer ${token}` } });

    expect(result?.data?.revokeCustomerToken?.result).toBe(true);
  });
});
