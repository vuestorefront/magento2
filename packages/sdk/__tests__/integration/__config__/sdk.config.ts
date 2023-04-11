import { buildModule, initSDK } from '@vsf-enterprise/sdk';
import { magentoModule } from '../../../src';

const sdkConfig = {
  magento: buildModule(magentoModule,
    {
      apiUrl: 'http://localhost:8181/magento'
    })
};

export const sdk = initSDK(sdkConfig);
