import { ProductAttributeFilterInput, ProductAttributeSortInput } from '~/modules/GraphQL/types';

export declare type GetProductSearchParams = {
  pageSize?: number;
  currentPage?: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
  configurations?: string[];
};
