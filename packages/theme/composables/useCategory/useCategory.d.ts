// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Category,
} from '@vue-storefront/magento-api';

import { Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '@vue-storefront/core';

export interface UseCategoryErrors {
  search: Error;
}

export type CategoryListQueryVariables = { pageSize: number };

export interface UseCategory{
  categories: any,
  search(searchParams: ComposableFunctionArgs<CategoryListQueryVariables>): Promise<void>;
  loading: Ref<boolean>;
  error: Ref<UseCategoryErrors>;
}
