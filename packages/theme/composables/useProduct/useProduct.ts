import type { Ref } from '@nuxtjs/composition-api';
import type {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductsListQuery,
  ProductDetailsQuery,
} from '~/modules/GraphQL/types';

export declare type GetProductSearchParams = {
  pageSize?: number;
  currentPage?: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
  configurations?: string[];
};

export type ProductList = ProductsListQuery['products'];

export type ProductDetails = ProductDetailsQuery['products'];

export interface UseProductErrors {
  search: Error | null;
}

export interface UseProductInterface {
  error: Ref<UseProductErrors>;
  loading: Ref<boolean>;
  getProductList(searchParams: GetProductSearchParams): Promise<ProductList | null>;
  getProductDetails(searchParams: GetProductSearchParams): Promise<ProductDetails | null>;
}
