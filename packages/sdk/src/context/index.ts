import { Options } from 'src/types';

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

/**
 * Map containing SDK module configuration values
 */
const sdkContext = new SdkContext();

export { sdkContext };
