import type { Module } from '@vue-storefront/sdk';
import { connector } from './connector';
import { ModuleOptions } from './types';

export interface MagentoModuleType extends Module {
  connector: ReturnType<typeof connector>;
}

/**
 * Magento module.
 *
 * @example
 *
 * Initialization of the Magento module.
 *
 * ```js
 * import { initSDK, buildModule } from '@vue-storefront/sdk';
 * import { magentoModule, MagentoModuleType } from '@vue-storefront/magento2-sdk'
 *
 * const sdkConfig = {
 *   magento:
 *     buildModule<MagentoModuleType>(
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
export const magentoModule = (options: ModuleOptions): MagentoModuleType => {
  return {
    connector: connector(options),
  };
};

export { client } from './client';
