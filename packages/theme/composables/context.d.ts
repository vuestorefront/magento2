import type { AxiosInstance } from 'axios';
import type { ApiClientMethods, IntegrationContext } from '~/types/core';
import type { Config, MagentoApiMethods } from '@vue-storefront/magento-api';

export interface VsfContext {
    $magento: IntegrationContext<AxiosInstance, Config, ApiClientMethods<MagentoApiMethods>>;
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $vsf: VsfContext
  }
}
