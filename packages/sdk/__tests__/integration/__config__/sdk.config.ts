import { buildModule, initSDK } from '@vsf-enterprise/sdk';
import { magentoModule } from '../../../src';

const sdkConfig = {
  magento: buildModule<ReturnType<typeof magentoModule>>(magentoModule, {
    apiUrl: 'http://localhost:8181/magento',
    ssrApiUrl: 'http://localhost:8181/magento'
  })
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
