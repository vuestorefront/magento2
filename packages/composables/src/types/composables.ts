import {
  Composable,
  ComposableFunctionArgs, ComputedProperty, Context, CustomQuery,
} from '@vue-storefront/core';
import { ComputedRef, computed } from '@vue/composition-api';
import { PlatformApi, UseProductErrors } from '@vue-storefront/core/lib/src/types';
import { FetchPolicy } from 'apollo-client/core/watchQueryOptions';

export type CustomQueryParams = { customQuery?: CustomQuery; [ k: string]: any };

export interface UseUrlResolver<ROUTE, API extends PlatformApi = any> extends Composable<API>{
  search: (url: string) => Promise<void>;
  result: ComputedProperty<ROUTE>;
  error: ComputedProperty<UseRouterErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseRouterErrors {
  search: Error;
}

export interface UseExternalCheckout<API extends PlatformApi = any> extends Composable<API>{
  initializeCheckout: (baseUrl: string) => Promise<string>;
  error: ComputedProperty<UseExternalCheckoutErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseExternalCheckoutErrors {
  initializeCheckout: Error;
}

export interface UseCategorySearch<CATEGORY, API extends PlatformApi = any> extends Composable<API>{
  search: (params: { term: string }) => Promise<CATEGORY[]>;
  result: ComputedProperty<CATEGORY[]>;
  error: ComputedProperty<UseCategorySearchErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseCategorySearchErrors {
  search: Error;
}

export interface UseCountrySearch<COUNTRIES, COUNTRY, API extends PlatformApi = any> extends Composable<API> {
  load: () => Promise<COUNTRIES[]>;
  search: (params: { id: string }) => Promise<COUNTRY>;
  countries: ComputedProperty<COUNTRIES[]>;
  country: ComputedProperty<COUNTRY>;
  error: ComputedProperty<UseCountrySearchErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseCountrySearchErrors {
  load: Error;
  search: Error;
}

export interface UseConfig<CONFIG, API extends PlatformApi = any> extends Composable<API> {
  config: ComputedRef<CONFIG>;
  loadConfig: () => Promise<void>;
  loading: ComputedRef<boolean>;
}

export interface UseContentErrors {
  content: Error;
  blocks: Error;
}

export interface UseContent<PAGE, BLOCK, API extends PlatformApi = any> extends Composable<API>{
  page: ComputedProperty<PAGE>;
  blocks: ComputedProperty<BLOCK[]>
  loadContent: (identifier: string) => Promise<void>;
  loadBlocks: (identifiers: string[]) => Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseContentErrors>;
}

export interface UseGetShippingMethods<SHIPPING_METHOD, API extends PlatformApi = any> extends Composable<API>{
  state: ComputedProperty<SHIPPING_METHOD[]>;

  setState(state: SHIPPING_METHOD[]): void;

  load: (params: { cartId: string }) => Promise<SHIPPING_METHOD[]>;
  result: ComputedProperty<SHIPPING_METHOD[]>;
  error: ComputedProperty<UseGetShippingMethodsErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseGetShippingMethodsErrors {
  load: Error;
}

export interface UsePaymentProviderErrors {
  load: Error;
  save: Error;
}

export interface UsePaymentProvider<STATE, PAYMENT_METHOD, API extends PlatformApi = any> extends Composable<API>{
  error: ComputedProperty<UsePaymentProviderErrors>;
  loading: ComputedProperty<boolean>;
  state: ComputedProperty<STATE>;

  setState(state: STATE): void;

  load(): Promise<void>;

  load(params: { customQuery?: CustomQuery }): Promise<void>;

  save(params: { paymentMethod: PAYMENT_METHOD, customQuery?: CustomQuery }): Promise<void>;
}

export interface UseGuestUserErrors {
  attachToCart: Error;
}

export interface UseGuestUserRegisterParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;

  [x: string]: any;
}

export interface UseGuestUser<GUEST_USER, API extends PlatformApi = any> extends Composable<API>{
  guestUser: ComputedProperty<GUEST_USER>;
  setGuestUser: (user: GUEST_USER) => void;
  attachToCart: (params: { user: UseGuestUserRegisterParams }) => Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseGuestUserErrors>;
}

export interface UseReviewErrors {
  search: Error;
  addReview: Error;
  loadReviewMetadata: Error;
  loadCustomerReviews: Error;
}

export interface UseReview<REVIEW,
  REVIEWS_SEARCH_PARAMS,
  REVIEWS_USER_SEARCH_PARAMS,
  REVIEW_ADD_PARAMS,
  REVIEW_METADATA,
  API extends PlatformApi = any> extends Composable<API>{
  search(params?: ComposableFunctionArgs<REVIEWS_SEARCH_PARAMS>): Promise<void>;

  loadCustomerReviews(params?: ComposableFunctionArgs<REVIEWS_USER_SEARCH_PARAMS>): Promise<void>;

  addReview(params: ComposableFunctionArgs<REVIEW_ADD_PARAMS>): Promise<void>;

  loadReviewMetadata(): Promise<void>;

  error: ComputedProperty<UseReviewErrors>;
  reviews: ComputedProperty<REVIEW>;
  metadata: ComputedProperty<REVIEW_METADATA[]>;
  loading: ComputedProperty<boolean>;

  [x: string]: any;
}

export interface UseNewsletterErrors {
  updateSubscription: Error;
}

export interface UseNewsletter<UPDATE_NEWSLETTER_PARAMS, API extends PlatformApi = any> extends Composable<API>{
  error: ComputedProperty<UseNewsletterErrors>;
  loading: ComputedProperty<boolean>;
  updateSubscription: (params: { email: UPDATE_NEWSLETTER_PARAMS }) => Promise<void>;
}

export interface UseAddressesErrors {
  load: Error;
  save: Error;
  remove: Error;
  update: Error;
}

export interface UseAddresses<ADDRESS,
  LOAD_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  SAVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  UPDATE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  REMOVE_ADDRESS_PARAMS extends { customQuery?: CustomQuery } = CustomQueryParams,
  API extends PlatformApi = any,
> extends Composable<API> {
  error: ComputedProperty<UseAddressesErrors>;
  loading: ComputedProperty<boolean>;
  addresses: ComputedProperty<ADDRESS[]>;
  load: (loadParams?: LOAD_ADDRESS_PARAMS) => Promise<void>,
  save: (saveParams: SAVE_ADDRESS_PARAMS) => Promise<void>,
  remove: (removeParams: REMOVE_ADDRESS_PARAMS) => Promise<void>,
  update: (updateParams: UPDATE_ADDRESS_PARAMS) => Promise<void>,
}

export interface UseForgotPasswordErrors {
  request: Error;
  setNew: Error;
}

export interface UseForgotPassword<RESULT> {
  result: ComputedProperty<RESULT>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseForgotPasswordErrors>;
  setNew(params: ComposableFunctionArgs<{ tokenValue: string, newPassword: string, email: string }>): Promise<void>;
  request(params: ComposableFunctionArgs<{ email: string }>): Promise<void>;
}

export interface UseRelatedProducts<PRODUCTS, RELATED_PRODUCT_SEARCH_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  products: ComputedProperty<PRODUCTS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseRelatedProductsErrors>;
  search(params: ComposableFunctionArgs<RELATED_PRODUCT_SEARCH_PARAMS>): Promise<void>;
  [x: string]: any;
}

export interface UseRelatedProductsErrors {
  search: Error;
}

export interface UseUpsellProducts<PRODUCTS, UPSELL_PRODUCTS_SEARCH_PARAMS, API extends PlatformApi = any> extends Composable<API> {
  products: ComputedProperty<PRODUCTS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUpsellProductsErrors>;
  search(params: ComposableFunctionArgs<UPSELL_PRODUCTS_SEARCH_PARAMS>): Promise<void>;
  [x: string]: any;
}

export interface UseUpsellProductsErrors {
  search: Error;
}

export interface UseCustomQuery<QUERY, QUERY_VARIABLES, QUERY_RETURN, API extends PlatformApi = any> extends Composable<API> {
  setQueryString: (newQueryString: string) => void;
  queryString: ComputedProperty<QUERY>;
  query: ({
    variables,
    fetchPolicy,
  }: {
    variables: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
    // eslint-disable-next-line consistent-return
  }) => Promise<QUERY_RETURN>;
  result: ComputedProperty<QUERY_RETURN>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUpsellProductsErrors>;
  [x: string]: any;
}

export interface UseUpsellProductsErrors {
  query: Error;
}

export interface UseCustomMutation<MUTATION, MUTATION_VARIABLES, MUTATION_RETURN, API extends PlatformApi = any> extends Composable<API> {
  setMutationString: (newMutationString: string) => void;
  mutationString: ComputedProperty<MUTATION>;
  mutation: ({
    variables,
    fetchPolicy,
  }: {
    variables: MUTATION_VARIABLES,
    fetchPolicy?: FetchPolicy,
    // eslint-disable-next-line consistent-return
  }) => Promise<MUTATION_RETURN>;
  result: ComputedProperty<MUTATION_RETURN>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUpsellProductsErrors>;
  [x: string]: any;
}

export interface UseUpsellProductsErrors {
  query: Error;
}
