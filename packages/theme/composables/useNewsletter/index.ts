import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import SubscriptionStatusesEnum from './enums/SubscriptionStatusesEnum';
import { updateSubscriptionCommand } from './commands/updateSubscriptionCommand';
import type {
  UseNewsletterErrors,
  UseNewsletterInterface,
  UseNewsletterUpdateSubscriptionParams,
} from './useNewsletter';

function useNewsletter(): UseNewsletterInterface {
  const { app } = useContext();
  const loading = ref(false);
  const error = ref<UseNewsletterErrors>({
    updateSubscription: null,
  });

  const updateSubscription = async (params: UseNewsletterUpdateSubscriptionParams) => {
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
    updateSubscription,
    error: readonly(error),
    loading: readonly(loading),
  };
}

export default useNewsletter;
