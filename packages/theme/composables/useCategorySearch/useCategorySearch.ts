import { Ref } from '@nuxtjs/composition-api';
import { CategorySearchQueryVariables } from '~/modules/GraphQL/types';
import { Category, ComposableFunctionArgs } from '~/composables/types';

export interface UseCategoryErrors {
  search: Error;
}

export interface UseCategorySearch{
  result: Ref<Array<Category>>,
  search(searchParams: ComposableFunctionArgs<CategorySearchQueryVariables>): Promise<void>;
  loading: Ref<boolean>;
  error: Ref<UseCategoryErrors>;
}
