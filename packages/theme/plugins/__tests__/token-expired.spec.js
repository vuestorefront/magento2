import tokenExpiredPlugin from '../token-expired';
import cookieNames from '~/enums/cookieNameEnum';

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
    },
  },
  $cookies: {
    remove: jest.fn(),
    set: jest.fn(),
  },
  router: {
    go: jest.fn(),
  },
  localePath: (t) => t,
  i18n: {
    t: (t) => t,
  },
});

describe('Token Expired plugin', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be executed only if there is the "graphql-authorization" error', async () => {
    const appMock = appMockFactory(validRes);

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await tokenExpiredPlugin({ app: appMock });

    expect(appMock.router.go).toHaveBeenCalledTimes(0);
  });

  it('should set message cookie', async () => {
    const appMock = appMockFactory(errRes);

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await tokenExpiredPlugin({ app: appMock });

    const messageMock = {
      icon: null,
      message: 'You are not authorized, please log in.',
      persist: true,
      title: null,
      type: 'warning',
    };

    expect(appMock.$cookies.set).toHaveBeenCalledWith('vsf-message', messageMock);
  });

  it('should clear customer token and clear cart id', async () => {
    const appMock = appMockFactory(errRes);

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await tokenExpiredPlugin({ app: appMock });

    expect(appMock.$cookies.remove).toHaveBeenCalledTimes(2);
    expect(appMock.$cookies.remove).toHaveBeenCalledWith(cookieNames.customerCookieName);
  });
});
