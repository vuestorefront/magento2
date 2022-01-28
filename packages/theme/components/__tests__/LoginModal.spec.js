/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ref } from '@nuxtjs/composition-api';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/vue';
import { useUser, useForgotPassword } from '@vue-storefront/magento';
import { render, useUserMock, useForgotPasswordMock } from '~/test-utils';
import useUiState from '~/composables/useUiState.ts';

import LoginModal from '../LoginModal';

jest.mock('~/composables/useUiState.ts', () => jest.fn());
jest.mock('@vue-storefront/magento', () => ({
  useUser: jest.fn(),
  useForgotPassword: jest.fn(),
  useWishlist: jest.fn().mockReturnValue({
    load: jest.fn(),
  }),
}));

describe('<LoginModal/>', () => {
  it('User can log in', async () => {
    useUiState.mockReturnValue({
      isLoginModalOpen: ref(true),
      toggleLoginModal: jest.fn(),
    });
    const loginMock = jest.fn();
    useForgotPassword.mockReturnValue(useForgotPasswordMock());
    useUser.mockReturnValue(useUserMock({
      login: loginMock,
    }));

    const values = {
      email: 'james@bond.io',
      password: 'J@mesBond007!',
      token: 'recaptcha token',
    };

    const $recaptchaInstance = {
      init: jest.fn(),
      reset: jest.fn(),
      getResponse: jest.fn().mockResolvedValue(Promise.resolve(values.token)),
    };
    const { getByRole, findByLabelText, queryByTestId } = render(LoginModal, {
      mocks: {
        $nuxt: {
          context: {
            $config: { isRecaptcha: true },
            $recaptcha: $recaptchaInstance,
          },
        },
      },
    });

    const recaptchaComponent = queryByTestId('recaptcha');
    expect(recaptchaComponent).toBeTruthy();

    const emailInput = getByRole('textbox', { name: /your email/i });
    const passwordInput = await findByLabelText('Password');

    userEvent.type(emailInput, values.email);
    userEvent.type(passwordInput, values.password);

    const submitButton = getByRole('button', { name: /login/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledTimes(1);
      expect(loginMock).toHaveBeenCalledWith({
        user: {
          username: values.email,
          password: values.password,
          is_subscribed: false,
          recaptchaInstance: $recaptchaInstance,
          recaptchaToken: values.token,
        },
      });
    });
  });

  it('User can register', async () => {
    const registerMock = jest.fn();
    useForgotPassword.mockReturnValue(useForgotPasswordMock());
    useUser.mockReturnValue(useUserMock({
      register: registerMock,
    }));
    useUiState.mockReturnValue({
      isLoginModalOpen: ref(true),
      toggleLoginModal: jest.fn(),
    });

    const values = {
      email: 'james@bond.io',
      firstName: 'James',
      lastName: 'Bond',
      password: 'J@mesBond007!',
      token: 'recaptcha token',
    };

    const $recaptchaInstance = {
      init: jest.fn(),
      reset: jest.fn(),
      getResponse: jest.fn().mockResolvedValue(Promise.resolve(values.token)),
    };
    const {
      getByRole,
      findByRole,
      findByLabelText,
      queryByTestId,
    } = render(LoginModal, {
      mocks: {
        $nuxt: {
          context: {
            $config: { isRecaptcha: true },
            $recaptcha: $recaptchaInstance,
          },
        },
      },
    });

    const switchToRegisterButton = getByRole('button', { name: /register today/i });
    userEvent.click(switchToRegisterButton);

    await waitFor(() => findByRole('button', { name: /create an account/i }));

    const recaptchaComponent = queryByTestId('recaptcha');
    expect(recaptchaComponent).toBeTruthy();

    const emailInput = getByRole('textbox', { name: /your email/i });
    const firstNameInput = getByRole('textbox', { name: /first name/i });
    const lastNameInput = getByRole('textbox', { name: /last name/i });
    const passwordInput = await findByLabelText('Password');
    const newsletterCheckbox = getByRole('checkbox', { name: /sign up for newsletter/i });
    const createAccountCheckbox = getByRole('checkbox', { name: /i want to create an account/i });

    userEvent.type(emailInput, values.email);
    userEvent.type(firstNameInput, values.firstName);
    userEvent.type(lastNameInput, values.lastName);
    userEvent.type(passwordInput, values.password);
    userEvent.click(newsletterCheckbox);
    userEvent.click(createAccountCheckbox);

    const submitButton = getByRole('button', { name: /create an account/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledTimes(1);
      expect(registerMock).toHaveBeenCalledWith({
        user: {
          email: values.email,
          firstName: values.firstName,
          is_subscribed: true,
          lastName: values.lastName,
          password: values.password,
          recaptchaInstance: $recaptchaInstance,
          recaptchaToken: values.token,
        },
      });
    });
  });

  it('User can reset his password', async () => {
    const requestPasswordMock = jest.fn();
    useForgotPassword.mockReturnValue(useForgotPasswordMock({
      request: requestPasswordMock,
    }));
    useUser.mockReturnValue(useUserMock());
    useUiState.mockReturnValue({
      isLoginModalOpen: ref(true),
      toggleLoginModal: jest.fn(),
    });

    const values = {
      email: 'james@bond.io',
      token: 'recaptcha token',
    };

    const { getByRole, findByRole, queryByTestId } = render(LoginModal, {
      mocks: {
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

    const forgottenPasswordButton = getByRole('button', { name: /forgotten password/i });
    userEvent.click(forgottenPasswordButton);

    await waitFor(() => findByRole('button', { name: /reset password/i }));

    const recaptchaComponent = queryByTestId('recaptcha');
    expect(recaptchaComponent).toBeTruthy();

    const emailInput = getByRole('textbox', { name: /email/i });
    userEvent.type(emailInput, values.email);

    const submitButton = getByRole('button', { name: /reset password/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(requestPasswordMock).toHaveBeenCalledTimes(1);
      expect(requestPasswordMock).toHaveBeenCalledWith({
        email: values.email,
        recaptchaToken: values.token,
      });
    });
  });
});
