import type { Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs, ProductsSearchParams } from '~/composables/types';
import type { RelatedProductQuery } from '~/modules/GraphQL/types';

export type RelatedProduct = RelatedProductQuery['products']['items'][number]['related_products'];

export interface UseRelatedProductsError {
  search: Error | null;
}

export type UseRelatedProductsSearchParams = ComposableFunctionArgs<ProductsSearchParams>;

export interface UseRelatedProductsInterface {
  search(params: UseRelatedProductsSearchParams): Promise<RelatedProduct[]>;
  loading: Ref<boolean>;
  error: Ref<UseRelatedProductsError>;
}
