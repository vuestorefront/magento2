import { Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';

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
