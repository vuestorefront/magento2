import { Ref, computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { PlatformApi } from '@vue-storefront/core/lib/src/types';
import { UseNewsletter, UseNewsletterErrors } from '../types/composables';

export interface UseNewsletterFactoryParams<NEWSLETTER, UPDATE_NEWSLETTER_PARAMS, API extends PlatformApi = any> extends FactoryParams<API> {
  updateSubscription: (context: Context, params: { email: UPDATE_NEWSLETTER_PARAMS }) => Promise<NEWSLETTER>;
}

export const useNewsletterFactory = <NEWSLETTER, UPDATE_NEWSLETTER_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseNewsletterFactoryParams<NEWSLETTER, UPDATE_NEWSLETTER_PARAMS, API>,
) => function useNewsletter(): UseNewsletter<UPDATE_NEWSLETTER_PARAMS, API> {
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
