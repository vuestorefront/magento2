import { CustomerProductReviewParams } from '@vue-storefront/magento-types';
import { reviews } from '../../src/methods';
import { describeGroup } from './__config__/jest.setup';
import { client } from '../../src';
import { CustomQuery, MethodOptions } from '../../src/types';

const PARAMS_MOCK: CustomerProductReviewParams = {
  pageSize: 10,
  currentPage: 1,
};
const OPTIONS_MOCK = { clientConfig: {}, customHeaders: {}, customQuery: {} } as MethodOptions<CustomQuery<'reviews'>>;
const RESPONSE_MOCK = { data: { data: 'some_data', error: null } };
const ERROR_MOCK = new Error('error');

jest.mock('../../src/client', () => ({
  client: {
    get: jest.fn(() => RESPONSE_MOCK),
  },
}));

describe(describeGroup('reviews'), () => {
  it('makes a single call to API Middleware', async () => {
    await reviews(PARAMS_MOCK);

    expect(client.get).toBeCalledTimes(1);
  });

  it('makes a call to API Middleware with proper params and options', async () => {
    await reviews(PARAMS_MOCK, OPTIONS_MOCK);

    expect(client.get).toBeCalledWith('reviews', {
      params: {
        body: JSON.stringify([PARAMS_MOCK, {}, {}]),
      },
      ...OPTIONS_MOCK.clientConfig,
    });
  });

  it('extracts and returns a response', async () => {
    const response = await reviews(PARAMS_MOCK, OPTIONS_MOCK);

    expect(response).toEqual({ data: 'some_data', error: null });
  });

  it('throws an exception in case of network error', async () => {
    expect.hasAssertions();
    (client.get as jest.Mock).mockRejectedValueOnce(ERROR_MOCK);

    try {
      await reviews(PARAMS_MOCK, OPTIONS_MOCK);
    } catch (err) {
      expect(err).toBe(ERROR_MOCK);
    }
  });
});
