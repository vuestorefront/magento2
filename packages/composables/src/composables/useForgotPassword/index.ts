import {
  Context, Logger,
  useForgotPasswordFactory,
} from '@vue-storefront/core';
import { UseForgotPasswordFactoryParams } from '../../factories/useForgotPasswordFactory';

/**
 * @deprecated since version <version?>
 *
 * @see <add docs link>
 */
const factoryParams: UseForgotPasswordFactoryParams<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword: async (context: Context, params) => {
    Logger.debug('[Magento]: Reset user password', { params });

    const { data } = await context.$magento.api.requestPasswordResetEmail({ email: params.email, recaptchaToken: params.recaptchaToken });

    Logger.debug('[Result]:', { data });

    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNewPassword: async (context: Context, params) => {
    Logger.debug('[Magento]: Define new user password', { params });

    const { data } = await context.$magento.api.resetPassword({
      email: params.email,
      newPassword: params.newPassword,
      resetPasswordToken: params.tokenValue,
      recaptchaToken: params.recaptchaToken,
    });

    Logger.debug('[Result]:', { data });

    return data;
  },
};

export const useForgotPassword = useForgotPasswordFactory<any>(factoryParams);
export default useForgotPassword;
