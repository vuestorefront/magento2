import {
  useCategoryFactory,
  Context,
  UseCategoryFactoryParams, Logger,
} from '@absolute-web/vsf-core';
import {
  Category, CategoryListQueryVariables,
} from '@absolute-web/magento-api';

const factoryParams: UseCategoryFactoryParams<Category, CategoryListQueryVariables> = {
  categorySearch: async (context: Context, params) => {
    Logger.debug('[Magento]: List available categories', { params });

    const { data } = await context.$magento.api.categoryList(params);

    Logger.debug('[Result]:', { data });

    return data.categories.items;
  },
};

export default useCategoryFactory<Category, CategoryListQueryVariables>(factoryParams);
