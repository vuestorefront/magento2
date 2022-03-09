import { Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '@vue-storefront/core';

export type UseExternalCheckout = {
  initializeCheckout: (params: ComposableFunctionArgs<{ baseUrl: string }>) => string
  loading: Ref<boolean>,
  error: Ref<string>,
};
