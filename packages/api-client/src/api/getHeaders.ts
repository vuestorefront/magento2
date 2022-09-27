import { Context } from '../types/context';
import type { CustomHeaders } from '../types/API';

export default function getHeaders(context: Context, customHeaders: CustomHeaders = {}) {
  const { getCustomerToken, getStore, getCurrency } = context.config.state;

  return {
    ...(getCustomerToken() && { Authorization: `Bearer ${getCustomerToken()}` }),
    ...(getStore() && { store: getStore() }),
    ...(getCurrency() && { 'Content-Currency': getCurrency() }),
    ...customHeaders,
  };
}
