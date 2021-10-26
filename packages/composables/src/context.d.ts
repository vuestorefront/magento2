import { ApiClientMethods, IntegrationContext } from '@absolute-web/vsf-core';
import { ClientInstance, Config, MagentoApiMethods } from '@absolute-web/magento-api';

declare module '@absolute-web/vsf-core' {
  export interface Context {
    $magento: IntegrationContext<ClientInstance, Config, ApiClientMethods<MagentoApiMethods>>;
  }
}
