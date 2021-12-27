import {
  Context, Logger,
} from '@vue-storefront/core';
import { Category, CategorySearchQueryVariables } from '@vue-storefront/magento-api';
import { UseCategorySearchFactory, useCategorySearchFactory } from '../../factories/useCategorySearchFactory';
import { UseCategorySearch } from '../../types/composables';

const factoryParams: UseCategorySearchFactory<Category, CategorySearchQueryVariables> = {
  search: async (context: Context, params): Promise<Category[]> => {
    Logger.debug('[Magento]: Search for category using', { params });
    const { filters } = params;
    const { data } = await context.$magento.api.categorySearch({ filters });

    Logger.debug('[Result]:', { data });

    return data.categoryList;
  },
};

const useCategorySearch: (cacheId?: string) => UseCategorySearch<Category, CategorySearchQueryVariables> = useCategorySearchFactory<Category, CategorySearchQueryVariables>(factoryParams);

export default useCategorySearch;
