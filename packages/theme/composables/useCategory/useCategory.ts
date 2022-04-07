import { Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';

export interface UseCategoryErrors {
  search: Error;
}

export interface UseCategoryParamsInput {
  pageSize: number;
}

export interface UseCategoryInterface {
  categories: any;
  search: (searchParams: ComposableFunctionArgs<UseCategoryParamsInput>) => Promise<void>;
  loading: Ref<boolean>;
  error: Ref<UseCategoryErrors>;
}
