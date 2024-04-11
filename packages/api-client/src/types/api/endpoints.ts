import { WithoutContext } from "@vue-storefront/middleware";
import * as apiMethods from "../../api";

/**
 * Methods of the API client.
 */
export type ApiMethods = typeof apiMethods;

/**
 * Endpoints available in the Magento integration.
 */
export type Endpoints = WithoutContext<ApiMethods>;
