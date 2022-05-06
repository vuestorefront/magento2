export type OnFormComplete = () => void;
export type OnFormError = (message: string) => void;

export type SubmitEventPayload<TForm extends Record<string, unknown>> = {
  form: TForm,
  onComplete: OnFormComplete,
  onError: OnFormError,
};

export type PasswordResetFormFields = {
  currentPassword: string,
  newPassword: string,
  repeatPassword: string,
};

export type ProfileUpdateFormFields = {
  firstname: string,
  lastname: string,
  email: string,
  password?: string;
};
