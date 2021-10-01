/* istanbul ignore file */
import {
  Context, Logger,
} from '@vue-storefront/core';
import useUser from '../useUser';
import { useNewsletterFactory, UseNewsletterFactoryParams } from '../../factories/useNewsletterFactory';

const factoryParams: UseNewsletterFactoryParams<any, any> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  updateSubscription: async (context: Context, { email }) => {
    Logger.debug('[Magento]: Update user newsletter subscription', { email });

    const { data } = await context.$magento.api.subscribeEmailToNewsletter({
      email,
    });

    Logger.debug('[Result]:', { data });

    return data.subscribeEmailToNewsletter.status;
  },
};

export default useNewsletterFactory<any, any>(factoryParams);
