import { Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';

export interface UseNewsletterInterface {
  error: Ref<UseNewsletterErrors>;
  loading: Ref<boolean>;
  updateSubscription: (params: ComposableFunctionArgs<{ email: string }>) => Promise<string>;
}

export interface UseNewsletterErrors {
  updateSubscription: Error;
}
