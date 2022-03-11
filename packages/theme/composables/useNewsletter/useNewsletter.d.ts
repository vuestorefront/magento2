import { ComposableFunctionArgs, ComputedProperty } from '@vue-storefront/core';

export interface UseNewsletter {
  error: ComputedProperty<UseNewsletterErrors>;
  loading: ComputedProperty<boolean>;
  updateSubscription: (params: ComposableFunctionArgs<{ email: string }>) => Promise<string>;
}

export interface UseNewsletterErrors {
  updateSubscription: Error;
}
