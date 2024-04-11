import type { Module } from '@vue-storefront/sdk';
import { connector } from './connector';
import { ModuleOptions } from './types';

/**
 * @deprecated This type is deprecated and will be removed in the next major version.
 * It is no longer necessary to use this type. Please, check documentation of `magentoModule`.
 */
export interface MagentoModuleType extends Module {
  connector: ReturnType<typeof connector>;
}

/**
 * Magento module.
 *
 * @example Initialization of the Magento module.
 *
 * ```js
 * import { initSDK, buildModule } from '@vue-storefront/sdk';
 * import { magentoModule, MagentoModuleType } from '@vue-storefront/magento2-sdk'
 *
 * const sdkConfig = {
 *   magento:
 *     buildModule(
 *       magentoModule,
 *       {
 *         apiUrl: 'http://localhost:8181/magento',
 *       }
 *     )
 * };
 *
 * export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
 * ```
 */
export const magentoModule = (options: ModuleOptions) => {
  return {
    connector: connector(options),
  };
};

export { client } from './client';
export type * from './methods';
