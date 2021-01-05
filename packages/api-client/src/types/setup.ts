import ApolloClient, { ApolloClientOptions } from 'apollo-client';
import { ExternalCheckoutStore, Storage, Website } from './index';

export interface LocaleItem {
  name: string;
  label: string;
}

export interface Config<T = any> {
  client?: ApolloClient<T>;
  api: string;
  customOptions?: ApolloClientOptions<any>;
  currency: string;
  externalCheckout?: {
    enabled: boolean; cmsUrl: string; stores: Record<string, ExternalCheckoutStore>;
  };
  websites: Record<string, Website>;
  defaultStore: string;
  storage: Storage;
  tax: {
    displayCartSubtotalIncludingTax: boolean;
  };
}
