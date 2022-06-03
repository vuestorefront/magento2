import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import RegisterForm from '../RegisterForm.vue';
import { RegisterFormFields } from '../types';

describe('RegisterForm', () => {
  it('requires fields', async () => {
    const form : RegisterFormFields = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      shouldSubscribeToNewsletter: false,
      isWillToCreateAccountConfirmed: true,
    };
    const { emitted, getByTestId, getAllByText } = render(RegisterForm, { props: { form } });
    await userEvent.click(getByTestId('login-form-submit'));
    expect(emitted().submit).not.toBeDefined();
    expect(getAllByText('This field is required')).toHaveLength(4);
  });
  it('requires correct format of fields', async () => {
    const form : RegisterFormFields = {
      email: 'not_an_email',
      firstName: 'John',
      lastName: 'Smith',
      password: '1',
      shouldSubscribeToNewsletter: false,
      isWillToCreateAccountConfirmed: true,
    };
    const { emitted, getByTestId, getByText } = render(RegisterForm, { props: { form } });
    await userEvent.click(getByTestId('login-form-submit'));
    expect(emitted().submit).not.toBeDefined();
    getByText(/The password must be at least/);
    getByText('Invalid email');
  });
  it('emits submit if validation passes', async () => {
    const form : RegisterFormFields = {
      email: 'john@smith.com',
      firstName: 'John',
      lastName: 'Smith',
      password: 'P@ssw0rd!',
      shouldSubscribeToNewsletter: false,
      isWillToCreateAccountConfirmed: true,
    };
    const { emitted, getByTestId } = render(RegisterForm, { props: { form } });
    await userEvent.click(getByTestId('login-form-submit'));
    const [submitEventPayload] = emitted().submit;
    expect(submitEventPayload[0]).toStrictEqual(form);
  });
});
