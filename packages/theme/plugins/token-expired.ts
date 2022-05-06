import type { Plugin } from '@nuxt/types';
import type { ApolloQueryResult } from '@apollo/client/core/types';
import type { UiNotification } from '~/composables/useUiNotification';
import { useCustomerStore } from '~/stores/customer';
import loginStatusPingQueryGql from '~/modules/customer/composables/useUser/loginStatusPingQuery.gql';

export const hasGraphqlAuthorizationError = (res: ApolloQueryResult<unknown>) => res?.errors
  ?.some((error) => error.extensions.category === 'graphql-authorization') ?? false;

const plugin : Plugin = async ({ $pinia, app }) => {
  const customerStore = useCustomerStore($pinia);

  const responseOfLoginStatusPing = await app.$vsf.$magento.api.customQuery({ query: loginStatusPingQueryGql });
  if (!hasGraphqlAuthorizationError(responseOfLoginStatusPing)) {
    customerStore.setIsLoggedIn(true);
  }

  app.$vsf.$magento.client.interceptors.response.use((res) => {
    if (!hasGraphqlAuthorizationError(res.data as ApolloQueryResult<unknown>)) {
      return res;
    }
    customerStore.setIsLoggedIn(false);
    // @ts-ignore
    app.$vsf.$magento.config.state.removeCustomerToken();
    // @ts-ignore
    app.$vsf.$magento.config.state.removeCartId();
    // @ts-ignore
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
