/* eslint-disable @typescript-eslint/return-await */
import {
  Context,
  useCategoryFactory,
  UseCategoryFactoryParams,
} from '@vue-storefront/core';
import { MenuCategory, CategoryFilter } from '@vue-storefront/magento-api';

const factoryParams: UseCategoryFactoryParams<MenuCategory, any> = {
  categorySearch: async (context: Context, parameters) => {
    const { customQuery, ...searchParams } = parameters;
    const {
      $magento: {
        api,
      },
    } = context;
    const { categories: { items } } = await api.getMenuCategories(searchParams, customQuery);

    return items.filter((i) => i.include_in_menu);
  },
};

export default useCategoryFactory<MenuCategory, CategoryFilter>(factoryParams);
