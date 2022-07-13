/* eslint-disable @typescript-eslint/no-unsafe-argument */
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/vue';
import { useRouter } from '@nuxtjs/composition-api';
import { useGuestUser } from '~/composables';
import { useUser } from '~/modules/customer/composables/useUser';
import { render, useUserMock, useGuestUserMock } from '~/tests/unit/test-utils';

import UserAccount from '../UserAccount';

jest.mock('~/helpers/asyncLocalStorage', () => ({
  getItem: jest.fn(),
  mergeItem: jest.fn(),
}));

jest.mock('~/composables', () => ({
  useGuestUser: jest.fn(),
  useUser: jest.fn(),
}));

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api');
  return {
    ...originalModule,
    useRouter: jest.fn(),
  };
});

describe.skip('<UserAccount/>', () => {
  it('Form fields are rendered and validated', async () => {
    useUser.mockReturnValue(useUserMock());
    useGuestUser.mockReturnValue(useGuestUserMock());

    const { getByRole, findAllByText, queryByTestId } = render(UserAccount);

    // First name, last name and email fields should be rendered and required

    const recaptchaComponent = queryByTestId('recaptcha');
    expect(recaptchaComponent).toBeNull();

    const firstNameInput = getByRole('textbox', { name: /first name/i });
    expect(firstNameInput).toBeRequired();

    const lastNameInput = getByRole('textbox', { name: /last name/i });
    expect(lastNameInput).toBeRequired();

    const emailInput = getByRole('textbox', { name: /e-mail/i });
    expect(emailInput).toBeRequired();

    const continueButton = getByRole('button', { name: /continue to shipping/i });
    userEvent.click(continueButton);

    // should display form errors when field are not filled
    const errors = await findAllByText('This field is required');
    expect(errors).toHaveLength(3);
  });

  it('Email should be validated', async () => {
    useUser.mockReturnValue(useUserMock());
    useGuestUser.mockReturnValue(useGuestUserMock());

    const { getByRole, findByText } = render(UserAccount);

    const emailInput = getByRole('textbox', { name: /e-mail/i });
    const continueButton = getByRole('button', { name: /continue to shipping/i });

    userEvent.type(emailInput, 'invalid email value');
    userEvent.click(continueButton);

    const validationMessage = await findByText('Invalid email');
    expect(validationMessage).toBeInTheDocument();
  });

  it('User can go ahead as guest user', async () => {
    const attachToCartMock = jest.fn();
    const routerPushMock = jest.fn();

    useUser.mockReturnValue(useUserMock());
    useGuestUser.mockReturnValue(useGuestUserMock({
      attachToCart: attachToCartMock,
    }));
    useRouter.mockReturnValue({
      push: routerPushMock,
    });

    const { getByRole } = render(UserAccount);

    const firstNameInput = getByRole('textbox', { name: /first name/i });
    const lastNameInput = getByRole('textbox', { name: /last name/i });
    const emailInput = getByRole('textbox', { name: /e-mail/i });
    const continueButton = getByRole('button', { name: /continue to shipping/i });

    // fill the form
    userEvent.type(firstNameInput, 'James');
    userEvent.type(lastNameInput, 'Bond');
    userEvent.type(emailInput, 'james@bond.io');

    // click the continue button
    userEvent.click(continueButton);

    await waitFor(() => {
      expect(attachToCartMock).toHaveBeenCalledTimes(1);
      expect(attachToCartMock).toHaveBeenCalledWith({
        email: 'james@bond.io',
      });
    });
    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith('/checkout/shipping');
  });

  it('User can log-in to the store', async () => {
    const attachToCartMock = jest.fn();
    const routerPushMock = jest.fn();
    const loginMock = jest.fn();

    useUser.mockReturnValue(useUserMock({
      login: loginMock,
    }));
    useGuestUser.mockReturnValue(useGuestUserMock({
      attachToCart: attachToCartMock,
    }));
    useRouter.mockReturnValue({
      push: routerPushMock,
    });

    const values = {
      password: 'J@mesBond007!',
      email: 'james@bond.io',
      token: 'token value',
    };

    const { findByLabelText, getByRole, queryByTestId } = render(UserAccount, {
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

    const recaptchaComponent = queryByTestId('recaptcha');
    expect(recaptchaComponent).toBeTruthy();

    const loginCheckbox = getByRole('checkbox', { name: /login on the store/i });
    userEvent.click(loginCheckbox);

    const passwordInput = await findByLabelText('Password');
    const emailInput = getByRole('textbox', { name: /e-mail/i });
    const continueButton = getByRole('button', { name: /continue to shipping/i });

    userEvent.type(passwordInput, values.password);
    userEvent.type(emailInput, values.email);

    // click the continue button
    userEvent.click(continueButton);

    await waitFor(() => {
      expect(attachToCartMock).toHaveBeenCalledTimes(1);
      expect(attachToCartMock).toHaveBeenCalledWith({
        email: 'james@bond.io',
      });

      expect(loginMock).toHaveBeenCalledTimes(1);
      expect(loginMock).toHaveBeenCalledWith({
        user: {
          username: values.email,
          password: values.password,
          recaptchaToken: values.token,
        },
      });
    });
    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith('/checkout/shipping');
  });

  it('User can create an account', async () => {
    const routerPushMock = jest.fn();
    const registerMock = jest.fn();

    useUser.mockReturnValue(useUserMock({
      register: registerMock,
    }));
    useRouter.mockReturnValue({
      push: routerPushMock,
    });

    const values = {
      password: 'J@mesBond007!',
      firstName: 'James',
      lastName: 'Bond',
      email: 'james@bond.io',
      token: 'token value',
    };

    const recaptchaInstance = {
      init: jest.fn(),
      reset: jest.fn(),
      getResponse: jest.fn().mockResolvedValue(Promise.resolve(values.token)),
    };
    const { findByLabelText, findByRole, getByRole } = render(UserAccount, {
      mocks: {
        $nuxt: {
          context: {
            $config: { isRecaptcha: true },
            $recaptcha: recaptchaInstance,
          },
        },
      },
    });

    const loginCheckbox = getByRole('checkbox', { name: /create an account on the store/i });
    userEvent.click(loginCheckbox);

    const passwordInput = await findByLabelText('Password');
    const newsletterCheckbox = await findByRole('checkbox', { name: /sign up for newsletter/i });
    const firstNameInput = getByRole('textbox', { name: /first name/i });
    const lastNameInput = getByRole('textbox', { name: /last name/i });
    const emailInput = getByRole('textbox', { name: /e-mail/i });
    const continueButton = getByRole('button', { name: /continue to shipping/i });

    userEvent.click(newsletterCheckbox);
    userEvent.type(passwordInput, values.password);
    userEvent.type(emailInput, values.email);
    userEvent.type(firstNameInput, values.firstName);
    userEvent.type(lastNameInput, values.lastName);

    // click the continue button
    userEvent.click(continueButton);

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledTimes(1);
      expect(registerMock).toHaveBeenCalledWith({
        user: {
          email: values.email,
          is_subscribed: true,
          firstname: values.firstName,
          lastname: values.lastName,
          recaptchaInstance,
          password: values.password,
          recaptchaToken: values.token,
        },
      });
    });
    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith('/checkout/shipping');
  });

  test.todo('User cannot move to the next step if data is loading');

  test.todo('User can subscribe to the newsletter during account creation');
});
