import fetch from "isomorphic-fetch";
import { defaultSettings } from "../../src/helpers/apiClient/defaultSettings";
import { createMagentoConnection } from "../../src/helpers/magentoLink";
import { apolloClientFactory } from "../../src/helpers/magentoLink/graphQl";
import { storeConfig } from "../../src/api/storeConfig";

const API_URL = "https://magento2-instance.vuestorefront.io/graphql";

const logger = {
  debug: jest.fn(),
  info: jest.fn(),
  notice: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
  critical: jest.fn(),
  alert: jest.fn(),
  emergency: jest.fn(),
};

// jest.mock is hoisted above the imports. Replace only the network transport: every Apollo link (including the
// store/token/currency link) still runs, and we read the headers that
// would be sent to Magento.
jest.mock("isomorphic-fetch", () => ({
  __esModule: true,
  default: jest.fn(async () => ({
    status: 200,
    headers: { get: () => "application/json" },
    text: async () => JSON.stringify({ data: { storeConfig: { store_code: "default" } } }),
  })),
}));

const receivedHeaders = (): Record<string, string> => {
  const [[, options]] = (fetch as unknown as jest.Mock).mock.calls;

  return options.headers;
};

afterEach(() => (fetch as unknown as jest.Mock).mockClear());

// Builds the same client the middleware builds in `init` (index.server.ts),
// with the store, customer token and currency coming from the request cookies.
const createContext = () => {
  const config = {
    ...defaultSettings,
    api: API_URL,
    state: {
      ...defaultSettings.state,
      getStore: () => "default",
      getCustomerToken: () => "cookie-token",
      getCurrency: () => "USD",
    },
  } as any;
  const alokai = { logger } as any;
  const { apolloLink } = createMagentoConnection(config, alokai);
  const client = apolloClientFactory({
    link: apolloLink,
    defaultOptions: {
      query: { errorPolicy: "all", fetchPolicy: "no-cache" },
      mutate: { errorPolicy: "all" },
    },
  });

  return {
    config,
    client,
    extendQuery: (_customQuery, defaults) => defaults,
  } as any;
};

describe("[Magento-API-Client] custom headers", () => {
  it("sends the store, token and currency from the request state by default", async () => {
    await storeConfig(createContext());

    expect(receivedHeaders().store).toBe("default");
    expect(receivedHeaders().authorization).toBe("Bearer cookie-token");
    expect(receivedHeaders()["content-currency"]).toBe("USD");
  });

  it("lets customHeaders override the store, token and currency from the request state", async () => {
    await storeConfig(createContext(), undefined, {
      store: "german",
      Authorization: "Bearer explicit-token",
      "Content-Currency": "EUR",
    });

    expect(receivedHeaders().store).toBe("german");
    expect(receivedHeaders().authorization).toBe("Bearer explicit-token");
    expect(receivedHeaders()["content-currency"]).toBe("EUR");
  });
});
