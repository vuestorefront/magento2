import { ApolloClient, ApolloClientOptions } from '@apollo/client/core';
import { HttpOptions } from '@apollo/client/link/http/selectHttpOptionsAndBody';
import { MagentoApiMethods } from '@vsf-enterprise/magento-api-types';

export interface Storage {
  set: (
    name: string,
    value: any
  ) => void;
  get: (name: string) => any;
  remove: (name: string) => any;
  removeAll: () => void;
}

export type StoreGroup = {
  code: string;
  defaultStore: string;
  stores: Record<string, Store>;
  website?: Website;
};

export type Website = {
  code: string;
  defaultStoreGroup: string;
  storeGroups: Record<string, StoreGroup>;
};

export interface LocaleItem {
  name: string;
  label: string;
}

export type Store = {
  code: string;
  storeGroup?: StoreGroup;
};

export type ConfigState = {
  getCartId(): string;
  setCartId(id?: string | null): void;
  removeCartId(): void;
  getCustomerToken(): string;
  setCustomerToken(token?: string | null): void;
  removeCustomerToken(): void;
  getStore(): string;
  setStore(id?: string | null): void;
  removeStore(): void;
  getCurrency(): string;
  setCurrency(id?: string | null): void;
  removeCurrency(): void;
  getLocale(): string;
  setLocale(id?: string | null): void;
  removeLocale(): void;
  getCountry(): string;
  setCountry(id?: string | null): void;
  removeCountry(): void;
  getMessage<T>(): T;
  setMessage<T>(id?: T | null): void;
  removeMessage(): void;
};

export interface ClientConfig {
  api: string;
  cookies: {
    currencyCookieName: string;
    countryCookieName: string;
    localeCookieName: string;
    cartCookieName: string;
    customerCookieName: string;
    storeCookieName: string;
  },
  externalCheckout: {
    enable: boolean;
    cmsUrl: string;
    syncUrlPath: string;
    stores: Record<string, {
      cmsUrl: string;
    }>;
  };
  state: ConfigState;
}

export interface RecaptchaConfig {
  isEnabled: boolean,
  sitekey: string,
  secretkey: string,
  version: number,
  score: number,
}

export interface Config<T = any> extends ClientConfig {
  client?: ApolloClient<T>;
  storage: Storage;
  customOptions?: ApolloClientOptions<any>;
  customApolloHttpLinkOptions?: HttpOptions;
  magentoApiEndpoint: string;
  overrides: MagentoApiMethods;
  recaptcha: RecaptchaConfig;
  imageProvider: string;
  magentoBaseUrl: string;
}

export interface ClientInstance extends ApolloClient<any> {
}
