import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { SubscriptionStatusesEnum } from '~/modules/GraphQL/types';

/**
 * Errors that occured in the {@link useNewsletter|useNewsletter()} composable
 */
export interface UseNewsletterErrors {
  /**
   * Contains error if `updateSubscription` method failed, otherwise is `null`
   */
  updateSubscription: Error | null;
}

/**
 * The params object accepted by the `updateSubscription` method in the {@link useNewsletter|useNewsletter()} composable
 */
export type UseNewsletterUpdateSubscriptionParams = ComposableFunctionArgs<{
  email: string;
}>;

/**
 * Data and methods returned from the {@link useNewsletter|useNewsletter()} composable
 */
export interface UseNewsletterInterface {
  /**
   * Updates subscription status of an email in the newsletter
   */
  updateSubscription(params: UseNewsletterUpdateSubscriptionParams): Promise<SubscriptionStatusesEnum>;

  /**
   * Contains errors from the composable methods
   */
  error: DeepReadonly<Ref<UseNewsletterErrors>>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;
}
