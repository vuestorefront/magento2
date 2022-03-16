import { ComposableFunctionArgs, ProductsSearchParams } from '@vue-storefront/core';
import { Ref } from '@nuxtjs/composition-api';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  UpsellProductsQuery,
} from '@vue-storefront/magento-api';

export interface UseUpsellProductsError {
  search: Error | null;
}

export type UpsellProducts = UpsellProductsQuery['products']['items'][0]['upsell_products'];

export interface UseUpsellProductsInterface {
  search: (params?: ComposableFunctionArgs<ProductsSearchParams>) => Promise<Array<UpsellProducts>>;
  loading: Ref<boolean>;
  error: Ref<UseUpsellProductsError>;
}
