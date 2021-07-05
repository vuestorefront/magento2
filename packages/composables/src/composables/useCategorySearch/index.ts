import {
  Context,
} from '@vue-storefront/core';
import { Category } from '@vue-storefront/magento-api';
import { UseCategorySearchFactory, useCategorySearchFactory } from '../../factories/useCategorySearchFactory';
import { UseCategorySearch } from '../../types/composables';

const factoryParams: UseCategorySearchFactory<Category> = {
  search: async (context: Context, params): Promise<Category[]> => {
    const { data } = await context.$magento.api.categorySearch({ filters: { name: { match: `${params.term}` } } });

    return data.categoryList;
  },
};

const useCategorySearch: (cacheId?: string) => UseCategorySearch<Category> = useCategorySearchFactory<Category>(factoryParams);

export default useCategorySearch;
