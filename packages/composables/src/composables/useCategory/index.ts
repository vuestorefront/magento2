import { useCategoryFactory, Context } from '@vue-storefront/core';
import { UseCategory, Category, CategorySearchParams } from '../../types';

const useCategory: (id: string) => UseCategory<Category, CategorySearchParams> = useCategoryFactory<Category, any>({
  categorySearch: async (context: Context, params) => {
    const categoryResponse = await context.$ma.api.categoryList(params);
    return categoryResponse.data.categoryList;
  }
});

export default useCategory;
