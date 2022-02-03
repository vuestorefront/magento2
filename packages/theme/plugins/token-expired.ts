import cookieNames from '~/enums/cookieNameEnum';

const hasAuthorizationError = (res): boolean => {
  if (!res?.data?.errors) {
    return false;
  }

  const { errors } = res.data;

  let isAuthErr = false;

  // eslint-disable-next-line no-restricted-syntax
  for (const error of errors) {
    if (error?.extensions?.category === 'graphql-authorization') {
      isAuthErr = true;
      break;
    }
  }

  return isAuthErr;
};

export default ({ app }) => {
  app.$vsf.$magento.client.interceptors.response.use(async (res): Promise<any> => {
    if (!hasAuthorizationError(res)) {
      return res;
    }

    app.$cookies.remove(cookieNames.customerCookieName);
    app.$cookies.remove(cookieNames.cartCookieName);

    await app.$cookies.set(cookieNames.messageCookieName, {
      message: app.i18n.t('You are not authorized, please log in.'),
      type: 'warning',
      icon: null,
      persist: true,
      title: null,
    });

    app.router.go(app.localePath('/'));

    return false;
  });
};
