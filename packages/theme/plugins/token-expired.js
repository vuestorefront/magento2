import cookieNames from '~/enums/cookieNameEnum';

export default ({ app, redirect }) => {
  let once = true;

  app.$vsf.$magento.client.interceptors.response.use(async (r) => {
    if (r.data.message === 'The current customer isn\'t authorized.' && once) {
      once = false;

      app.$cookies.remove(cookieNames.customerCookieName);
      app.$cookies.remove(cookieNames.cartCookieName);

      await app.$cookies.set(cookieNames.messageCookieName, {
        message: 'Your session has been expired, please log in again',
        type: 'warning',
        icon: null,
        persist: true,
        title: null,
      });

      app.$cookies.remove('lol');
      redirect('/');
    }

    return r;
  });
};
