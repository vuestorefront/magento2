import { ApiClientMethods, IntegrationContext } from '@vue-storefront/core';
import { ClientInstance, Config, MagentoMethods } from '@vue-storefront/magento-api';

declare module '@vue-storefront/core' {
  export interface Context {
    $ma: IntegrationContext<ClientInstance, Config, ApiClientMethods<MagentoMethods>>;
  }
}
