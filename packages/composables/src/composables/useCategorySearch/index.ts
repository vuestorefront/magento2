import {
  Context, Logger,
} from '@vue-storefront/core';
import { Category } from '@vue-storefront/magento-api';
import { UseCategorySearchFactory, useCategorySearchFactory } from '../../factories/useCategorySearchFactory';
import { UseCategorySearch } from '../../types/composables';

const factoryParams: UseCategorySearchFactory<Category> = {
  search: async (context: Context, params): Promise<Category[]> => {
    Logger.debug('[Magento]: Search for category using', { params });

    const { data } = await context.$magento.api.categorySearch({ filters: { name: { match: `${params.term}` } } });

    Logger.debug('[Result]:', { data });

    return data.categoryList;
  },
};

const useCategorySearch: (cacheId?: string) => UseCategorySearch<Category> = useCategorySearchFactory<Category>(factoryParams);

export default useCategorySearch;
