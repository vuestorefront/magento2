import { ComposableFunctionArgs, ComputedProperty, CustomQuery } from '@vue-storefront/core';
import { ComputedRef } from '@vue/composition-api';

export interface UseUrlResolver<ROUTE> {
  search: (url: string) => Promise<void>;
  result: ComputedProperty<ROUTE>;
  error: ComputedProperty<UseRouterErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseRouterErrors {
  search: Error;
}

export interface UseExternalCheckout {
  initializeCheckout: (baseUrl: string) => Promise<string>;
  error: ComputedProperty<UseExternalCheckoutErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseExternalCheckoutErrors {
  initializeCheckout: Error;
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

export interface UseCountrySearch<COUNTRIES, COUNTRY> {
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

export interface UseConfig<CONFIG> {
  config: ComputedRef<CONFIG>;
  loadConfig: () => Promise<void>;
  loading: ComputedRef<boolean>;
}

export interface UseContent<PAGE> {
  page: ComputedProperty<PAGE>;
  loadContent: (identifier: string) => Promise<void>;
  loading: ComputedProperty<boolean>;
}

export interface UseGetShippingMethods<SHIPPING_METHOD> {
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
export interface UsePaymentProvider<STATE, PAYMENT_METHOD> {
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

export interface UseGuestUser<GUEST_USER> {
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
}
export interface UseReview<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS, REVIEW_METADATA> {
  search(params: ComposableFunctionArgs<REVIEWS_SEARCH_PARAMS>): Promise<void>;
  addReview(params: ComposableFunctionArgs<REVIEW_ADD_PARAMS>): Promise<void>;
  loadReviewMetadata(): Promise<void>;
  error: ComputedProperty<UseReviewErrors>;
  reviews: ComputedProperty<REVIEW>;
  metadata: ComputedProperty<REVIEW_METADATA[]>;
  loading: ComputedProperty<boolean>;
  [x: string]: any;
}
