/* eslint-disable @typescript-eslint/no-unsafe-argument */
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/vue';
import { useForgotPassword } from '@vue-storefront/magento';
import { render, useForgotPasswordMock } from '~/test-utils';

import ResetPassword from '../ResetPassword';

jest.mock('@vue-storefront/magento', () => {
  const originalModule = jest.requireActual('@vue-storefront/magento');
  return {
    ...originalModule,
    useForgotPassword: jest.fn(),
  };
});

describe('<ResetPassword/>', () => {
  it('User can change his password', async () => {
    const setNewMock = jest.fn();
    useForgotPassword.mockReturnValue(useForgotPasswordMock({
      setNew: setNewMock,
    }));

    const values = {
      email: 'james@bond.io',
      password: 'J@mesBond007!',
      token: 'token value',
      resetToken: 'reset token value',
    };

    const { getByRole, findByLabelText, queryByTestId } = render(ResetPassword, {
      mocks: {
        $route: { query: { token: values.resetToken } },
        $nuxt: {
          context: {
            $config: { isRecaptcha: true },
            $recaptcha: {
              init: jest.fn(),
              reset: jest.fn(),
              getResponse: jest.fn().mockResolvedValue(Promise.resolve(values.token)),
            },
          },
        },
      },
    });

    const recaptchaComponent = queryByTestId('recaptcha');
    expect(recaptchaComponent).toBeTruthy();

    const emailInput = getByRole('textbox', /your email/i);
    const passwordInput = await findByLabelText('Password');
    const repeatPasswordInput = await findByLabelText('Repeat Password');

    userEvent.type(emailInput, values.email);
    userEvent.type(passwordInput, values.password);
    userEvent.type(repeatPasswordInput, values.password);

    const continueButton = getByRole('button', { name: /save password/i });
    userEvent.click(continueButton);

    await waitFor(() => {
      expect(setNewMock).toHaveBeenCalledTimes(1);
      expect(setNewMock).toHaveBeenCalledWith({
        email: values.email,
        newPassword: values.password,
        recaptchaToken: values.token,
        tokenValue: values.resetToken,
      });
    });
  });
});
