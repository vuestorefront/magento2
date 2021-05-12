// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  ComputedProperty,
  FacetSearchResult,
  ComposableFunctionArgs,
  CustomQuery, AgnosticCategoryTree, AgnosticBreadcrumb,
} from '@vue-storefront/core';
import { Ref, ComputedRef } from '@vue/composition-api';
import {
  Category, Customer, MagentoCustomerGender, Product,
} from '@vue-storefront/magento-api';
import { UseCategoryErrors } from '@vue-storefront/core/lib/src/types';

export type User = Customer;

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  gender?: MagentoCustomerGender,
  taxvat?: string;
  prefix?: string
  suffix?: string
};

export type RegisterUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type Filter = Record<string, any>;

export interface FacetResultsData {
  products: Product[];
  categories: Category[];
  facets: Record<string, Filter>;
  total: number;
  perPageOptions: number[];
  itemsPerPage: number;
  availableFilters: Record<string, any>;
}

export interface UseRouter<ROUTE> {
  search: (url: string) => Promise<void>;
  result: ComputedProperty<ROUTE>;
  error: ComputedProperty<UseRouterErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseRouterErrors {
  search: Error;
}

export interface UseCategorySearch<CATEGORY> {
  search: (params: { term: string }) => Promise<CATEGORY[]>;
  result: ComputedProperty<CATEGORY[]>;
  error: ComputedProperty<UseCategorySearchErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseCategorySearchErrors {
  search: Error;
}

export interface UseConfig<CONFIG> {
  config: ComputedRef<CONFIG>;
  loadConfig: () => Promise<void>;
  loading: ComputedRef<boolean>;
}

export interface UsePage<PAGE> {
  page: ComputedProperty<PAGE>;
  loadPage: (identifier: string) => Promise<void>;
  loading: ComputedProperty<boolean>;
}

export interface Breadcrumb {
  text: string;
  route: {
    path: string;
  };
}

export type OrdersResponse = {
  data: any[];
  total: number;
};

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

export interface UseCategory<CATEGORY, CATEGORY_SEARCH_PARAMS> {
  categories: ComputedProperty<CATEGORY[]>;
  search(params: ComposableFunctionArgs<CATEGORY_SEARCH_PARAMS>): Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseCategoryErrors>;
}

export interface CategoryGetters<CATEGORY> {
  getTree: (category: CATEGORY) => AgnosticCategoryTree | null;
  getBreadcrumbs: (category: CATEGORY) => AgnosticBreadcrumb[];
  getCategoryTree?: (
    category: CATEGORY,
    currentCategory: string,
    withProducts: boolean,
  ) => AgnosticCategoryTree | null;
  [getterName: string]: any;
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
