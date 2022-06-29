import { useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';

export type FetchPolicy = 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby';

export type Variables = {
  [key: string]: any;
};

export type Error = {
  message: string;
  locations?: {
    line: number;
    column: number;
  }[];
  path?: string[];
  extensions?: any;
};

export type Request = <DATA, VARIABLES extends Variables = Variables>(
  request: string,
  variables?: VARIABLES,
  fetchPolicy?: FetchPolicy,
) => Promise<{ data: DATA, errors: Error[] }>;

/**
 * Data and methods returned from the {@link useApi|useApi()} composable.
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
 * Allows executing arbitrary GraphQL queries and mutations.
 *
 * See the {@link UseApiInterface} for a list of methods and values available in this composable.
 */
export function useApi(): UseApiInterface {
  const context = useContext();

  // @ts-ignore
  const query: Request = async (
    request,
    variables,
  ) => {
    const reqID = `id${Math.random().toString(16).slice(2)}`;
    Logger.debug(`customQuery/request/${reqID}`, request);
    const { data, errors } = await context.app.$vsf.$magento.api.customQuery({ query: request, queryVariables: variables });
    Logger.debug(`customQuery/result/${reqID}`, { data, errors });

    return { data, errors };
  };

  // @ts-ignore
  const mutate: Request = async (
    request,
    variables,
  ) => {
    const reqID = `id${Math.random().toString(16).slice(2)}`;
    Logger.debug(`customQuery/request/${reqID}`, request);
    const { data, errors } = await context.app.$vsf.$magento.api.customMutation({ mutation: request, mutationVariables: variables });
    Logger.debug(`customQuery/result/${reqID}`, { data, errors });

    return { data, errors };
  };

  return { query, mutate };
}

export default useApi;
