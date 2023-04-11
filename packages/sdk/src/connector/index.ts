import { sdkContext } from 'src/context';
import { Options } from 'src/types';
import * as methods from '../methods';

/**
 * Connector methods.
 */
type Methods = typeof methods;

export const connector = (options: Options): Methods => {
  sdkContext.set('apiUrl', options.apiUrl);
  sdkContext.set('ssrApiUrl', options.ssrApiUrl);

  return methods;
};
