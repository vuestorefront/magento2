import { sdkContext } from '../context';
import type { ModuleOptions } from '../types';
import * as methods from '../methods';

/**
 * Connector methods.
 */
type Methods = typeof methods;

export const connector = (options: ModuleOptions): Methods => {
  sdkContext.set('apiUrl', options.apiUrl);

  return methods;
};
