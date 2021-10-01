import {
  useCategoryFactory,
  Context,
  UseCategoryFactoryParams, Logger,
} from '@vue-storefront/core';
import {
  Category,
} from '@vue-storefront/magento-api';

const factoryParams: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, params) => {
    Logger.debug('[Magento]: List available categories', { params });

    const { data } = await context.$magento.api.categoryList(params);

    Logger.debug('[Result]:', { data });

    return data.categories.items;
  },
};

export default useCategoryFactory<Category, any>(factoryParams);
