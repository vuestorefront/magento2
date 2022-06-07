import { Context } from '../types/context';

export default function getHeaders(context: Context) {
  const { getCustomerToken, getStore, getCurrency } = context.config.state;

  return {
    ...(getCustomerToken() && { Authorization: `Bearer ${getCustomerToken()}` }),
    ...(getStore() && { store: getStore() }),
    ...(getCurrency() && { 'Content-Currency': getCurrency() }),
  };
}
