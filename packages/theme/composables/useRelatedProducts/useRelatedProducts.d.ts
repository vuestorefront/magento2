import { ComposableFunctionArgs, ProductsSearchParams } from '~/composables/types';
import { Ref } from '@nuxtjs/composition-api';
import { RelatedProductQuery } from '~/modules/GraphQL/types';

export interface UseRelatedProductsError {
  search: Error | null;
}

export type RelatedProducts = RelatedProductQuery['products']['items'][0]['related_products'];

export interface UseRelatedProductsInterface {
  search: (params?: ComposableFunctionArgs<ProductsSearchParams>) => Promise<Array<RelatedProducts>>;
  loading: Ref<boolean>;
  error: Ref<UseRelatedProductsError>;
}
