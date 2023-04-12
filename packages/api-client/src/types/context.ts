import { ApiClientMethods, IntegrationContext } from '@vue-storefront/core';
import { MagentoApiMethods } from '@vsf-enterprise/magento-api-types';
import { ClientInstance, Config } from './setup';

export type Context = IntegrationContext<ClientInstance, Config, ApiClientMethods<MagentoApiMethods>>;
