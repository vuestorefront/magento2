import { type ApiClientMethods, type IntegrationContext } from "@vue-storefront/middleware";
import { type ClientInstance, type Config } from "../setup";
import { type Endpoints } from "../api"

export type Context = IntegrationContext<ClientInstance, Config, ApiClientMethods<Endpoints>>;
