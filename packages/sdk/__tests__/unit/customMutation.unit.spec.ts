import { customMutation } from '../../src/methods';
import { describeGroup } from './__config__/jest.setup';
import { client } from '../../src';
import { MethodBaseOptions } from '../../src/types';

const PARAMS_MOCK = { mutation: '{ __typename }', mutationVariables: {}, customHeaders: {} };
const OPTIONS_MOCK = { clientConfig: {}, customHeaders: {} } as MethodBaseOptions;
const RESPONSE_MOCK = { data: { data: 'some_data', error: null } };
const ERROR_MOCK = new Error('error');

jest.mock('../../src/client', () => ({
  client: {
    post: jest.fn(() => RESPONSE_MOCK),
  },
}));

describe(describeGroup('customMutation'), () => {
  it('makes a single call to API Middleware', async () => {
    await customMutation(PARAMS_MOCK);

    expect(client.post).toBeCalledTimes(1);
  });

  it('makes a call to API Middleware with proper params and options', async () => {
    await customMutation(PARAMS_MOCK, OPTIONS_MOCK);

    expect(client.post).toBeCalledWith(
      'customMutation',
      { customHeaders: {}, mutation: '{ __typename }', mutationVariables: {} },
      {},
    );
  });

  it('extracts and returns a response', async () => {
    const response = await customMutation(PARAMS_MOCK, OPTIONS_MOCK);

    expect(response).toEqual({ data: 'some_data', error: null });
  });

  it('throws an exception in case of network error', async () => {
    expect.hasAssertions();
    (client.post as jest.Mock).mockRejectedValueOnce(ERROR_MOCK);

    try {
      await customMutation(PARAMS_MOCK, OPTIONS_MOCK);
    } catch (err) {
      expect(err).toBe(ERROR_MOCK);
    }
  });
});
