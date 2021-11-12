import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { PlatformApi } from '@vue-storefront/core/lib/src/types';
import { UseCustomMutation } from '../types/composables';
import { FetchPolicy } from '../types';

export interface UseCustomMutationFactoryFactoryParams<
  MUTATION_VARIABLES,
  MUTATION_RETURN,
  API extends PlatformApi = any> extends FactoryParams<API> {
  mutation: (context: Context, {
    variables,
    fetchPolicy,
  }: {
    variables: MUTATION_VARIABLES,
    fetchPolicy?: FetchPolicy,
  }) => Promise<MUTATION_RETURN>;
}

export const useCustomMutationFactory = <MUTATION, MUTATION_VARIABLES, MUTATION_RETURN = any, API extends PlatformApi = any>(
  factoryParams: UseCustomMutationFactoryFactoryParams<MUTATION_VARIABLES, MUTATION_RETURN, API>,
) => function useCustomMutation(ssrKey = 'useCustomMutation'): UseCustomMutation<MUTATION, MUTATION_VARIABLES, MUTATION_RETURN, API> {
  // @ts-ignore
  const mutationString = sharedRef<MUTATION>('', `${ssrKey}-mutationString`);
  const mutationStringComputed = computed(() => mutationString.value);
  // @ts-ignore
  const result = sharedRef<MUTATION_RETURN>({}, `${ssrKey}-result`);
  const loading = sharedRef(false, `${ssrKey}-loading`);
  const error = sharedRef({
    query: null,
  }, `${ssrKey}-error`);
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);

  // eslint-disable-next-line consistent-return
  const mutation = async ({
    variables,
    fetchPolicy,
  }: {
    variables: MUTATION_VARIABLES,
    fetchPolicy?: FetchPolicy,
    // eslint-disable-next-line consistent-return
  }) => {
    Logger.debug(`useCustomMutation/${ssrKey}/mutation`);
    loading.value = true;

    try {
      const data = await _factoryParams.mutation({
        mutation: mutationStringComputed.value,
        variables,
        fetchPolicy,
      });

      result.value = data;

      return data;
    } catch (err) {
      error.value.search = err;

      Logger.error(`useCustomMutation/${ssrKey}/mutation`, err);
    } finally {
      loading.value = false;
    }
  };

  return {
    setMutationString: (newMutationString: string) => {
      mutationString.value = newMutationString;
    },
    mutationString: mutationStringComputed,
    mutation,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
};
