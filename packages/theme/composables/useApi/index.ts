import { useContext } from '@nuxtjs/composition-api';
import type { Variables } from 'graphql-request';
import type { UseApiInterface } from './UseApi';

/** The `useApi()` composable allows executing GraphQL queries and mutations. */
export function useApi(): UseApiInterface {
  const context = useContext();

  const query = <DATA = any, VARIABLES extends Variables = Variables>(
    document: string,
    variables?: VARIABLES,
    headers?: HeadersInit,
  ): Promise<DATA> => context.$graphql.query.request(document, variables, headers);

  const mutate = <DATA = any, VARIABLES extends Variables = Variables>(
    document: string,
    variables?: VARIABLES,
    headers?: HeadersInit,
  ): Promise<DATA> => context.$graphql.mutation.request(document, variables, headers);

  return { query, mutate };
}

export * from './UseApi';
export default useApi;
