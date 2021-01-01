import ApolloClient, { ApolloClientOptions } from 'apollo-client';

export interface LocaleItem {
  name: string;
  label: string;
}

export interface Config<T = any> {
  client?: ApolloClient<T>;
  api: string;
  customOptions?: ApolloClientOptions<any>;
  currency: string;
  locale: string;
  country: string;
  countries: LocaleItem[];
  currencies: LocaleItem[];
  locales: LocaleItem[];
  languageMap: Record<string, unknown>;
  acceptLanguage: string[];
}
