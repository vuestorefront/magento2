import { ApiClientMethods, IntegrationContext } from "@vue-storefront/middleware";
import { MagentoApiMethods } from "@vue-storefront/magento-types";
import { ClientInstance, Config } from "./setup";

export type Context = IntegrationContext<ClientInstance, Config, ApiClientMethods<MagentoApiMethods>>;
