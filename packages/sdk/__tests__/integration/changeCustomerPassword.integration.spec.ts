import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from './__config__/jest.const';

const OLD_PASSWORD = TEST_USER_PASSWORD;
const NEW_PASSWORD = 'kJm&2q2IG1o0';

describe(describeGroup('changeCustomerPassword'), () => {
  let token: string;

  const revertPassword = async () => {
    await sdk.magento.changeCustomerPassword(
      {
        currentPassword: NEW_PASSWORD,
        newPassword: OLD_PASSWORD,
      },
      { customHeaders: { Authorization: `Bearer ${token}` } },
    );
  };

  it('should change customer password', async () => {
    token = await getUserToken();

    const result = await sdk.magento.changeCustomerPassword(
      {
        currentPassword: OLD_PASSWORD,
        newPassword: NEW_PASSWORD,
      },
      { customHeaders: { Authorization: `Bearer ${token}` } },
    );

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        changeCustomerPassword: expect.objectContaining({
          __typename: 'Customer',
          email: TEST_USER_EMAIL,
        }),
      }),
    });

    // revert password to old one
    await revertPassword();

    expect(result).toEqual(expected);
  });

  it('should use custom query to change customer password', async () => {
    token = await getUserToken();

    const customQuery = {
      changeCustomerPassword: 'change-customer-password-custom-query',
      metadata: {
        fields: 'email',
      },
    };

    const result = await sdk.magento.changeCustomerPassword(
      {
        currentPassword: OLD_PASSWORD,
        newPassword: NEW_PASSWORD,
      },
      { customQuery, customHeaders: { Authorization: `Bearer ${token}` } },
    );

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        changeCustomerPassword: expect.objectContaining({
          __typename: 'Customer',
          email: TEST_USER_EMAIL,
        }),
      }),
    });

    // revert password to old one
    await revertPassword();

    expect(result).toEqual(expected);
    expect(result?.data?.changeCustomerPassword?.firstname).toBeUndefined();
  });
});
