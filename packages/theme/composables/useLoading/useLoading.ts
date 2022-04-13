import type { Ref } from '@nuxtjs/composition-api';

export interface UseLoadingInterface {
  loading: Ref<boolean>;
  startLoading(): void;
  finishLoading(): void;
  withLoading<TResult = unknown, TArgs extends unknown[] = []>(method: (...args: TArgs) => Promise<TResult>): (...args: TArgs) => Promise<TResult>;
}
