import { ComposableFunctionArgs, ProductsSearchParams } from '@vue-storefront/core';
import { Ref } from '@nuxtjs/composition-api';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  UpsellProductsQuery,
} from '~/modules/GraphQL/types';
import { Maybe } from '~/composables/types';

export interface UseUpsellProductsError {
  search: Error | null;
}

export type UpsellProducts = UpsellProductsQuery['products']['items'][0]['upsell_products'];

export interface UseUpsellProductsInterface {
  search: (params?: ComposableFunctionArgs<ProductsSearchParams>) => Promise<Maybe<Array<UpsellProducts>>>;
  loading: Ref<boolean>;
  error: Ref<UseUpsellProductsError>;
}
