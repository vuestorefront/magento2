import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';

export type UseNewsletterUpdateSubscriptionParams = ComposableFunctionArgs<{
  email: string;
}>;

export interface UseNewsletterInterface {
  error: DeepReadonly<Ref<UseNewsletterErrors>>;
  loading: Readonly<Ref<boolean>>;
  updateSubscription(params: UseNewsletterUpdateSubscriptionParams): Promise<string>;
}

export interface UseNewsletterErrors {
  updateSubscription: Error;
}
