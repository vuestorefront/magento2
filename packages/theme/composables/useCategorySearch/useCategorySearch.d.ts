// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Category, CategorySearchQueryVariables,
} from '@vue-storefront/magento-api';

import { Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '@vue-storefront/core';

export interface UseCategoryErrors {
  search: Error;
}

export interface UseCategorySearch{
  result:  Ref<Array<Category>>,
  search(searchParams: ComposableFunctionArgs<CategorySearchQueryVariables>): Promise<void>;
  loading: Ref<boolean>;
  error: Ref<UseCategoryErrors>;
}
