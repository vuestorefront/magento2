import { Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';

/** Represents the result of a password change or reset operation */
export interface UseForgotPasswordResults {
  resetPasswordResult: boolean,
  setNewPasswordResult: boolean
}

/** Errors returned by the {@link useForgotPassword} composable */
export interface UseForgotPasswordErrors {
  request: Error;
  setNew: Error;
}

/** Params used to request a password reset email */
export interface UseForgotPasswordResetParams {
  email: string;
  recaptchaToken?: string;
}

/** Params used to set a new password to a user */
export interface UseForgotPasswordSetNewParams {
  tokenValue: string;
  newPassword: string;
  email: string;
  recaptchaToken?: string;
}

/**
 * Data and methods returned from the {@link useForgotPassword} composable
 */
export interface UseForgotPasswordInterface {
  /** Returns the result of the reset operation */
  result: Readonly<Ref<UseForgotPasswordResults>>;
  /** Returns the loading state */
  loading: Readonly<Ref<boolean>>;
  /** Returns possible errors */
  error: Readonly<Ref<UseForgotPasswordErrors>>;
  /** Sets the new password fot the user */
  setNew (params: ComposableFunctionArgs<UseForgotPasswordSetNewParams>): Promise<void>;
  /** Requests a new password reset email to be sent to user */
  request(params: ComposableFunctionArgs<UseForgotPasswordResetParams>): Promise<void>;
}
