import { GenerateCustomerTokenMutation } from '@vue-storefront/magento-types';
import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { CustomMutationInput, CustomMutationResponse } from '../../src/methods/customMutation';
import { GenerateCustomerTokenInput } from '../../src/methods/generateCustomerToken';
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from './__config__/jest.const';

describe(describeGroup('customMutation'), () => {
  it('sends custom query', async () => {
    const mutation = `#graphql
       mutation generateCustomerToken($email: String!, $password: String!) {
        generateCustomerToken(email: $email, password: $password) {
          token
        }
      }
    `;

    const mutationVariables: GenerateCustomerTokenInput = {
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
    };

    const result = await sdk.magento.customMutation<
      CustomMutationResponse<GenerateCustomerTokenMutation>,
      CustomMutationInput<GenerateCustomerTokenInput>
    >({
      mutation,
      mutationVariables,
    });

    expect(result?.data?.generateCustomerToken?.token).toBeDefined();
  });
});
