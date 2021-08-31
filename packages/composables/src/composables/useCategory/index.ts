import {
  useCategoryFactory,
  Context,
  UseCategoryFactoryParams, Logger,
} from '@absolute-web/vsf-core';
import { useCache } from '@absolute-web/vsf-cache';
import {
  CategoryTree as Category, CategorySearchQueryVariables,
} from '@absolute-web/magento-api';

const factoryParams: UseCategoryFactoryParams<Category, CategorySearchQueryVariables> = {
  provide() {
    return {
      cache: useCache(),
    };
  },
  categorySearch: async (context: Context, params) => {
    Logger.debug('[Magento]: List available categories', { params });

    const { data } = await context.$magento.getApi.category(params);

    if (data?.cacheTags) {
      context.cache.addTagsFromString(data.cacheTags);
    }

    Logger.debug('[Result]:', { data });

    return data.categoryList;
  },
};

export default useCategoryFactory<Category, CategorySearchQueryVariables>(factoryParams);
