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
