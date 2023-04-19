import { addProductToWishList } from '../../src/methods';
import { describeGroup } from './__config__/jest.setup';
import { client } from '../../src';
import { CustomQuery, MethodOptions } from '../../src/types';
import { AddProductsToWishlistMutationVariables } from '@vsf-enterprise/magento-api-types';

const PARAMS_MOCK : AddProductsToWishlistMutationVariables = {
  id: 'id123',
  items: [{ quantity: 1, sku: '123' }]
};
const OPTIONS_MOCK = { clientConfig: {}, customHeaders: {}, customQuery: {} } as MethodOptions<CustomQuery<'addProductsToWishlist'>>;
const RESPONSE_MOCK = { data: { data: 'some_data', error: null } };
const ERROR_MOCK = new Error('error');

jest.mock('../../src/client', () => ({
  client: {
    post: jest.fn(() => RESPONSE_MOCK)
  }
}));

describe(describeGroup('addProductToWishList'), () => {
  it('makes a single call to API Middleware', async () => {
    await addProductToWishList(PARAMS_MOCK);

    expect(client.post).toBeCalledTimes(1);
  });

  it('makes a call to API Middleware with proper params and options', async () => {
    await addProductToWishList(PARAMS_MOCK, OPTIONS_MOCK);

    expect(client.post).toBeCalledWith(
      'addProductToWishList', [expect.objectContaining(PARAMS_MOCK), {}, {}], {}
    );
  });

  it('extracts and returns a response', async () => {
    const response = await addProductToWishList(PARAMS_MOCK, OPTIONS_MOCK);

    expect(response).toEqual({ data: 'some_data', error: null });
  });

  it('throws an exception in case of network error', async () => {
    expect.hasAssertions();
    (client.post as jest.Mock).mockRejectedValueOnce(ERROR_MOCK);

    try {
      await addProductToWishList(PARAMS_MOCK, OPTIONS_MOCK);
    } catch (err) {
      expect(err).toBe(ERROR_MOCK);
    }
  });
});
