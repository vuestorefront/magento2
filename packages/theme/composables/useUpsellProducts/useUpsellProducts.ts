import { Ref } from '@nuxtjs/composition-api';
import { Maybe, UpsellProductsQuery } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs, ProductsSearchParams } from '~/composables/types';

export interface UseUpsellProductsError {
  search: Error | null;
}

export type UpsellProducts = UpsellProductsQuery['products']['items'][0]['upsell_products'];

export interface UseUpsellProductsInterface {
  search: (params?: ComposableFunctionArgs<ProductsSearchParams>) => Promise<Maybe<Array<UpsellProducts>>>;
  loading: Ref<boolean>;
  error: Ref<UseUpsellProductsError>;
}
