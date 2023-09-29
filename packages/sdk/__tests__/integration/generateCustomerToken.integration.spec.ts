import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from './__config__/jest.const';

describe(describeGroup('generateCustomerToken'), () => {
  it('should generate customer token', async () => {
    const result = await sdk.magento.generateCustomerToken({
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
    });

    expect(result?.data?.generateCustomerToken?.token).toBeDefined();
  });

  it('should send the custom query', async () => {
    const customQuery = {
      generateCustomerToken: 'generate-customer-token-custom-query',
      metadata: {
        fields: 'token',
      },
    };

    const result = await sdk.magento.generateCustomerToken(
      {
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD,
      },
      { customQuery },
    );

    expect(result?.data?.generateCustomerToken?.token).toBeDefined();
  });
});
