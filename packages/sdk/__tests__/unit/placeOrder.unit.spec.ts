import { PlaceOrderInput } from '@vue-storefront/magento-types';
import { placeOrder } from '../../src/methods';
import { describeGroup } from './__config__/jest.setup';
import { client } from '../../src';
import { CustomQuery, MethodOptions } from '../../src/types';

const PARAMS_MOCK: PlaceOrderInput = {
  cart_id: 'cart_id',
};
const OPTIONS_MOCK = { clientConfig: {}, customHeaders: {}, customQuery: {} } as MethodOptions<
  CustomQuery<'placeOrder'>
>;
const RESPONSE_MOCK = { data: { data: 'some_data', error: null } };
const ERROR_MOCK = new Error('error');

jest.mock('../../src/client', () => ({
  client: {
    post: jest.fn(() => RESPONSE_MOCK),
  },
}));

describe(describeGroup('placeOrder'), () => {
  it('makes a single call to API Middleware', async () => {
    await placeOrder(PARAMS_MOCK);

    expect(client.post).toBeCalledTimes(1);
  });

  it('makes a call to API Middleware with proper params and options', async () => {
    await placeOrder(PARAMS_MOCK, OPTIONS_MOCK);

    expect(client.post).toBeCalledWith('placeOrder', [expect.objectContaining(PARAMS_MOCK), {}], {});
  });

  it('extracts and returns a response', async () => {
    const response = await placeOrder(PARAMS_MOCK, OPTIONS_MOCK);

    expect(response).toEqual({ data: 'some_data', error: null });
  });

  it('throws an exception in case of network error', async () => {
    expect.hasAssertions();
    (client.post as jest.Mock).mockRejectedValueOnce(ERROR_MOCK);

    try {
      await placeOrder(PARAMS_MOCK, OPTIONS_MOCK);
    } catch (err) {
      expect(err).toBe(ERROR_MOCK);
    }
  });
});
