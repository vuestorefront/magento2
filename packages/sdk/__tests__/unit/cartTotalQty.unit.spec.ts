import { CartQueryVariables } from '@vue-storefront/magento-types';
import { cartTotalQty } from '../../src/methods';
import { describeGroup } from './__config__/jest.setup';
import { client } from '../../src';
import { MethodBaseOptions } from '../../src/types';

const CART_ID = 'some_cart_id';
const CUSTOM_HEADERS = { header: 'some_header' };
const PARAMS_MOCK: CartQueryVariables = { cartId: CART_ID };
const OPTIONS_MOCK = { clientConfig: {}, customHeaders: CUSTOM_HEADERS } as MethodBaseOptions;
const RESPONSE_MOCK = { data: { data: 'some_data', error: null } };
const ERROR_MOCK = new Error('error');

jest.mock('../../src/client', () => ({
  client: {
    post: jest.fn(() => RESPONSE_MOCK),
  },
}));

describe(describeGroup('cartTotalQty'), () => {
  it('makes a single call to API Middleware', async () => {
    await cartTotalQty(PARAMS_MOCK);

    expect(client.post).toBeCalledTimes(1);
  });

  it('makes a call to API Middleware with proper params and options', async () => {
    await cartTotalQty(PARAMS_MOCK, OPTIONS_MOCK);

    expect(client.post).toBeCalledWith('cartTotalQty', [CART_ID, CUSTOM_HEADERS], {});
  });

  it('extracts and returns a response', async () => {
    const response = await cartTotalQty(PARAMS_MOCK, OPTIONS_MOCK);

    expect(response).toEqual({ data: 'some_data', error: null });
  });

  it('throws an exception in case of network error', async () => {
    expect.hasAssertions();
    (client.post as jest.Mock).mockRejectedValueOnce(ERROR_MOCK);

    try {
      await cartTotalQty(PARAMS_MOCK, OPTIONS_MOCK);
    } catch (err) {
      expect(err).toBe(ERROR_MOCK);
    }
  });
});
