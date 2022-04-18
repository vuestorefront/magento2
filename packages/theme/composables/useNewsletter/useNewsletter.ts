import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';

export interface UseNewsletterInterface {
  error: DeepReadonly<Ref<UseNewsletterErrors>>;
  loading: Readonly<Ref<boolean>>;
  updateSubscription: (params: ComposableFunctionArgs<{ email: string }>) => Promise<string>;
}

export interface UseNewsletterErrors {
  updateSubscription: Error;
}
