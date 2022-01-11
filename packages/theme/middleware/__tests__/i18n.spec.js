import i18nMiddleware, { readStoreCookie, findLocaleBasedOnStoreCode, setDefaultLocale, prepareNewCookieString } from '~/middleware/i18n';

const localesMock = [
  {
    code: 'default',
    file: 'en.js',
    iso: 'en_US',
  },
  {
    code: 'de_DE',
    file: 'de.js',
    iso: 'de_DE',
  },
  {
    code: 'nl_NL',
    file: 'en.js',
    iso: 'en_US',
  },
];

const appMock = {
  $cookies: {
    get: jest.fn(),
  },
  i18n: {
    defaultLocale: 'en',
    setLocale: jest.fn(),
    locales: localesMock,
  },
};

const apiStateMock = {
  getCurrency: () => 'USD',
  getCountry: () => 'PL',
  getCartId: () => '123',
  getCustomerToken: () => '12fg45',
};

describe('i18n middleware', () => {
  it('Should read vsf-store cookie value', () => {
    readStoreCookie(appMock);

    expect(appMock.$cookies.get).toHaveBeenCalledWith('vsf-store');
  });

  it('Should find locale based on magento store code', () => {
    const storeCode = 'nl_NL';
    const localeObject = findLocaleBasedOnStoreCode(storeCode, localesMock);

    expect(localeObject.code).toEqual('nl_NL');
  });

  it('Should not find when there is no locale that match given magento store code', () => {
    const storeCode = 'pl_PL';
    const localeObject = findLocaleBasedOnStoreCode(storeCode, localesMock);

    expect(localeObject).toBeFalsy();
  });

  it('Should set default locale', async () => {
    await setDefaultLocale(appMock.i18n);

    expect(appMock.i18n.setLocale).toHaveBeenCalledWith('en');
  });

  it('Should prepare new cookie string', () => {
    const cookie = prepareNewCookieString(apiStateMock, 'brandZ');

    expect(cookie).toMatchInlineSnapshot(
      `"vsf-store=brandZ; vsf-locale=brandZ; vsf-currency=USD; vsf-country=PL; vsf-customer=12fg45; vsf-cart=123 "`
    );
  });

  it('Should set default locale if store cookie is not exist', () => {
    appMock.$cookies.get.mockReturnValueOnce(null);

    i18nMiddleware({ app: appMock });

    expect(appMock.i18n.setLocale).toHaveBeenCalledWith('en');
  });

  it('Should set default locale if passed store code does not match aby locale from nuxt config', () => {
    appMock.$cookies.get.mockReturnValueOnce('test');

    i18nMiddleware({ app: appMock });

    expect(appMock.i18n.setLocale).toHaveBeenCalledWith('en');
  });

  it('Should change locale if a new selected store has a different locale', () => {
    const testCaseAppMock = {
      ...appMock,
      i18n: {
        ...appMock.i18n,
        locale: 'de_DE',
      },
      $vsf: {
        $magento: {
          config: {
            state: {
              ...apiStateMock,
              setStore: jest.fn(),
              setLocale: jest.fn(),
            },
            axios: {
              headers: {
                cookie: null,
              },
            },
          },
        },
      },
    };

    testCaseAppMock.$cookies.get.mockReturnValueOnce('de_DE').mockReturnValueOnce('default');

    i18nMiddleware({ app: testCaseAppMock });

    expect(testCaseAppMock.$vsf.$magento.config.state.setLocale).toHaveBeenCalledWith('de_DE');
    expect(testCaseAppMock.$vsf.$magento.config.state.setStore).toHaveBeenCalledWith('de_DE');
    expect(testCaseAppMock.$vsf.$magento.config.axios.headers.cookie).toMatchInlineSnapshot(
      '"vsf-store=de_DE vsf-locale=de_DE vsf-currency=USD vsf-country=PL vsf-cart=123 vsf-customer=12fg45 "',
      `"vsf-store=de_DE; vsf-locale=de_DE; vsf-currency=USD; vsf-country=PL; vsf-customer=12fg45; vsf-cart=123 "`
    );
  });
});
