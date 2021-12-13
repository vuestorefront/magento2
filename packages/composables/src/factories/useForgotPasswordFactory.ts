import { Ref, computed } from '@vue/composition-api';
import {
  ComposableFunctionArgs,
  configureFactoryParams,
  ForgotPasswordResult,
  Context,
  CustomQuery,
  FactoryParams,
  Logger,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UseForgotPassword, UseForgotPasswordErrors } from '../types/composables';

interface SetNewPasswordParams {
  tokenValue: string;
  newPassword: string;
  email: string;
}

interface ResetPasswordParams {
  email: string;
}

export interface UseForgotPasswordFactoryParams<RESULT> extends FactoryParams {
  resetPassword: (context: Context, params: ComposableFunctionArgs<ResetPasswordParams & { currentResult: RESULT }>) => Promise<RESULT>;
  setNewPassword: (context: Context, params: ComposableFunctionArgs<SetNewPasswordParams & { currentResult: RESULT }>) => Promise<RESULT>;
}

export function useForgotPasswordFactory<RESULT>(
  factoryParams: UseForgotPasswordFactoryParams<RESULT>,
) {
  return function useForgotPassword(): UseForgotPassword<RESULT> {
    const result: Ref<ForgotPasswordResult<RESULT>> = sharedRef({
      resetPasswordResult: null,
      setNewPasswordResult: null,
    }, 'useForgotPassword-result');
    const loading = sharedRef(false, 'useProduct-loading');
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseForgotPasswordErrors> = sharedRef({
      request: null,
      setNew: null,
    }, 'useForgotPassword-error');

    const request = async (resetPasswordParams: ComposableFunctionArgs<ResetPasswordParams>) => {
      Logger.debug('useForgotPassword/request', resetPasswordParams.email);

      try {
        loading.value = true;
        // eslint-disable-next-line no-underscore-dangle
        result.value = await _factoryParams.resetPassword({ currentResult: result.value, ...resetPasswordParams });
        error.value.request = null;
      } catch (err) {
        error.value.request = err;
        Logger.error('useForgotPassword/request', err);
      } finally {
        loading.value = false;
      }
    };

    const setNew = async (setNewPasswordParams: ComposableFunctionArgs<SetNewPasswordParams>) => {
      Logger.debug('useForgotPassword/setNew', setNewPasswordParams);

      try {
        loading.value = true;
        // eslint-disable-next-line no-underscore-dangle
        result.value = await _factoryParams.setNewPassword({ currentResult: result.value, ...setNewPasswordParams });
        error.value.setNew = null;
      } catch (err) {
        error.value.setNew = err;
        Logger.error('useForgotPassword/setNew', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      request,
      setNew,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
