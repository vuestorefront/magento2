import { currency } from '../../src/methods';
import { describeGroup } from './__config__/jest.setup';
import { client } from '../../src';
import { CustomQuery, MethodOptions } from '../../src/types';

const OPTIONS_MOCK = { clientConfig: {}, customHeaders: {}, customQuery: {} } as MethodOptions<CustomQuery<'currency'>>;
const RESPONSE_MOCK = { data: { data: 'some_data', error: null } };
const ERROR_MOCK = new Error('error');

jest.mock('../../src/client', () => ({
  client: {
    get: jest.fn(() => RESPONSE_MOCK),
  },
}));

describe(describeGroup('currency'), () => {
  it('makes a single call to API Middleware', async () => {
    await currency();

    expect(client.get).toBeCalledTimes(1);
  });

  it('makes a call to API Middleware with proper params and options', async () => {
    await currency(OPTIONS_MOCK);

    expect(client.get).toBeCalledWith('currency', {
      params: {
        body: JSON.stringify([{}, {}]),
      },
      ...OPTIONS_MOCK.clientConfig,
    });
  });

  it('extracts and returns a response', async () => {
    const response = await currency(OPTIONS_MOCK);

    expect(response).toEqual({ data: 'some_data', error: null });
  });

  it('throws an exception in case of network error', async () => {
    expect.hasAssertions();
    (client.get as jest.Mock).mockRejectedValueOnce(ERROR_MOCK);

    try {
      await currency(OPTIONS_MOCK);
    } catch (err) {
      expect(err).toBe(ERROR_MOCK);
    }
  });
});
