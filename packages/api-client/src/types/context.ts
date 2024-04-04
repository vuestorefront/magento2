import { ApiClientMethods, IntegrationContext } from "@vue-storefront/middleware";
import { MagentoApiMethods } from "@vue-storefront/magento-types";
import { ClientInstance, Config } from "./setup";

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Allow extending this interface
export interface Context extends IntegrationContext<ClientInstance, Config, ApiClientMethods<MagentoApiMethods>> {}
