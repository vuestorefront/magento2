import { computed, ref } from '@nuxtjs/composition-api';
import { UseLoadingInterface } from './useLoading';

export function useLoading(): UseLoadingInterface {
  const ticks = ref<number>(0);

  const loading = computed(() => ticks.value > 0);

  const startLoading = () => {
    ticks.value += 1;
  };

  const finishLoading = () => {
    ticks.value -= 1;
  };

  const withLoading = <TResult, TArgs extends unknown[]>(method: (...args: TArgs) => Promise<TResult>) => {
    const methodWithLoading = async (...args: TArgs): Promise<TResult> => {
      startLoading();

      try {
        // We need to use 'await' here because 'method' can be async.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await method(...args);
      } finally {
        finishLoading();
      }
    };

    methodWithLoading.name = `withLoading(${method.name ?? 'anonymous'})`;

    return methodWithLoading;
  };

  return {
    loading,
    withLoading,
    startLoading,
    finishLoading,
  };
}

export * from './useLoading';

export default useLoading;
