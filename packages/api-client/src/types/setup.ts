import ApolloClient, { ApolloClientOptions } from 'apollo-client';
import { Storage, Website } from './index';

export interface LocaleItem {
  name: string;
  label: string;
}

export interface Config<T = any> {
  client?: ApolloClient<T>;
  api: string;
  customOptions?: ApolloClientOptions<any>;
  currency: string;
  websites: Record<string, Website>;
  defaultStore: string;
  storage: Storage;
  state: any;
  tax: {
    displayCartSubtotalIncludingTax: boolean;
  };
}

export default Storage;
