import {
  BundleProduct,
  ConfigurableProduct,
  DownloadableProduct,
  GroupedProduct, ProductAttributeFilterInput, ProductAttributeSortInput,
  ProductInterface,
  VirtualProduct,
} from '~/modules/GraphQL/types';

export interface ProductAttribute {
  name?: string;
  value: string | Record<string, any>;
  label: string;
}

/**
 * There is no __typename in GraphQL definitions but type_id is marked as a deprecated
 */
export interface Product extends ProductInterface, ConfigurableProduct, Omit<BundleProduct, 'items'>, Omit<GroupedProduct, 'items'>, Omit<DownloadableProduct, 'items'>, Omit<VirtualProduct, 'items'> { __typename: string }

/**
 * GraphQL's definitions lacks __typename field so we introduce WithTypename to extend any product type if required
 */
export type WithTypename<TProduct> = TProduct & { __typename: string };

export declare type GetProductSearchParams = {
  search?: string;
  filter?: ProductAttributeFilterInput;
  pageSize?: number;
  currentPage?: number;
  sort?: ProductAttributeSortInput;
  configurations?: string[];
};
