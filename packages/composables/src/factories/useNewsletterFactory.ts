import { Ref, computed } from 'vue-demi';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseNewsletter, UseNewsletterErrors } from '../types/composeables';

export interface UseNewsletterFactoryParams<NEWSLETTER, UPDATE_NEWSLETTER_PARAMS> extends FactoryParams {
  updateSubscription: (context: Context, params: { email: UPDATE_NEWSLETTER_PARAMS }) => Promise<NEWSLETTER>;
}

export const useNewsletterFactory = <NEWSLETTER, UPDATE_NEWSLETTER_PARAMS>(
  factoryParams: UseNewsletterFactoryParams<NEWSLETTER, UPDATE_NEWSLETTER_PARAMS>,
) => function useNewsletter(): UseNewsletter<UPDATE_NEWSLETTER_PARAMS> {
  const errorsFactory = (): UseNewsletterErrors => ({
    updateSubscription: null,
  });

  const loading: Ref<boolean> = sharedRef(false, 'useNewsletter-loading');
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const _factoryParams = configureFactoryParams(factoryParams);
  const error: Ref<UseNewsletterErrors> = sharedRef(errorsFactory(), 'useNewsletter-error');

  const resetErrorValue = () => {
    error.value = errorsFactory();
  };

  const updateSubscription = async (params) => {
    Logger.debug('useNewsletterFactory.updateSubscription', params);
    resetErrorValue();

    try {
      loading.value = true;
      await _factoryParams.updateSubscription(params);
      error.value.updateSubscription = null;
    } catch (err) {
      error.value.updateSubscription = err;
      Logger.error('useNewsletter/updateSubscription', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    error: computed(() => error.value),
    loading: computed(() => loading.value),
    updateSubscription,
  };
};
