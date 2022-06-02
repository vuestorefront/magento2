import type { AxiosInstance } from 'axios';
import type { Config, MagentoApiMethods } from '@vue-storefront/magento-api';
import type { ApiClientMethods, IntegrationContext } from '~/types/core';

export interface VsfContext {
  $magento: IntegrationContext<AxiosInstance, Config, ApiClientMethods<MagentoApiMethods>>;
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $vsf: VsfContext
  }
  interface Context {
    $vsf: VsfContext
  }
}
