import {
  Ref,
  ref,
  useContext,
} from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '@vue-storefront/core';
import { Logger } from '~/helpers/logger';
import {
  UseForgotPasswordResults,
  UseForgotPasswordErrors,
  ResetPasswordParams,
  SetNewPasswordParams,
  UseForgotPassword,
} from '~/composables/useForgotPassword/useForgotPassword';

export const useForgotPassword = (): UseForgotPassword => {
  const { app } = useContext();
  const loading: Ref<boolean> = ref(false);
  const result: Ref<UseForgotPasswordResults> = ref({
    resetPasswordResult: null,
    setNewPasswordResult: null,
  });
  const error: Ref<UseForgotPasswordErrors> = ref({
    request: null,
    setNew: null,
  });

  // eslint-disable-next-line @typescript-eslint/require-await,consistent-return
  const resetPassword = async (resetPasswordParams: ComposableFunctionArgs<ResetPasswordParams>) => {
    Logger.debug('useForgotPassword/request', resetPasswordParams.email);

    try {
      loading.value = true;
      Logger.debug('[Magento]: Reset user password', resetPasswordParams);
      // eslint-disable-next-line max-len
      const { data } = await app.context.$vsf.$magento.api.requestPasswordResetEmail({ email: resetPasswordParams.email, recaptchaToken: resetPasswordParams.recaptchaToken });
      Logger.debug('[Result]:', { data });
      error.value.request = data;
    } catch (err) {
      error.value.request = err;
      Logger.error('useForgotPassword/request', err);
    } finally {
      loading.value = false;
    }
  };

  const setNewPassword = async (setNewPasswordParams: ComposableFunctionArgs<SetNewPasswordParams>) => {
    Logger.debug('useForgotPassword/setNew', setNewPasswordParams);

    try {
      loading.value = true;
      const { data } = await app.context.$vsf.$magento.api.resetPassword({
        email: setNewPasswordParams.email,
        newPassword: setNewPasswordParams.newPassword,
        resetPasswordToken: setNewPasswordParams.tokenValue,
        recaptchaToken: setNewPasswordParams.recaptchaToken,
      });

      Logger.debug('[Result]:', { data });

      result.value = data;
      error.value.setNew = null;
    } catch (err) {
      error.value.setNew = err;
      Logger.error('useForgotPassword/setNew', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    request: resetPassword,
    setNew: setNewPassword,
    loading,
    result,
    error,
  };
};

export default useForgotPassword;
