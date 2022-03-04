import findDeep from 'deepdash/findDeep';
import { getCategoryTree } from '~/modules/catalog/category/getters/categoryGetters';
import { CategoryTreeInterface } from '~/modules/catalog/category/types';
import loadCategoriesCommand from '~/modules/catalog/category/components/sidebar/command/loadCategoriesCommand';

export const useSidebar = () => {
  const loadCategoryTree = async (customQuery?: string): Promise<CategoryTreeInterface> => {
    const categoryTree = await loadCategoriesCommand.execute(customQuery);

    return getCategoryTree(categoryTree?.[0]);
  };

  const findActiveCategory = (categoryTree: CategoryTreeInterface, path: string = '') => {
    const categories = categoryTree?.items ?? false;
    if (!categories) {
      return '';
    }

    let categoryLabel = '';
    const parent = findDeep(categories, (value: string, key, parentValue, _deepCtx) => {
      if (key === 'slug' && path.includes(value)) {
        // eslint-disable-next-line no-underscore-dangle
        categoryLabel = _deepCtx.obj[_deepCtx._item.path[0]].label;
      }

      return key === 'slug' && path.includes(value);
    });

    return categoryLabel || parent?.category?.label || categories[0]?.label;
  };

  return {
    loadCategoryTree,
    findActiveCategory,
  };
};

export default useSidebar;
