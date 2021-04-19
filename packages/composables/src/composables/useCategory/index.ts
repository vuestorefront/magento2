import { useCategoryFactory, Context } from '@vue-storefront/core';
import { UseCategory, Category, CategorySearchParams } from '../../types';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  categorySearch: async (context: Context, params) => {
    const categoryResponse = await context.$ma.api.categoryList(params);
    return categoryResponse.data.categoryList;
  },
};

const useCategory: (id: string) => UseCategory<Category, CategorySearchParams> = useCategoryFactory<Category, any>(factoryParams);

export default useCategory;
