import { WithoutContext } from "@vue-storefront/middleware";
import * as apiMethods from "../../api";

/**
 * ApiMethods type of the Magento 2 integration.
 */
export type ApiMethods = typeof apiMethods;

/**
 * Interface of the Magento 2 integration
 */
export type Endpoints = WithoutContext<ApiMethods>;
