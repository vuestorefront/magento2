import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import LoginForm from '../LoginForm.vue';
import { LoginFormFields } from '../types';

describe('LoginForm', () => {
  it('emits submit if validation passes', async () => {
    const form : LoginFormFields = {
      email: 'john@smith.com',
      password: '123123',
    };
    const { emitted, getByTestId } = render(LoginForm, { props: { form } });
    await userEvent.click(getByTestId('login-form-submit'));
    const [submitEventPayload] = emitted().submit;
    expect(submitEventPayload[0]).toStrictEqual(form);
  });

  it('requires non-empty email', async () => {
    const form : LoginFormFields = {
      email: '',
      password: '123123',
    };
    const { getByTestId, getByText } = render(LoginForm, { props: { form } });
    const submitButton = getByTestId('login-form-submit');
    await userEvent.click(submitButton);
    getByText('This field is required');
  });

  it('requires valid e-mail adddress', async () => {
    const form : LoginFormFields = {
      email: 'not_an_email',
      password: '123123',
    };
    const { getByTestId, getByText } = render(LoginForm, { props: { form } });
    await userEvent.click(getByTestId('login-form-submit'));
    getByText('Invalid email');
  });

  it('requires non-empty password', async () => {
    const form : LoginFormFields = {
      email: 'john@smith.com',
      password: '',
    };
    const { getByTestId, getByText } = render(LoginForm, { props: { form } });
    await userEvent.click(getByTestId('login-form-submit'));
    getByText('This field is required');
  });

  it('displays recaptcha', async () => {
    const form : LoginFormFields = {
      email: 'john@smith.com',
      password: '123123',
    };
    const { getByTestId } = render(LoginForm, {
      props: {
        form,
        showRecaptcha: true,
      },
      stubs: {
        recaptcha: { template: '<div data-testid="recaptcha">recaptcha</div>' },
      },
    });
    await userEvent.click(getByTestId('login-form-submit'));
    getByTestId('recaptcha');
  });
});
