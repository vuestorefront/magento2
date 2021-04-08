import ApolloClient, { ApolloClientOptions } from 'apollo-client';
import { MagentoMethods } from './context';

type ExternalCheckoutStore = {
  cmsUrl: string;
};

export interface Storage {
  set: (
    name: string,
    value: any
  ) => void;
  get: (name: string) => any;
  remove: (name: string) => any;
  removeAll: () => void;
}

export type Website = {
  code: string;
  defaultStoreGroup: string;
  storeGroups: Record<string, StoreGroup>;
};

export type StoreGroup = {
  code: string;
  defaultStore: string;
  stores: Record<string, Store>;
  website?: Website;
};

export type Store = {
  code: string;
  storeGroup?: StoreGroup;
};

export interface ApiClientSettings {
  storage: Storage;
  api?: {
    uri: string;
  };
  tax: {
    displayCartSubtotalIncludingTax: boolean;
  };
  externalCheckout: {
    enabled: boolean;
    cmsUrl: string;
    stores: Record<string, ExternalCheckoutStore>;
  };
  websites: Record<string, Website>;
  defaultStore: string;
  overrides: MagentoMethods;
}

export interface LocaleItem {
  name: string;
  label: string;
}

export type ConfigState = {
  getCartId(): string;
  setCartId(id: string): void;
  getCustomerToken(): string;
  setCustomerToken(token: string): void;
  getStore(): string;
  setStore(id: string): void;
};

export interface ClientConfig {
  api: string;
  customOptions?: ApolloClientOptions<any>;
  currency: string;
  websites: Record<string, Website>;
  defaultStore: string;
  tax: {
    displayCartSubtotalIncludingTax: boolean;
  };
  cookies: {
    currencyCookieName: string;
    countryCookieName: string;
    localeCookieName: string;
    cartCookieName: string;
    customerCookieName: string;
    storeCookieName: string;
  },
}

export interface Config<T = any> extends ClientConfig{
  client?: ApolloClient<T>;
  storage: Storage;
  state: ConfigState;
}

export interface ClientInstance extends ApolloClient<any> {
}

export default Storage;
