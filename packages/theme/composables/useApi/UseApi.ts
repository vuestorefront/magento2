import { Variables } from 'graphql-request';

export interface UseApiInterface {
  query<DATA = any, VARIABLES extends Variables = Variables>(
    document: string,
    variables?: VARIABLES,
    requestHeaders?: HeadersInit
  ): Promise<DATA>;

  mutate<DATA = any, VARIABLES extends Variables = Variables>(
    document: string,
    variables?: VARIABLES,
    requestHeaders?: HeadersInit
  ): Promise<DATA>;
}
