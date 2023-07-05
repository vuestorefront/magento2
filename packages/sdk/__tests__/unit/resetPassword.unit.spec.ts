import { MutationResetPasswordArgs } from '@vue-storefront/magento-types';
import { resetPassword } from '../../src/methods';
import { describeGroup } from './__config__/jest.setup';
import { client } from '../../src';
import { CustomQuery, MethodOptions } from '../../src/types';

const PARAMS_MOCK: MutationResetPasswordArgs = {
  email: 'some_email',
  newPassword: 'new_password',
  resetPasswordToken: 'reset_password_token',
};
const OPTIONS_MOCK = { clientConfig: {}, customHeaders: {}, customQuery: {} } as MethodOptions<
  CustomQuery<'resetPassword'>
>;
const RESPONSE_MOCK = { data: { data: 'some_data', error: null } };
const ERROR_MOCK = new Error('error');

jest.mock('../../src/client', () => ({
  client: {
    post: jest.fn(() => RESPONSE_MOCK),
  },
}));

describe(describeGroup('resetPassword'), () => {
  it('makes a single call to API Middleware', async () => {
    await resetPassword(PARAMS_MOCK);

    expect(client.post).toBeCalledTimes(1);
  });

  it('makes a call to API Middleware with proper params and options', async () => {
    await resetPassword(PARAMS_MOCK, OPTIONS_MOCK);

    expect(client.post).toBeCalledWith('resetPassword', [expect.objectContaining(PARAMS_MOCK), {}], {});
  });

  it('extracts and returns a response', async () => {
    const response = await resetPassword(PARAMS_MOCK, OPTIONS_MOCK);

    expect(response).toEqual({ data: 'some_data', error: null });
  });

  it('throws an exception in case of network error', async () => {
    expect.hasAssertions();
    (client.post as jest.Mock).mockRejectedValueOnce(ERROR_MOCK);

    try {
      await resetPassword(PARAMS_MOCK, OPTIONS_MOCK);
    } catch (err) {
      expect(err).toBe(ERROR_MOCK);
    }
  });
});
