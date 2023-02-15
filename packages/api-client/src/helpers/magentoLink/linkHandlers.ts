import consola from 'consola';
import { setContext } from '@apollo/client/link/context';
import { ConfigState } from '../../types/setup';

export const handleRetry = () => (count, operation, error) => {
  if (count > 3) {
    return false;
  }

  if (error?.result?.message === 'invalid_token') {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    consola.debug(`Apollo retry-link, the operation (${operation.operationName}) sent with wrong token, creating a new one... (attempt: ${count})`);
    return true;
  }

  return false;
};

export const linkFactory = ({ state }: {
  state: ConfigState;
}) => setContext((apolloReq, { headers }) => {
  consola.debug('Apollo linkFactory', apolloReq.operationName);

  const Store: string = state.getStore();
  const token: string = state.getCustomerToken();
  const currency: string = state.getCurrency();

  if (currency) {
    consola.debug('Apollo currencyLinkFactory, finished, currency: ', currency);
  }

  if (Store) {
    consola.debug('Apollo storeLinkFactory, finished, storeId: ', Store);
  }

  if (token) {
    consola.debug('Apollo authLinkFactory, finished, token: ', token);
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
