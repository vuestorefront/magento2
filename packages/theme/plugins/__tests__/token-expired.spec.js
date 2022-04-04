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

const appMockFactory = (callbackResponse) => ({
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
      config: {
        state: {
          setCustomerToken: jest.fn(),
          setCartId: jest.fn(),
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

    expect(appMock.$vsf.$magento.config.state.setCustomerToken).toHaveBeenCalled();
    expect(appMock.$vsf.$magento.config.state.setCustomerToken).toHaveBeenCalledWith();
  });
});
