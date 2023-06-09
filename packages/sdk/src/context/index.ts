import type { ModuleOptions } from '../types';

class SdkContext extends Map {
  constructor() {
    super();
  }

  get<T extends keyof ModuleOptions>(key: T): ModuleOptions[T] {
    return super.get(key);
  }

  set<T extends keyof ModuleOptions>(key: T, value: ModuleOptions[T]) {
    super.set(key as string, value);
    return this;
  }
}

/**
 * Map containing SDK module configuration values
 */
const sdkContext = new SdkContext();

export { sdkContext };
