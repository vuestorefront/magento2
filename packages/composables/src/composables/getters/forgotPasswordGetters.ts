import { ForgotPasswordGetters } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getResetPasswordToken(result: any): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isPasswordChanged(result: any): boolean {
  return true;
}

export const forgotPasswordGetters: ForgotPasswordGetters<any> = {
  getResetPasswordToken,
  isPasswordChanged,
};

export default forgotPasswordGetters;
