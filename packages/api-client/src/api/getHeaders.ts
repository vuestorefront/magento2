import type { CustomHeaders } from "@vue-storefront/magento-types";
import { Context } from "../types/context";

export default function getHeaders(context: Context, customHeaders: CustomHeaders = {}) {
  const { getCustomerToken, getStore, getCurrency } = context.config.state;

  return {
    ...(getCustomerToken() && { Authorization: `Bearer ${getCustomerToken()}` }),
    ...(getStore() && { store: getStore() }),
    ...(getCurrency() && { "Content-Currency": getCurrency() }),
    ...customHeaders,
  };
}
