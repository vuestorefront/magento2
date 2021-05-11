/* eslint-disable @typescript-eslint/return-await */
import {
  Context,
  useCategoryFactory,
  UseCategoryFactoryParams,
} from '@vue-storefront/core';
import { CategoryFilter, CategoryMenu } from '@vue-storefront/magento-api';

const factoryParams: UseCategoryFactoryParams<CategoryMenu, any> = {
  categorySearch: async (context: Context, parameters) => {
    const { customQuery, ...searchParams } = parameters;

    const { categories: { items } } = await context.$magento.api.getMenuCategory(searchParams, customQuery);

    return items.filter((i) => i.include_in_menu);
  },
};

export default useCategoryFactory<CategoryMenu, CategoryFilter>(factoryParams);
