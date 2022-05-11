export type OnFormComplete = () => void;
export type OnFormError = (message: string) => void;

export type SubmitEventPayload<TForm> = {
  form: TForm,
  onComplete: OnFormComplete,
  onError: OnFormError,
};
