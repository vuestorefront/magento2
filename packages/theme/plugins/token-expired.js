import { useUiNotification } from '~/composables';

export default ({ app, redirect }) => {
  let once = true;
  app.$vsf.$magento.client.interceptors.response.use(async (r) => {
    if (r.data.message === 'The current customer isn\'t authorized.' && once) {
      once = false;
      const { send: sendNotification } = useUiNotification();

      const apiState = app.$vsf.$magento.config.state;
      await apiState.setCustomerToken(null);
      await apiState.setCartId(null);
      // ToDo :: Clear Cart items
      // ToDo :: Can't use composables in plugins

      sendNotification({
        id: Symbol('session_expired'),
        message: 'Your session has been expired, please log in again',
        type: 'warning',
        icon: null,
        persist: true,
        title: null,
      });

      return redirect('/');
    }

    return r;
  });
};
