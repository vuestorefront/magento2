import { Context, UseCategory, useCategoryFactory, UseCategoryFactoryParams } from '@vue-storefront/core';
import { Category } from '../types';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, params) => {
    const { data: categoryList } = await context.$m2.api.getCategory(params);
    return categoryList;
  }
};

const useCategory: (id: string) => UseCategory<Category> = useCategoryFactory<Category, any>(params);

export default useCategory;
