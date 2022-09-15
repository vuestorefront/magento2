import { useContext } from '@nuxtjs/composition-api';

export type UseContextReturn = ReturnType<typeof useContext>;

export type CustomQuery = Record<string, string>;

export type CustomHeaders = Record<string, string>;

export type ApiClientMethods<T> = {
  [K in keyof T]:
  T[K] extends (...args: any) => any ?
    (...args: [...Parameters<T[K]>, CustomQuery?]) => ReturnType<T[K]> :
    T[K]
};

export interface IntegrationContext<CLIENT = any, CONFIG = any, API = any> {
  client: CLIENT;
  config: CONFIG;
  api: API;
  [x: string]: any;
}
