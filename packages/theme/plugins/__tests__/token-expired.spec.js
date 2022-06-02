import { createPinia, setActivePinia } from 'pinia';
import { useCustomerStore } from '~/modules/customer/stores/customer';
import tokenExpiredPlugin from '../token-expired';

const errRes = {
  data: {
    errors: [
      {
        extensions: {
          category: 'graphql-authorization',
        },
      },
    ],
  },
};

const validRes = {
  data: {
    errors: [],
  },
};

const appMockFactory = (callbackResponse, authResponse) => ({
  $vsf: {
    $magento: {
      client: {
        interceptors: {
          response: {
            use: (callback) => {
              callback(callbackResponse);
            },
          },
        },
      },
      api: {
        customQuery: jest.fn(() => authResponse),
      },
      config: {
        state: {
          getCustomerToken: jest.fn(),
          removeCustomerToken: jest.fn(),
          removeCartId: jest.fn(),
          setMessage: jest.fn(),
        },
      },
    },
  },
  $cookies: {
    remove: jest.fn(),
    set: jest.fn(),
  },
  router: {
    push: jest.fn(),
  },
  localePath: jest.fn(),
  i18n: {
    t: jest.fn(),
  },
});

describe('Token Expired plugin', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    setActivePinia(createPinia());
  });

  it('sets initial login status', async () => {
    const appMock = appMockFactory(validRes, validRes);
    appMock.$vsf.$magento.config.state.getCustomerToken.mockReturnValue(true);
    const customerStore = useCustomerStore();
    jest.spyOn(customerStore, 'setIsLoggedIn');

    await tokenExpiredPlugin({ app: appMock });

    expect(customerStore.setIsLoggedIn).toHaveBeenCalledWith(true);
  });

  it('doesn\'t set initial login status if not logged in', async () => {
    const appMock = appMockFactory(validRes, errRes.data); // need .data because it's ApolloGraphQlResponse, not axios
    appMock.$vsf.$magento.config.state.getCustomerToken.mockReturnValue(false);
    const customerStore = useCustomerStore();

    await tokenExpiredPlugin({ app: appMock });

    expect(customerStore.isLoggedIn).toBe(false);
  });

  it('should be executed only if there is the "graphql-authorization" error', async () => {
    const appMock = appMockFactory(validRes);

    await tokenExpiredPlugin({ app: appMock });

    expect(appMock.router.push).toHaveBeenCalledTimes(0);
  });

  it('should set message cookie', async () => {
    const appMock = appMockFactory(errRes);

    await tokenExpiredPlugin({ app: appMock });

    expect(appMock.$vsf.$magento.config.state.setMessage).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should clear customer token and clear cart id', async () => {
    const appMock = appMockFactory(errRes);

    await tokenExpiredPlugin({ app: appMock });

    expect(appMock.$vsf.$magento.config.state.removeCustomerToken).toHaveBeenCalled();
    expect(appMock.$vsf.$magento.config.state.removeCustomerToken).toHaveBeenCalledWith();
  });
});
