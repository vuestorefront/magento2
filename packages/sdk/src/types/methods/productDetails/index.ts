import { ProductDetailsQuery } from '@vsf-enterprise/magento-api-types';
import { ApolloQueryResult } from '@apollo/client';
import { DeepPartial } from 'ts-essentials';

/**
 * Product details response type
 */
export type ProductDetailsResponse<T extends DeepPartial<ProductDetailsQuery> = ProductDetailsQuery> = ApolloQueryResult<T>
