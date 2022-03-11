import { ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '@vue-storefront/core';
import { UseNewsletter, UseNewsletterErrors } from '~/composables/useNewsletter/useNewsletter';
import SubscriptionStatusesEnum from '~/composables/useNewsletter/enums/SubscriptionStatusesEnum';
import { updateSubscriptionCommand } from './commands/updateSubscriptionCommand';

const useNewsletter = (): UseNewsletter => {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref<UseNewsletterErrors>({
    updateSubscription: null,
  });

  const updateSubscription = async (params) => {
    Logger.debug('[Magento]: Update user newsletter subscription', { params });
    let result = SubscriptionStatusesEnum.UNSUBSCRIBED;

    try {
      loading.value = true;
      error.value.updateSubscription = null;

      result = await updateSubscriptionCommand.execute(app.context, params);
    } catch (err) {
      error.value.updateSubscription = err;
      Logger.error('useNewsletter/updateSubscription', err);
    } finally {
      loading.value = false;
    }

    return result;
  };

  return {
    error,
    loading,
    updateSubscription,
  };
};

export default useNewsletter;
