import cookieNames from '~/enums/cookieNameEnum';

export default ({ app, redirect }) => {
  let once = true;


  app.$vsf.$magento.client.interceptors.response.use(async (r) => {

    if (r.data.message === 'The current customer isn\'t authorized.' && once) {
      once = false;
      app.$cookies.remove(cookieNames.customerCookieName);
      app.$cookies.remove(cookieNames.cartCookieName);

      await app.$cookies.set(cookieNames.messageCookieName, {
        message: app.i18n.t('You are not logged in, or logged out because of inactivity'),
        type: 'warning',
        icon: null,
        persist: true,
        title: null,
      });

      redirect(app.localePath('/'));
    }

    return r;
  });
};
