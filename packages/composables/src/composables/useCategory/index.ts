import {
  useCategoryFactory,
  Context,
  UseCategoryFactoryParams, Logger,
} from '@vue-storefront/core';
import {
  Category, CategoryListQueryVariables,
} from '@vue-storefront/magento-api';

const factoryParams: UseCategoryFactoryParams<Category, CategoryListQueryVariables> = {
  categorySearch: async (context: Context, params) => {
    Logger.debug('[Magento]: List available categories', { params });

    const { data } = await context.$magento.api.categoryList(params, params.customQuery || {});

    Logger.debug('[Result]:', { data });

    return data.categories.items;
  },
};

export default useCategoryFactory<Category, CategoryListQueryVariables>(factoryParams);
