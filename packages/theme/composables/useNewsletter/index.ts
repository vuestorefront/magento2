import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { SubscriptionStatusesEnum } from '~/modules/GraphQL/types';
import { updateSubscriptionCommand } from './commands/updateSubscriptionCommand';
import type {
  UseNewsletterErrors,
  UseNewsletterInterface,
  UseNewsletterUpdateSubscriptionParams,
} from './useNewsletter';

/**
 * The `useNewsletter()` composable allows updating the subscription status of
 * an email in the newsletter.
 */
export function useNewsletter(): UseNewsletterInterface {
  const context = useContext();
  const loading = ref(false);
  const error = ref<UseNewsletterErrors>({
    updateSubscription: null,
  });

  const updateSubscription = async (params: UseNewsletterUpdateSubscriptionParams) => {
    Logger.debug('[Magento]: Update user newsletter subscription', { params });
    let result = SubscriptionStatusesEnum.Unsubscribed;

    try {
      loading.value = true;
      error.value.updateSubscription = null;

      result = await updateSubscriptionCommand.execute(context, params);
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

export * from './useNewsletter';
export default useNewsletter;
