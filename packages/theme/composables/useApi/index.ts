import { useContext } from '@nuxtjs/composition-api';
import type { Variables } from 'graphql-request';

export type Request = <DATA = any, VARIABLES extends Variables = Variables>(
  document: string,
  variables?: VARIABLES,
  requestHeaders?: HeadersInit
) => Promise<DATA>;

/**
 * Methods returned by the {@link useApi|useApi()} composable.
 */
export interface UseApiInterface {
  /**
   * Executes received GraphQL query with optional variables and headers and
   * returns the result.
   *
   * @example
   *
   * Execute a GraphQL query and handle its error, loading and result:
   *
   * ```ts
   * import { useApi } from '~/composables/useApi';
   *
   * const GET_CART_PRICE_QUERY = `
   *   query GET_CART_PRICE_QUERY($cartId: String!) {
   *     cart(cart_id: $cartId) {
   *       prices {
   *         subtotal_excluding_tax {
   *           value
   *         }
   *       }
   *     }
   *   }
   * `;
   *
   * export default {
   *   setup() {
   *     const { query } = useApi();
   *
   *     async function getCartPrice(cartId: string) {
   *       return await query(
   *         GET_CART_PRICE_QUERY,
   *         { cartId },
   *         { 'Accept': 'application/json' }
   *       );
   *     }
   *   }
   * };
   * ```
   */
  query: Request;

  /**
   * Executes received GraphQL Mutation with optional variables and headers and
   * returns the result.
   */
  mutate: Request;
}

/**
 * The `useApi()` composable allows executing GraphQL queries and mutations.
 */
export function useApi(): UseApiInterface {
  const context = useContext();

  const query: Request = (
    document,
    variables,
    headers,
  ) => context.$graphql.query.request(document, variables, headers);

  const mutate: Request = (
    document,
    variables,
    headers,
  ) => context.$graphql.mutation.request(document, variables, headers);

  return { query, mutate };
}

export default useApi;
