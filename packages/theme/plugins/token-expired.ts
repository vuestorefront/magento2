import type { Plugin } from '@nuxt/types';
import type { AxiosResponse } from 'axios';
import type { UiNotification } from '~/composables/useUiNotification';

const hasAuthorizationError = (res: AxiosResponse): boolean => {
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

const plugin : Plugin = ({ app }) => {
  app.$vsf.$magento.client.interceptors.response.use((res) => {
    if (!hasAuthorizationError(res)) {
      return res;
    }
    app.$vsf.$magento.config.state.removeCustomerToken();
    app.$vsf.$magento.config.state.removeCartId();
    app.$vsf.$magento.config.state.setMessage<UiNotification>({
      id: Symbol(''),
      message: app.i18n.t('You are not authorized, please log in.') as string,
      type: 'warning',
      icon: null,
      persist: true,
      title: null,
    });

    app.router.push(app.localePath('/'));

    return false;
  });
};

export default plugin;
