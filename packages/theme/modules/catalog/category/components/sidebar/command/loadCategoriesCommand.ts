import categoryListQuery from './categoryList.gql';
import { CategoryInterface } from '~/modules/catalog/category/types';
import useApi from '~/composables/useApi';

export const loadCategoriesCommand = {
  execute: async (customQuery: string = categoryListQuery): Promise<CategoryInterface[]> => {
    let categories = [];

    const { query } = useApi();

    try {
      const categoryList = await query(customQuery);
      categories = categoryList?.categories?.items ?? [];
    } catch {
      return null;
    }

    return categories;
  },
};

export default loadCategoriesCommand;
