import { useContext } from '@nuxtjs/composition-api';
import type { Variables } from 'graphql-request';

type Request = <DATA = any, VARIABLES extends Variables = Variables>(
  document: string,
  variables?: VARIABLES,
  requestHeaders?: HeadersInit
) => Promise<DATA>;

/** The interface provided by {@link useApi} composable. */
export interface UseApiInterface {
  /**
   * Executes received GraphQL Query with optional variables and headers and
   * returns the result.
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
 *
 * @example
 *
 * Execute a GraphQL Query and handle its error, loading and result:
 *
 * ```ts
 * import { ref, readonly } from '@nuxtjs/composition-api';
 * import { useApi } from '~/composables/useApi';
 *
 * type GetCartPriceQueryVariables = { cartId: string };
 *
 * type GetCartPriceQueryData = {
 *   cart: {
 *     prices: {
 *       subtotal_excluding_tax: {
 *         value: number;
 *       };
 *     }[];
 *   };
 * };
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
 *     const price = ref<number | null>(null);
 *     const loading = ref(false);
 *     const error = ref<Error | null>(null);
 *
 *     const getCartPrice = async (cartId: string) => {
 *       loading.value = false;
 *       try {
 *         const result = await query<
 *           GetCartPriceQueryData,
 *           GetCartPriceQueryVariables,
 *         >(GET_CART_PRICE_QUERY, { cartId }, {
 *           'Accept': 'application/json',
 *         });
 *
 *         price.value = result.cart?.prices?.subtotal_excluding_tax?.value ?? null;
 *         error.value = null;
 *       } catch (error) {
 *         price.value = null;
 *         error.value = error;
 *       } finally {
 *         loading.value = false;
 *       }
 *     };
 *
 *     return {
 *       price: readonly(price),
 *       error: readonly(error),
 *       loading: readonly(loading),
 *       getCartPrice,
 *     };
 *   },
 * };
 * ```
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
