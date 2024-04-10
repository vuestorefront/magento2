import { AddConfigurableProductsToCartInput } from '@vue-storefront/magento-types';
import { addConfigurableProductsToCart } from '../../src/methods';
import { describeGroup } from './__config__/jest.setup';
import { client } from '../../src';
import { CustomQuery, MethodOptions } from '../../src/types';
import { TEST_CART_ID, TEST_CONF_SKU_PARENT, TEST_CONF_SKU_VARIANT } from '../integration/__config__/jest.const';

const PARAMS_MOCK: AddConfigurableProductsToCartInput = {
  cart_id: TEST_CART_ID,
  cart_items: [
    {
      data: {
        quantity: 1,
        sku: TEST_CONF_SKU_VARIANT,
      },
      parent_sku: TEST_CONF_SKU_PARENT,
      customizable_options: [],
    },
  ],
};
const OPTIONS_MOCK = { clientConfig: {}, customHeaders: { 'x-header': 'true' } } as MethodOptions<
  CustomQuery<'addConfigurableProductsToCart'>
>;
const RESPONSE_MOCK = { data: { data: 'some_data', error: null } };
const ERROR_MOCK = new Error('error');

jest.mock('../../src/client', () => ({
  client: {
    post: jest.fn(() => RESPONSE_MOCK),
  },
}));

describe(describeGroup('addConfigurableProductsToCart'), () => {
  it('makes a single call to API Middleware', async () => {
    await addConfigurableProductsToCart(PARAMS_MOCK);

    expect(client.post).toBeCalledTimes(1);
  });

  it('makes a call to API Middleware with proper params and options', async () => {
    await addConfigurableProductsToCart(PARAMS_MOCK, OPTIONS_MOCK);

    expect(client.post).toBeCalledWith(
      'addConfigurableProductsToCart',
      [
        { cart_id: 'pCS0ykep1l3wGlPKSyWLJq5fb1DxIQcp', cart_items: expect.any(Array) },
        undefined,
        { 'x-header': 'true' },
      ],
      {},
    );
  });

  it('extracts and returns a response', async () => {
    const response = await addConfigurableProductsToCart(PARAMS_MOCK, OPTIONS_MOCK);

    expect(response).toEqual({ data: 'some_data', error: null });
  });

  it('throws an exception in case of network error', async () => {
    expect.hasAssertions();
    (client.post as jest.Mock).mockRejectedValueOnce(ERROR_MOCK);

    try {
      await addConfigurableProductsToCart(PARAMS_MOCK, OPTIONS_MOCK);
    } catch (err) {
      expect(err).toBe(ERROR_MOCK);
    }
  });
});
