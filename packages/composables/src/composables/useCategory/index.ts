import {
  useCategoryFactory,
  Context,
  UseCategoryFactoryParams,
} from '@vue-storefront/core';
import {
  Category,
  CategoryListQueryVariables,
} from '@vue-storefront/magento-api';

const factoryParams: UseCategoryFactoryParams<Category, CategoryListQueryVariables> = {
  categorySearch: async (context: Context, params) => {
    const { data } = await context.$magento.api.categoryList(params);

    return data.categories.items;
  },
};

export default useCategoryFactory<Category, CategoryListQueryVariables>(factoryParams);
