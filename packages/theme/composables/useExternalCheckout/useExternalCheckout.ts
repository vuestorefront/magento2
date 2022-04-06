import { Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';

export type UseExternalCheckout = {
  initializeCheckout: (params: ComposableFunctionArgs<{ baseUrl: string }>) => string
  loading: Ref<boolean>,
  error: Ref<string>,
};
