import { useCategoryFactory, Context, UseCategoryFactoryParams } from '@vue-storefront/core';
import { Category, CategoryFilterInput } from '@vue-storefront/magento-api';

const factoryParams: UseCategoryFactoryParams<Category, CategoryFilterInput> = {
  categorySearch: async (context: Context, params) => {
    const { data } = await context.$magento.api.categoryList(params);

    return data.categoryList;
  },
};

export default useCategoryFactory<Category, CategoryFilterInput>(factoryParams);
