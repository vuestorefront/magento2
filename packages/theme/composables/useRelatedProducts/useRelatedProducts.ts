import type { Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs, ProductsSearchParams } from '~/composables/types';
import type { RelatedProductQuery } from '~/modules/GraphQL/types';

export interface UseRelatedProductsError {
  search: Error | null;
}

export type RelatedProducts = RelatedProductQuery['products']['items'][0]['related_products'];

export type UseRelatedProductsSearchParams = ComposableFunctionArgs<ProductsSearchParams>;

export interface UseRelatedProductsInterface {
  search(params: UseRelatedProductsSearchParams): Promise<RelatedProducts[]>;
  loading: Ref<boolean>;
  error: Ref<UseRelatedProductsError>;
}
