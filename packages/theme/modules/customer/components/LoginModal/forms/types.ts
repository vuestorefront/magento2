export type LoginFormFields = {
  email: string,
  password: string,
};
export type RegisterFormFields = {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  shouldSubscribeToNewsletter: boolean,
  isWillToCreateAccountConfirmed: boolean,
};
export type ForgotPasswordFormFields = {
  username: string,
};

export type FormName = 'login' | 'register' | 'forgotPassword' | 'forgotPasswordThankYou';
