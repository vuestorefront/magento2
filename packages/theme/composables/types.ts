import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type {
  AvailableStoresQuery,
  CountriesListQuery,
  CartItemInterface,
  AvailableShippingMethod,
  ProductReviewRatingsMetadataQuery,
} from '~/modules/GraphQL/types';

export interface Context<CLIENT = any, CONFIG = any, API = any> {
  [x: string]: IntegrationContext<CLIENT, CONFIG, API> | any;
}

export interface IntegrationContext<CLIENT = any, CONFIG = any, API = any> {
  client: CLIENT;
  config: CONFIG;
  api: API;
  [x: string]: any;
}

export type ContextedPlatformApi<T extends PlatformApi> = {
  [P in keyof T]: T[P] extends (context: Context, ...arg: infer X) => Promise<any>
    ? (...arg: X) => Promise<any>
    : never
};

export type PlatformApi = {
  [functionName: string]: (context: Context, ...args: any[]) => Promise<any>
};

export interface Composable<API extends PlatformApi> {
  api?: ContextedPlatformApi<API>
}

export type ComputedProperty<T> = DeepReadonly<Ref<T>>;

export interface ProductsSearchParams {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: any;
  [x: string]: any;
}

export interface AgnosticFacetSearchParams {
  categorySlug?: string;
  rootCatSlug?: string;
  term?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
  filters?: Record<string, string[]>;
  metadata?: any;
  [x: string]: any;
}

export declare type CustomerProductReviewParams = {
  pageSize: number;
  currentPage: number;
};

export declare type AvailableStores = AvailableStoresQuery['availableStores'];
export declare type CartItem = CartItemInterface;
export declare type CustomQuery = Record<string, string>;
export declare type Filter = Record<string, any>;
export declare type Countries = CountriesListQuery['countries'][0];
export declare type ShippingMethod = AvailableShippingMethod;
export declare type ReviewMetadata = ProductReviewRatingsMetadataQuery['productReviewRatingsMetadata']['items'][0];

export declare type ComposableFunctionArgs<T> = T & {
  customQuery?: CustomQuery;
};

export interface AgnosticPrice {
  regular: number | null;
  special?: number | null;
}

export interface AgnosticMediaGalleryItem {
  small: string;
  normal: string;
  big: string;
}

export interface AgnosticAttribute {
  name?: string;
  value: string | Record<string, any>;
  label: string;
}

export interface AgnosticBreadcrumb {
  text: string;
  link: string;
}

export interface AgnosticTotals {
  total: number;
  subtotal: number;
  special?: number;
  [x: string]: unknown;
}

export interface AgnosticCoupon {
  id: string;
  name: string;
  code: string;
  value: number;
}

export interface AgnosticDiscount {
  id: string;
  name: string;
  description: string;
  value: number;
  code?: string;
}

export interface AgnosticCategoryTree {
  label: string;
  slug?: string;
  items: AgnosticCategoryTree[];
  isCurrent: boolean;
  count?: number;
  [x: string]: unknown;
}

export interface AgnosticFilter {
  id: string;
  label: string;
  values: {
    id: string;
    isSlected?: boolean;
    count?: number;
    label: string;
    value: string;
  }[]
}

export interface AgnosticProductReview {
  id: string;
  author: string;
  date: Date;
  message: string | null;
  rating: number | null;
}

export interface AgnosticLocale {
  code: string;
  label: string;
  [x: string]: unknown;
}

export interface AgnosticCountry {
  code: string;
  label: string;
  [x: string]: unknown;
}

export interface AgnosticCurrency {
  code: string;
  label: string;
  prefixSign: boolean;
  sign: string;
  [x: string]: unknown;
}

export interface AgnosticSortByOption {
  label: string;
  value: string;
  [x: string]: unknown;
}

export interface AgnosticRateCount {
  rate: number;
  count: number;
}

// TODO - remove this interface
export enum AgnosticOrderStatus {
  Open = 'Open',
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Shipped = 'Shipped',
  Complete = 'Complete',
  Cancelled = 'Cancelled',
  Refunded = 'Refunded',
}

export interface FacetInterface {
  type: string;
  id: string;
  value: any;
  attrName?: string;
  count?: number;
  selected?: boolean;
  metadata?: any;
}

export interface GroupedFacetInterface {
  id: string;
  label: string;
  count?: number;
  options: FacetInterface[];
}

export interface AgnosticSort {
  options: FacetInterface[];
  selected: string;
}

export interface AgnosticPagination {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  pageOptions?: number[];
}

export interface AgnosticAddress {
  addressLine1: string;
  addressLine2: string;
  [x: string]: unknown;
}

export interface AgnosticGeoLocation {
  type: string;
  coordinates?: unknown;
  [x: string]: unknown;
}

export interface AgnosticStore {
  name: string;
  id: string;
  description?: string;
  locales?: AgnosticLocale[];
  currencies?: AgnosticCurrency[]
  address?: AgnosticAddress;
  geoLocation?: AgnosticGeoLocation;
  [x: string]: unknown;
}

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
