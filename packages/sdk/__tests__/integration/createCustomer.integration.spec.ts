import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CUSTOMER } from './__config__/jest.const';

describe(describeGroup('createCustomer'), () => {
  it('should create customer account', async () => {
    const result = await sdk.magento.createCustomer({
      email: TEST_CUSTOMER.email,
      password: TEST_CUSTOMER.password,
      firstname: TEST_CUSTOMER.firstname,
      lastname: TEST_CUSTOMER.lastname,
    });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        createCustomerV2: expect.objectContaining({
          customer: expect.objectContaining({
            email: TEST_CUSTOMER.email,
            firstname: TEST_CUSTOMER.firstname,
            lastname: TEST_CUSTOMER.lastname,
          }),
        }),
      }),
    });

    expect(result).toEqual(expected);
  });
});
