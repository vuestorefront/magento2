import {
  readonly,
  Ref,
  ref,
  useContext,
} from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';
import { Logger } from '~/helpers/logger';
import {
  UseForgotPasswordResults,
  UseForgotPasswordErrors,
  UseForgotPasswordResetParams,
  UseForgotPasswordSetNewParams,
  UseForgotPasswordInterface,
} from '~/modules/customer/composables/useForgotPassword/useForgotPassword';

/**
 * Allows to request a password reset email and to set a new password to a user.
 *
 * Se the {@link UseForgotPasswordInterface} for a list of methods and values available in this composable.
 */
export function useForgotPassword(): UseForgotPasswordInterface {
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
  const resetPassword = async (resetPasswordParams: ComposableFunctionArgs<UseForgotPasswordResetParams>) => {
    Logger.debug('useForgotPassword/request', resetPasswordParams.email);

    try {
      loading.value = true;
      Logger.debug('[Magento]: Reset user password', resetPasswordParams);
      // eslint-disable-next-line max-len
      const { data } = await app.context.$vsf.$magento.api.requestPasswordResetEmail({ email: resetPasswordParams.email, recaptchaToken: resetPasswordParams.recaptchaToken }, resetPasswordParams?.customQuery ?? null, resetPasswordParams?.customHeaders);
      Logger.debug('[Result]:', { data });
      error.value.request = data;
      result.value.resetPasswordResult = data?.requestPasswordResetEmail ?? false;
    } catch (err) {
      error.value.request = err;
      Logger.error('useForgotPassword/request', err);
    } finally {
      loading.value = false;
    }
  };

  const setNewPassword = async (setNewPasswordParams: ComposableFunctionArgs<UseForgotPasswordSetNewParams>) => {
    Logger.debug('useForgotPassword/setNew', setNewPasswordParams);

    try {
      loading.value = true;
      const { data } = await app.context.$vsf.$magento.api.resetPassword({
        email: setNewPasswordParams.email,
        newPassword: setNewPasswordParams.newPassword,
        resetPasswordToken: setNewPasswordParams.tokenValue,
        recaptchaToken: setNewPasswordParams.recaptchaToken,
      }, setNewPasswordParams?.customQuery ?? null, setNewPasswordParams?.customHeaders);

      Logger.debug('[Result]:', { data });
      result.value.setNewPasswordResult = data?.resetPassword ?? false;
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
    loading: readonly(loading),
    result: readonly(result),
    error: readonly(error),
  };
}

export * from './useForgotPassword';
export default useForgotPassword;
