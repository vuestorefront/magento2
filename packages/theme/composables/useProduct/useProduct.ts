import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { ProductsListQuery, ProductDetailsQuery } from '~/modules/GraphQL/types';
import type { GetProductSearchParams } from '~/composables/types';

export type ProductList = ProductsListQuery['products'];

export type ProductDetails = ProductDetailsQuery['products'];

export interface UseProductErrors {
  search: Error | null;
}

export interface UseProductInterface {
  error: DeepReadonly<Ref<UseProductErrors>>;
  loading: Readonly<Ref<boolean>>;
  getProductList(searchParams: GetProductSearchParams): Promise<ProductList | null>;
  getProductDetails(searchParams: GetProductSearchParams): Promise<ProductDetails | null>;
}
