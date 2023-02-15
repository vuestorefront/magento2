import { ApiClientMethods, IntegrationContext } from '@vue-storefront/middleware';
import { ClientInstance, Config } from './setup';
import { MagentoApiMethods } from './API';

export type Context = IntegrationContext<ClientInstance, Config, ApiClientMethods<MagentoApiMethods>>;
