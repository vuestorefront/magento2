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
 * @deprecated
 *
 * Use `middlewareModule` instead.
 *
 * ```diff
 * - import { initSDK, buildModule } from '@vue-storefront/sdk';
 * - import { magentoModule } from '@vsf-enterprise/magento-sdk'
 * + import { initSDK, buildModule, middlewareModule } from '@vue-storefront/sdk';
 * + import { Endpoints as MagentoEndpoints } from '@vsf-enterprise/magento-api';
 *
 * const sdkConfig = {
 *   magneto:
 *     buildModule(
 * -      magentoModule,
 * +      middlewareModule<MagentoEndpoints>,
 *       { apiUrl: 'http://localhost:8181/magneto' }
 *     )
 * };
 *
 * export const sdk = initSDK(sdkConfig);
 *
 * // Breaking changes:
 * // - Custom queries are now a second argument of the methods.
 *
 * const customQuery = {
 *   cart: 'cart-custom-query',
 *   metadata: {
 *     fields: 'id items { uid }'
 *   }
 * };
 * - const cart = await sdk.magento.cart({ cartId: '123'}, { customQuery });
 * + const cart = await sdk.magento.cart({ cartId: '123'}, customQuery);
 *
 * ```
 *
 * @example
 * Initialization of the Magento module.
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
  } satisfies Module;
};

export { client } from './client';
export type * from './methods';
