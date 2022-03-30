import { Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';

export type UseForgotPasswordResults = {
  resetPasswordResult: any,
  setNewPasswordResult: any
};

export interface UseForgotPasswordErrors {
  request: Error;
  setNew: Error;
}

export interface ResetPasswordParams {
  email: string;
  recaptchaToken?: string;
}

export interface SetNewPasswordParams {
  tokenValue: string;
  newPassword: string;
  email: string;
  recaptchaToken?: string;
}

export interface UseForgotPassword {
  result: Ref<UseForgotPasswordResults>;
  loading: Ref<boolean>;
  error: Ref<UseForgotPasswordErrors>;
  setNew(params: ComposableFunctionArgs<SetNewPasswordParams>): Promise<void>;
  request(params: ComposableFunctionArgs<ResetPasswordParams>): Promise<void>;
}
