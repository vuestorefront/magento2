import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_USER_EMAIL } from './__config__/jest.const';

describe(describeGroup('requestPasswordResetEmail'), () => {
  it('should be able to call reset password endpoint', async () => {
    const result = await sdk.magento.requestPasswordResetEmail({ email: TEST_USER_EMAIL });

    expect(result?.data?.requestPasswordResetEmail).toBe(true);
  });
});
