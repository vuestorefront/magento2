import { Logger } from '@vue-storefront/core';
import { setContext } from 'apollo-link-context';
import { ConfigState } from '../../types/setup';

export const handleRetry = () => (count, operation, error) => {
  if (count > 3) {
    return false;
  }

  if (error?.result?.message === 'invalid_token') {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    Logger.debug(`Apollo retry-link, the operation (${operation.operationName}) sent with wrong token, creating a new one... (attempt: ${count})`);
    return true;
  }

  return false;
};

export const linkFactory = ({ state }: {
  state: ConfigState;
}) => setContext((apolloReq, { headers }) => {
  Logger.debug('Apollo linkFactory', apolloReq.operationName);

  const Store: string = state.getStore();
  const token: string = state.getCustomerToken();
  const currency: string = state.getCurrency();

  if (currency) {
    Logger.debug('Apollo currencyLinkFactory, finished, currency: ', currency);
  }

  if (Store) {
    Logger.debug('Apollo storeLinkFactory, finished, storeId: ', Store);
  }

  if (token) {
    Logger.debug('Apollo authLinkFactory, finished, token: ', token);
  }

  return {
    headers: {
      ...headers,
      ...(currency ? { 'Content-Currency': currency } : {}),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(Store ? { Store } : {}),
    },
  };
});
