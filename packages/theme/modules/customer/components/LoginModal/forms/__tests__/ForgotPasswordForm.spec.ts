import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import ForgotPasswordFragment from '../ForgotPasswordForm.vue';
import { ForgotPasswordFormFields } from '../types';

describe('ForgotPasswordForm', () => {
  it('emits submit if validation passes', async () => {
    const form : ForgotPasswordFormFields = { username: 'john@smith.com' };
    const { emitted, getByTestId } = render(ForgotPasswordFragment, { props: { form } });
    await userEvent.click(getByTestId('login-forgot-password-form-submit'));
    const [submitEventPayload] = emitted().submit;
    expect(submitEventPayload[0]).toStrictEqual(form);
  });

  it('requires non-empty email', async () => {
    const form : ForgotPasswordFormFields = { username: '' };
    const { getByText, getByTestId } = render(ForgotPasswordFragment, { props: { form } });
    await userEvent.click(getByTestId('login-forgot-password-form-submit'));
    getByText('This field is required');
  });

  it('requires valid e-mail address', async () => {
    const form : ForgotPasswordFormFields = { username: 'not_an_email' };
    const { getByTestId, getByText } = render(ForgotPasswordFragment, { props: { form } });
    await userEvent.click(getByTestId('login-forgot-password-form-submit'));
    getByText('Invalid email');
  });
});
