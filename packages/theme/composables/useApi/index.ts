import { useContext } from '@nuxtjs/composition-api';
import type { Variables } from 'graphql-request';

type Request = <T = any, V = Variables>(document: string, variables?: V, requestHeaders?: HeadersInit) => Promise<T>;

export const useApi = () => {
  const context = useContext();
  const query : Request = (document, variables, headers) => context.$graphql.query.request(document, variables, headers);
  const mutate : Request = (document, variables, headers) => context.$graphql.mutation.request(document, variables, headers);

  return { query, mutate };
};

export default useApi;
