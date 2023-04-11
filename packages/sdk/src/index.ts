import { connector } from './connector';
import type { Module } from '@vsf-enterprise/sdk';
import { Options } from './types';

export interface MagentoModuleType extends Module {
  connector: ReturnType<typeof connector>;
}

/**
 * This is the main entry point for the module
 * Factory function that returns the module must be exported
 */
export const magentoModule = (options: Options): MagentoModuleType => {
  return {
    connector: connector(options)
  };
};

export { client } from './client';
