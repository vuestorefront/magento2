import {
  Context, Logger,
  useForgotPasswordFactory,
} from '@vue-storefront/core';
import { UseForgotPasswordFactoryParams } from '../../factories/useForgotPasswordFactory';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword: async (context: Context, { email, customQuery }) => {
    Logger.debug('[Magento]: Reset user password', { email, customQuery });

    const { data } = await context.$magento.api.requestPasswordResetEmail({ email }, customQuery);

    Logger.debug('[Result]:', { data });

    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNewPassword: async (context: Context, {
    tokenValue,
    newPassword,
    email,
    customQuery,
  }) => {
    Logger.debug('[Magento]: Define new user password', { tokenValue, email, customQuery });

    const { data } = await context.$magento.api.resetPassword({
      email,
      newPassword,
      resetPasswordToken: tokenValue,
    }, customQuery);

    Logger.debug('[Result]:', { data });

    return data;
  },
};

export const useForgotPassword = useForgotPasswordFactory<any>(factoryParams);
export default useForgotPassword;
