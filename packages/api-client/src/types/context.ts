import { ApiClientMethods, IntegrationContext } from '@absolute-web/vsf-core';
import { ClientInstance, Config } from './setup';
import { MagentoApiMethods } from './API';

export type Context = IntegrationContext<ClientInstance, Config, ApiClientMethods<MagentoApiMethods>>;
