import type { Variables } from 'graphql-request';

/** The interface provided by {@link useApi} composable. */
export interface UseApiInterface {
  /**
   * Executes received GraphQL Query with optional variables and headers and
   * returns the result.
   */
  query<DATA = any, VARIABLES extends Variables = Variables>(
    document: string,
    variables?: VARIABLES,
    requestHeaders?: HeadersInit
  ): Promise<DATA>;

  /**
   * Executes received GraphQL Mutation with optional variables and headers and
   * returns the result.
   */
  mutate<DATA = any, VARIABLES extends Variables = Variables>(
    document: string,
    variables?: VARIABLES,
    requestHeaders?: HeadersInit
  ): Promise<DATA>;
}
