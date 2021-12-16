import { ApolloClient, ApolloClientOptions } from '@apollo/client/core';
import { HttpOptions } from '@apollo/client/link/http/selectHttpOptionsAndBody';
import { MagentoApiMethods } from './API';

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
  getCustomerToken(): string;
  setCustomerToken(token?: string | null): void;
  getStore(): string;
  setStore(id?: string | null): void;
  getCurrency(): string;
  setCurrency(id?: string | null): void;
  getLocale(): string;
  setLocale(id?: string | null): void;
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

export interface Config<T = any> extends ClientConfig {
  client?: ApolloClient<T>;
  storage: Storage;
  customOptions?: ApolloClientOptions<any>;
  customApolloHttpLinkOptions?: HttpOptions;
  overrides: MagentoApiMethods;
}

export interface ClientInstance extends ApolloClient<any> {
}
