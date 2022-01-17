import tokenExpiredPlugin from '../token-expired';
import cookieNames from '~/enums/cookieNameEnum';

const callbackResponse = {
  data: {
    message: 'The current customer isn\'t authorized.',
  },
};


const appMock = {
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
  localePath: (t) => t,
  i18n: {
    t: (t) => t,
  },
};

const redirectMock = jest.fn();

describe('Token Expired plugin', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should work only when the current customer is not authorized', async () => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await tokenExpiredPlugin({ app: appMock, redirect: redirectMock });

    expect(redirectMock).toHaveBeenCalledWith('/');
  });

  it('should set message cookie', async () => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await tokenExpiredPlugin({ app: appMock, redirect: redirectMock });

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
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await tokenExpiredPlugin({ app: appMock, redirect: redirectMock });

    expect(appMock.$cookies.remove).toHaveBeenCalledTimes(2);
    expect(appMock.$cookies.remove).toHaveBeenCalledWith(cookieNames.customerCookieName);
  });
});
