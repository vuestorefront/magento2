/* eslint-disable @typescript-eslint/no-unsafe-argument */
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/vue';
import { useRouter } from '@nuxtjs/composition-api';
import { useGuestUser, useUser } from '@vue-storefront/magento';
import { render, useUserMock, useGuestUserMock } from '~/test-utils';

import UserAccount from '../UserAccount';

jest.mock('@vue-storefront/magento', () => ({
  useGuestUser: jest.fn(),
  useUser: jest.fn(),
}));

jest.mock('@nuxtjs/composition-api', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('@nuxtjs/composition-api');

  return {
    ...originalModule,
    useRouter: jest.fn(),
  };
});

describe('<UserAccount/>', () => {
  it('Form fields are rendered and validated', async () => {
    useUser.mockReturnValue(useUserMock());
    useGuestUser.mockReturnValue(useGuestUserMock());

    const { getByRole, findAllByText } = render(UserAccount);

    // First name, last name and email fields should be rendered and required

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
        user: {
          email: 'james@bond.io',
          firstname: 'James',
          lastname: 'Bond',
          password: '',
          is_subscribed: false,
        },
      });
    });
    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith('/checkout/shipping');
  });

  test.todo('User cannot move to the next step if data is loading');

  test.todo('User can log-in to the store');

  test.todo('User can create an account');

  test.todo('User can subscribe to the newsletter during account creation');
});
