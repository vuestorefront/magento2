// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  ComputedProperty,
  UseCategory,
  UseProduct,
  FacetSearchResult,
  ComposableFunctionArgs,
  CustomQuery,
} from '@vue-storefront/core';
import { Ref, ComputedRef } from '@vue/composition-api';
import {
  ProductInterface,
  CartInterface,
  CartItemInterface,
  CouponInterface,
  Customer,
} from '@vue-storefront/magento-api';
import { ProductAttributeFilterInput, ProductAttributeSortInput, ProductsQueryType } from '@vue-storefront/magento-api/src';

// @todo: replace with real types
type Product = ProductInterface;

type Category = Record<string, any>;

type CategorySearchParams = Record<string, any>;

type User = Customer;

type UpdateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
};

type RegisterUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// @todo: replace with real Cart types
type Cart = CartInterface;

type CartItem = CartItemInterface;

type Coupon = CouponInterface;

type Order = Record<string, any>;

type OrderItem = Record<string, any>;

type WishlistProduct = Record<string, any>;

type Wishlist = Record<string, any>;

type Route = Record<string, any>;

type Config = Record<string, any>;

type Page = Record<string, any>;

type Filter = Record<string, any>;

export interface FacetResultsData {
  products: Product[];
  categories: Category[];
  facets: Record<string, Filter>;
  total: number;
  perPageOptions: number[];
  itemsPerPage: number;
  availableFilters: Record<string, any>;
}

interface UseRouter<ROUTE> {
  route: ComputedProperty<ROUTE>;
  search: (url: string) => Promise<void>;
  loading: ComputedProperty<boolean>;
}

interface UseConfig<CONFIG> {
  config: ComputedRef<CONFIG>;
  loadConfig: () => Promise<void>;
  loading: ComputedRef<boolean>;
}

interface UsePage<PAGE> {
  page: ComputedProperty<PAGE>;
  loadPage: (identifier: string) => Promise<void>;
  loading: ComputedProperty<boolean>;
}

interface Breadcrumb {
  text: string;
  route: {
    path: string;
  };
}

/** Copied From new version */
export type Shipping = Record<string, unknown>;
export type Address = Record<string, unknown>;
export type UserAddress = Record<string, unknown>;
export type OrderSearchParams = Record<string, any>;

export type OrdersResponse = {
  data: any[];
  total: number;
};

export type ShippingMethod = Record<string, unknown>;

export interface UseUserOrderSearchParams {
  id?: any;
  page?: number;
  perPage?: number;
  [x: string]: any;
}
export interface UseUserOrderErrors {
  search?: Error;
}

export interface UseUserOrder<ORDERS, ORDER_SEARCH_PARAMS> {
  orders: ComputedProperty<ORDERS>;
  search(params: ComposableFunctionArgs<ORDER_SEARCH_PARAMS>): Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUserOrderErrors>;
}

export interface UseBillingErrors {
  load?: Error;
  save?: Error;
}

export interface UseBilling<BILLING, BILLING_PARAMS> {
  billing: ComputedProperty<BILLING>;
  error: ComputedProperty<UseBillingErrors>;
  load(): Promise<void>;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  loading: ComputedProperty<boolean>;
  save: (params: { params: BILLING_PARAMS; billingDetails: BILLING; customQuery?: CustomQuery }) => Promise<void>;
}

export interface UseShippingErrors {
  load?: Error;
  save?: Error;
}

export interface UseShipping<SHIPPING, SHIPPING_PARAMS> {
  error: ComputedProperty<UseShippingErrors>;
  loading: ComputedProperty<boolean>;
  shipping: ComputedProperty<SHIPPING>;
  load(): Promise<void>;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  save: (params: { params: SHIPPING_PARAMS; shippingDetails: SHIPPING; customQuery?: CustomQuery }) => Promise<void>;
}

export interface UseShippingErrors {
  load?: Error;
  save?: Error;
}

export interface UseShippingProvider<STATE, SHIPPING_METHOD> {
  error: ComputedProperty<UseShippingErrors>;
  loading: ComputedProperty<boolean>;
  state: ComputedProperty<STATE>;
  setState(state: STATE): void;
  load(): Promise<void>;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  save(params: { shippingMethod: SHIPPING_METHOD, customQuery?: CustomQuery }): Promise<void>;
}

export interface UseShippingProviderErrors {
  load?: Error;
  save?: Error;
}

export interface UseMakeOrderErrors {
  make?: Error;
}

export interface UseMakeOrder<ORDER> {
  order: Ref<ORDER>;
  make(params: { customQuery?: CustomQuery }): Promise<void>;
  error: ComputedProperty<UseMakeOrderErrors>;
  loading: ComputedProperty<boolean>;
}

export type SearchData = FacetSearchResult<FacetResultsData>;

export {
  Cart,
  CartItem,
  Category,
  CategorySearchParams,
  Coupon,
  Order,
  OrderItem,
  Product,
  User,
  UpdateUserParams,
  RegisterUserParams,
  Wishlist,
  WishlistProduct,
  Page,
  Filter,
  UseCategory,
  UseProduct,
  UseRouter,
  UsePage,
  Route,
  Breadcrumb,
  UseConfig,
  Config,
};
