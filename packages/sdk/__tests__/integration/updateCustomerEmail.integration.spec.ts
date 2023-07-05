import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from './__config__/jest.const';

const NEW_USER_EMAIL = 'johndoe@example.com';

const resetEmail = (token: string) =>
  sdk.magento.updateCustomerEmail(
    { email: TEST_USER_EMAIL, password: TEST_USER_PASSWORD },
    { customHeaders: { Authorization: `Bearer ${token}` } },
  );

describe(describeGroup('updateCustomerEmail'), () => {
  it('updates customer email', async () => {
    const token = await getUserToken();
    const result = await sdk.magento.updateCustomerEmail(
      { email: NEW_USER_EMAIL, password: TEST_USER_PASSWORD },
      { customHeaders: { Authorization: `Bearer ${token}` } },
    );

    expect(result.data.updateCustomerEmail!.customer!.email).toBe(NEW_USER_EMAIL);

    await resetEmail(token);
  });

  it('updates customer email (custom query)', async () => {
    const token = await getUserToken();
    const customQuery = {
      updateCustomerEmail: 'update-customer-email-custom-query',
      metadata: {
        fields: 'email',
      },
    };

    const result = await sdk.magento.updateCustomerEmail(
      { email: NEW_USER_EMAIL, password: TEST_USER_PASSWORD },
      { customQuery, customHeaders: { Authorization: `Bearer ${token}` } },
    );

    expect(result.data.updateCustomerEmail!.customer!.email).toBe(NEW_USER_EMAIL);
    // check if default (non-custom) query isn't ran on accident
    expect(result.data.updateCustomerEmail!.customer!.firstname).not.toBeDefined();

    await resetEmail(token);
  });
});
