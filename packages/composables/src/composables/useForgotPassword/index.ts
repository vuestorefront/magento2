import {
  Context,
  useForgotPasswordFactory,
} from '@vue-storefront/core';
import { UseForgotPasswordFactoryParams } from '../../factories/useForgotPasswordFactory';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword: async (context: Context, { email, customQuery }) => {
    const { data } = await context.$magento.api.requestPasswordResetEmail({ email }, customQuery);

    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNewPassword: async (context: Context, {
    tokenValue,
    newPassword,
    email,
    customQuery,
  }) => {
    const { data } = await context.$magento.resetPassword({
      email,
      newPassword,
      resetPasswordToken: tokenValue,
    }, customQuery);

    return data;
  },
};

export const useForgotPassword = useForgotPasswordFactory<any>(factoryParams);
export default useForgotPassword;
