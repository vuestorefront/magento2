/* istanbul ignore file */
import {
  Context,
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
    const { data } = await context.$magento.api.subscribeEmailToNewsletter({
      email,
    });

    return data.subscribeEmailToNewsletter.status;
  },
};

export default useNewsletterFactory<any, any>(factoryParams);
