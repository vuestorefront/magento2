import { setContext } from "@apollo/client/link/context";
import { getLogger, type AlokaiContainer } from "@vue-storefront/middleware";
import { ConfigState } from "../../types/setup";

export const handleRetry =
  ({ alokai }: { alokai: AlokaiContainer }) =>
  (retryCount, operation, error) => {
    const logger = getLogger(alokai);

    if (retryCount > 3) {
      return false;
    }

    if (error?.result?.message === "invalid_token") {
      const { operationName } = operation;
      logger.error(`Invalid token used for operation ${operationName}, Apollo retry-link will refresh the token and retry`, {
        operation,
        retryCount,
      });
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
      logger.debug(`Finished executing Apollo currencyLinkFactory.`, { currency });
    }

    if (Store) {
      logger.debug(`Finished executing Apollo storeLinkFactory.`, { Store });
    }

    if (token) {
      logger.debug(`Finished executing Apollo authLinkFactory.`, { token });
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
