import { useContext } from '@nuxtjs/composition-api';
import type { Variables } from 'graphql-request';
import type { UseApiInterface } from './UseApi';

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
 *         const result = await query(GET_CART_PRICE_QUERY, { cartId }, {
 *           'Accept': 'application/json',
 *         });
 *
 *         price.value = result.data?.cart?.prices?.[0]?.subtotal_excluding_tax?.value ?? null;
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
