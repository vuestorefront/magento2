import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { ProductsListQuery, ProductDetailsQuery } from '~/modules/GraphQL/types';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';
import { Product } from '~/modules/catalog/product/types';

export type ProductList = ProductsListQuery['products'];

export type ProductDetails = ProductDetailsQuery['products'];

/**
 * The {@link useProduct} error object. The properties values' are the errors
 * thrown by its methods.
 */
export interface UseProductErrors {
  /** Error when fetching the product list method fails, otherwise is `null`. */
  getProductList: Error | null;

  /** Error when fetching product details method fails, otherwise is `null`. */
  getProductDetails: Error | null;
}

/**
 * Data and methods returned from the {@link useProduct} composable.
 */
export interface UseProductInterface {
  /**
   * Contains errors from any of the composable methods.
   *
   * @see {@link UseProductErrors} documentation for more details.
   */
  error: DeepReadonly<Ref<UseProductErrors>>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;

  /** Fetches a list of products with sorting, filtering and pagination. */
  getProductList(searchParams: GetProductSearchParams): Promise<ProductList | null>;

  /** Fetches a product details with sorting, filtering and pagination. */
  getProductDetails(searchParams: GetProductSearchParams): Promise<ProductDetails | null>;

  /** Get a product path from url_rewrites or url_key */
  getProductPath(product: Product): string;
}
