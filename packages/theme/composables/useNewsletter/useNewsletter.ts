import { ComposableFunctionArgs, ComputedProperty } from '~/composables/types';

export interface UseNewsletterInterface {
  error: ComputedProperty<UseNewsletterErrors>;
  loading: ComputedProperty<boolean>;
  updateSubscription: (params: ComposableFunctionArgs<{ email: string }>) => Promise<string>;
}

export interface UseNewsletterErrors {
  updateSubscription: Error;
}
