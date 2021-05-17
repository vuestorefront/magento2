import { ComputedProperty } from '@vue-storefront/core';
import { ComputedRef } from 'vue-demi';

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
  loadCountries: () => Promise<COUNTRIES[]>;
  searchCountry: (params: { id: string }) => Promise<COUNTRY>;
  countries: ComputedProperty<COUNTRIES[]>;
  country: ComputedProperty<COUNTRY>;
  error: ComputedProperty<UseCategorySearchErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseCountrySearchErrors {
  loadCountries: Error;
  searchCountry: Error;
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
  load: (params: { cartId: string }) => Promise<SHIPPING_METHOD[]>;
  result: ComputedProperty<SHIPPING_METHOD[]>;
  error: ComputedProperty<UseGetShippingMethodsErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseGetShippingMethodsErrors {
  load: Error;
}
