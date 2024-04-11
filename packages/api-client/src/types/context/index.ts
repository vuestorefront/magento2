import { type IntegrationContext } from "@vue-storefront/middleware";
import { type ClientInstance, type Config } from "../setup";
import { type Endpoints } from "../api";

export interface Context extends IntegrationContext<ClientInstance, Config, Endpoints> {}
