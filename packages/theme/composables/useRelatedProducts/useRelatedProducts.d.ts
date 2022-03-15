import { ComposableFunctionArgs, ProductsSearchParams } from '@vue-storefront/core';
import { Ref } from '@nuxtjs/composition-api';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  RelatedProductQuery,
} from '@vue-storefront/magento-api';

export interface UseRelatedProductsError {
  search: Error | null;
}

export type RelatedProducts = RelatedProductQuery['products']['items'][0]['related_products'];

export interface UseRelatedProductsInterface {
  search: (params?: ComposableFunctionArgs<ProductsSearchParams>) => Promise<Array<RelatedProducts>>;
  loading: Ref<boolean>;
  error: Ref<UseRelatedProductsError>;
}
