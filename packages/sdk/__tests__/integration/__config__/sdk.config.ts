import { buildModule, initSDK } from '@vsf-enterprise/sdk';
import { magentoModule } from '../../../src';

const sdkConfig = {
  myModule: buildModule(magentoModule, {})
};

export const sdk = initSDK(sdkConfig);
