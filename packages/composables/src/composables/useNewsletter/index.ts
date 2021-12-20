/* istanbul ignore file */
import {
  Context, Logger,
} from '@vue-storefront/core';
import useUser from '../useUser';
import { useNewsletterFactory, UseNewsletterFactoryParams } from '../../factories/useNewsletterFactory';

const factoryParams: UseNewsletterFactoryParams<any, string> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  updateSubscription: async (context: Context, params) => {
    Logger.debug('[Magento]: Update user newsletter subscription', { params });

    const { data } = await context.$magento.api.subscribeEmailToNewsletter(
      {
        email: params.email,
      },
      params?.customQuery || {},
    );

    Logger.debug('[Result]:', { data });

    return data.subscribeEmailToNewsletter.status;
  },
};

export default useNewsletterFactory<any, string>(factoryParams);
