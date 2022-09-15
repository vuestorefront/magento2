import { Context } from '../types/context';

export default function getHeaders(context: Context, customHeaders: Record<string, string> = {}) {
  const { getCustomerToken, getStore, getCurrency } = context.config.state;

  return {
    ...customHeaders,
    ...(getCustomerToken() && { Authorization: `Bearer ${getCustomerToken()}` }),
    ...(getStore() && { store: getStore() }),
    ...(getCurrency() && { 'Content-Currency': getCurrency() }),
  };
}
