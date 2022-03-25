import {
  BundleProduct,
  ConfigurableProduct,
  DownloadableProduct,
  GroupedProduct,
  ProductInterface,
  VirtualProduct,
  CategorySearchQuery, CategoryTree,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  AvailableStoresQuery,
  CountriesListQuery,
  CartItemInterface,
  AvailableShippingMethod,
  ProductReviewRatingsMetadataQuery,
  CustomerAddress,
} from '~/modules/GraphQL/types';

export declare type CustomerProductReviewParams = {
  pageSize: number;
  currentPage: number;
};

export interface UseStoreErrors {
  load: Error | null;
  change: Error | null;
}

export declare type GetProductSearchParams = {
  pageSize?: number;
  currentPage?: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
  configurations?: string[];
};

export declare type AvailableStores = AvailableStoresQuery['availableStores'];
export declare type CartItem = CartItemInterface;
export declare type CustomQuery = Record<string, string>;
export declare type Category = CategoryTree | CategorySearchQuery['categoryList'][0];
export interface Product extends ProductInterface, ConfigurableProduct, Omit<BundleProduct, 'items'>, Omit<GroupedProduct, 'items'>, Omit<DownloadableProduct, 'items'>, Omit<VirtualProduct, 'items'> { __typename: string }
export declare type Filter = Record<string, any>;
export declare type Countries = CountriesListQuery['countries'][0];
export declare type ShippingMethod = AvailableShippingMethod;
export declare type ReviewMetadata = ProductReviewRatingsMetadataQuery['productReviewRatingsMetadata']['items'][0];

export declare type ComposableFunctionArgs<T> = T & {
  customQuery?: CustomQuery;
};

export interface AgnosticPaymentMethod {
  label: string;
  value: string;
}

export interface AgnosticReviewMetadata {
  id: string;
  name: string;
  values: {
    label: string | number;
    id: string;
  }[];
}

export interface AgnosticFacet {
  type: string;
  id: string;
  value: any;
  attrName?: string;
  count?: number;
  selected?: boolean;
  metadata?: any;
}

export interface CategoryTreeInterface {
  label: string;
  slug?: string;
  items: CategoryTreeInterface[];
  isCurrent: boolean;
  count?: number;
  [x: string]: unknown;
}

export interface TransformedCustomerAddress extends CustomerAddress {
  apartment: string,
  neighborhood: string,
  extra: string,
  phone: string,
  email: string,
}
