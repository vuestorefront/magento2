import { ApiClientMethods, IntegrationContext } from '@vue-storefront/core';
import { ClientInstance, Config, MagentoApiMethods } from '@vue-storefront/magento-api';

declare module '@vue-storefront/core' {
  export interface Context {
    $magento: IntegrationContext<ClientInstance, Config, ApiClientMethods<MagentoApiMethods>>;
  }
}
