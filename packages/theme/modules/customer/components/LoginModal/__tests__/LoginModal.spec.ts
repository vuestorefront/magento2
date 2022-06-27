/* eslint-disable no-underscore-dangle */
import { render, waitFor } from '@testing-library/vue';
import { ref } from '@nuxtjs/composition-api';
import { createLocalVue } from '@vue/test-utils';
import { PiniaVuePlugin } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useUser } from '~/modules/customer/composables/useUser';
import { useForgotPassword } from '~/modules/customer/composables/useForgotPassword';
import { HTMLElementWithVue } from '~/types/vueTestingLibrary';
import LoginModal from '../LoginModal.vue';
import {
  ForgotPasswordFormFields, FormName, LoginFormFields, RegisterFormFields,
} from '../forms/types';

const localVue = createLocalVue();
localVue.use(PiniaVuePlugin);

jest.mock('~/composables/useUiState', () => ({ useUiState: () => ({ isLoginModalOpen: true }) }));
jest.mock('~/modules/customer/composables/useUser', () => ({ useUser: jest.fn() }));
const useUserMock = {
  login: jest.fn(),
  register: jest.fn(),
  loading: ref(false),
  error: ref({ login: null }),
};
(useUser as jest.Mock).mockReturnValue(useUserMock);

jest.mock('~/modules/customer/composables/useForgotPassword', () => ({ useForgotPassword: jest.fn() }));
const useForgotPasswordMock = {
  request: jest.fn(),
  error: { value: { request: null, setNew: null } },
  loading: ref(false),
};
(useForgotPassword as jest.Mock).mockReturnValue(useForgotPasswordMock);

describe('LoginModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders login form initially', () => {
    const { getByTestId } = render(LoginModal, {
      props: { isLoginModalOpen: true },
      localVue,
      pinia: createTestingPinia(),
    });
    getByTestId('login-form');
  });

  it('sends login form', async () => {
    const { getByTestId } = render(LoginModal, {
      localVue,
      pinia: createTestingPinia(),
    });
    const loginForm = getByTestId('login-form');
    const form : LoginFormFields = {
      email: 'john@smith.com',
      password: 'P@ssw0rd!',
    };
    await waitFor(() => {
      (loginForm as HTMLElementWithVue).__vue__.$emit('submit', form);
    });

    expect(useUserMock.login).toHaveBeenCalled();
  });

  it('sends register form', async () => {
    const { getByTestId } = render(LoginModal, {
      localVue,
      pinia: createTestingPinia(),
    });

    await waitFor(() => {
      (getByTestId('login-form') as HTMLElementWithVue).__vue__.$emit('change-form', 'register' as FormName);
    });
    const registerForm = getByTestId('register-form') as HTMLElementWithVue;
    const form : RegisterFormFields = {
      email: 'john@smith.com',
      password: 'P@ssw0rd!',
      firstName: 'John',
      lastName: 'Smith',
      isWillToCreateAccountConfirmed: true,
      shouldSubscribeToNewsletter: false,
    };
    registerForm.__vue__.$emit('submit', form);

    await waitFor(() => {
      expect(useUserMock.register).toHaveBeenCalled();
    });
  });

  it('sends forgot password form and shows thank you page', async () => {
    const { getByTestId, getByText } = render(LoginModal, {
      localVue,
      pinia: createTestingPinia(),
      stubs: ['i18n'],
    });

    await waitFor(() => {
      (getByTestId('login-form') as HTMLElementWithVue).__vue__.$emit('change-form', 'forgotPassword' as FormName);
    });
    const forgotPasswordForm = getByTestId('forgot-password-form') as HTMLElementWithVue;
    const form : ForgotPasswordFormFields = {
      username: 'john@smith.com',
    };

    forgotPasswordForm.__vue__.$emit('submit', form);

    await waitFor(() => {
      getByTestId('forgot-password-thank-you');
      getByText('john@smith.com');
      expect(useForgotPasswordMock.request).toHaveBeenCalled();
    });
  });

  it('displays error message if forgot password from send fails', async () => {
    const useForgotPasswordMockWithError = {
      request: jest.fn(),
      error: { request: { message: 'error:forgotpassword' }, setNew: null },
      register: jest.fn(),
      loading: false,
    };
    (useForgotPassword as jest.Mock).mockReturnValueOnce(useForgotPasswordMockWithError);
    const { getByText, getByTestId } = render(LoginModal, {
      localVue,
      pinia: createTestingPinia(),
    });

    await waitFor(() => {
      (getByTestId('login-form') as HTMLElementWithVue).__vue__.$emit('change-form', 'forgotPassword' as FormName);
    });
    await waitFor(() => {
      getByText('error:forgotpassword');
    });
  });
});
