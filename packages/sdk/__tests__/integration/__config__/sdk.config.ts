import { buildModule, initSDK } from '@vue-storefront/sdk';
import { magentoModule } from '../../../src';

const sdkConfig = {
  magento: buildModule(magentoModule, {
    apiUrl: 'http://localhost:8181/magento',
  }),
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
