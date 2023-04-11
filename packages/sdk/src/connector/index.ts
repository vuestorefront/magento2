import * as methods from '../methods';

/**
 * Connector options.
 */
export interface Options {

  /**
   * The API URL of the client-side environment.
   */
  apiUrl: string;

  /**
   * The API URL of the server-side environment.
   */
  ssrApiUrl?: string;
}

class SdkContext extends Map {
  constructor() {
    super();
  }

  get<T extends keyof Options>(key: T): Options[T] {
    return super.get(key);
  }

  set<T extends keyof Options>(key: T, value: Options[T]) {
    super.set(key as string, value);
    return this;
  }
}

const sdkContext = new SdkContext();

export { sdkContext };

/**
 * Connector methods.
 */
type Methods = typeof methods;

export const connector = (options: Options): Methods => {
  sdkContext.set('apiUrl', options.apiUrl);
  sdkContext.set('ssrApiUrl', options.ssrApiUrl);

  return methods;
};
