import { AddBundleProductsToCartInput } from '@vue-storefront/magento-types';
import { addBundleProductsToCart } from '../../src/methods';
import { describeGroup } from './__config__/jest.setup';
import { client } from '../../src';
import { CustomQuery, MethodOptions } from '../../src/types';
import { TEST_BUNDLE_SKU, TEST_CART_ID } from '../integration/__config__/jest.const';

const PARAMS_MOCK: AddBundleProductsToCartInput = {
  cart_id: TEST_CART_ID,
  cart_items: [
    {
      data: {
        quantity: 1,
        sku: TEST_BUNDLE_SKU,
      },
      bundle_options: [
        {
          id: 1,
          quantity: 1,
          value: ['1'],
        },
        {
          id: 2,
          quantity: 1,
          value: ['4'],
        },
        {
          id: 3,
          quantity: 1,
          value: ['5'],
        },
        {
          id: 4,
          quantity: 1,
          value: ['8'],
        },
      ],
    },
  ],
};
const OPTIONS_MOCK = { clientConfig: {}, customHeaders: { 'x-header': 'true' } } as MethodOptions<
  CustomQuery<'addBundleProductsToCart'>
>;
const RESPONSE_MOCK = { data: { data: 'some_data', error: null } };
const ERROR_MOCK = new Error('error');

jest.mock('../../src/client', () => ({
  client: {
    post: jest.fn(() => RESPONSE_MOCK),
  },
}));

describe(describeGroup('addBundleProductsToCart'), () => {
  it('makes a single call to API Middleware', async () => {
    await addBundleProductsToCart(PARAMS_MOCK);

    expect(client.post).toBeCalledTimes(1);
  });

  it('makes a call to API Middleware with proper params and options', async () => {
    await addBundleProductsToCart(PARAMS_MOCK, OPTIONS_MOCK);

    expect(client.post).toBeCalledWith(
      'addBundleProductsToCart',
      [
        { cart_id: 'pCS0ykep1l3wGlPKSyWLJq5fb1DxIQcp', cart_items: expect.any(Array) },
        undefined,
        { 'x-header': 'true' },
      ],
      {},
    );
  });

  it('extracts and returns a response', async () => {
    const response = await addBundleProductsToCart(PARAMS_MOCK, OPTIONS_MOCK);

    expect(response).toEqual({ data: 'some_data', error: null });
  });

  it('throws an exception in case of network error', async () => {
    expect.hasAssertions();
    (client.post as jest.Mock).mockRejectedValueOnce(ERROR_MOCK);

    try {
      await addBundleProductsToCart(PARAMS_MOCK, OPTIONS_MOCK);
    } catch (err) {
      expect(err).toBe(ERROR_MOCK);
    }
  });
});
