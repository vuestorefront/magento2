import { ForgotPasswordGetters } from '~/modules/customer/getters/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getResetPasswordToken(_result: any): string {
  return '';
}

const isPasswordChanged = (result: any): boolean => result?.resetPassword;

export const forgotPasswordGetters: ForgotPasswordGetters<any> = {
  getResetPasswordToken,
  isPasswordChanged,
};

export default forgotPasswordGetters;
