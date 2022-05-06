import type { Ref } from '@nuxtjs/composition-api';

export type Form = Ref<Record<string, unknown>>;
export type OnFormComplete = () => void;
export type OnFormError = (message: string) => void;

export type SubmitEventPayload = {
  form: Form,
  onComplete: OnFormComplete,
  onError: OnFormError,
};
