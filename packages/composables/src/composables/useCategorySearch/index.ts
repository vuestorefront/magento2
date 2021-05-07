import {
  Context,
} from '@vue-storefront/core';
import { Category } from '@vue-storefront/magento-api';
import { UseCategorySearchFactory, useCategorySearchFactory } from '../../factories/useCategorySearchFactory';

const factoryParams: UseCategorySearchFactory<Category> = {
  search: async (context: Context, params): Promise<Category[]> => {
    // @ts-ignore
    const { data } = await context.$magento.api.categorySearch({ filters: { name: { match: `${params.term}` } } });

    return data.categoryList;
  },
};

export default useCategorySearchFactory<Category>(factoryParams);
