import { setContext } from "@apollo/client/link/context";
import { getLogger, type AlokaiContainer } from "@vue-storefront/middleware";
import { ConfigState } from "../../types/setup";

export const handleRetry =
  ({ alokai }: { alokai: AlokaiContainer }) =>
  (count, operation, error) => {
    const logger = getLogger(alokai);

    if (count > 3) {
      return false;
    }

    if (error?.result?.message === "invalid_token") {
      logger.debug(`Apollo retry-link, the operation (${operation.operationName}) sent with wrong token, creating a new one... (attempt: ${count})`);
      return true;
    }

    return false;
  };

export const linkFactory = ({ state, alokai }: { state: ConfigState; alokai: AlokaiContainer }) =>
  setContext((apolloReq, { headers }) => {
    const logger = getLogger(alokai);

    logger.debug(`Apollo linkFactory ${apolloReq.operationName}`);

    const Store: string = state.getStore();
    const token: string = state.getCustomerToken();
    const currency: string = state.getCurrency();

    if (currency) {
      logger.debug(`Apollo currencyLinkFactory, finished, currency: ${currency}`);
    }

    if (Store) {
      logger.debug(`Apollo storeLinkFactory, finished, storeId: ${Store}`);
    }

    if (token) {
      logger.debug(`Apollo authLinkFactory, finished, token: ${token}`);
    }

    return {
      headers: {
        ...headers,
        ...(currency ? { "Content-Currency": currency } : {}),
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        ...(Store ? { Store } : {}),
      },
    };
  });
