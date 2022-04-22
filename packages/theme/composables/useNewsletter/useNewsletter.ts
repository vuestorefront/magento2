import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { SubscriptionStatusesEnum } from '~/modules/GraphQL/types';

/**
 * The {@link useNewsletter} error object. The properties values' are the errors
 * thrown by its methods.
 */
export interface UseNewsletterErrors {
  /** Error when updating subscription fails, otherwise is `null`. */
  updateSubscription: Error | null;
}

/**
 * The params received by {@link useNewsletter}'s `updateSubscription` method.
 */
export type UseNewsletterUpdateSubscriptionParams = ComposableFunctionArgs<{
  email: string;
}>;

/** The interface provided by {@link useNewsletter} composable. */
export interface UseNewsletterInterface {
  /** Updates subscription status of an email in the newsletter. */
  updateSubscription(params: UseNewsletterUpdateSubscriptionParams): Promise<SubscriptionStatusesEnum>;

  /**
   * Contains errors from any of the composable methods.
   *
   * Read {@link UseNewsletterErrors} documentation for more details.
   */
  error: DeepReadonly<Ref<UseNewsletterErrors>>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;
}
