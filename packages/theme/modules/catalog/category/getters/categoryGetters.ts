import {
  CategoryGetters, CategoryTreeInterface, AgnosticBreadcrumb, Category,
} from '~/modules/catalog/category/types';
import { buildCategoryTree } from '~/modules/catalog/category/helpers/buildCategoryTree';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTree = (category: Category): CategoryTreeInterface | null => {
  if (!category) {
    return null;
  }
  return buildCategoryTree(category, '');
};

export const getCategoryTree = (
  category: Category,
  currentCategory: string = '',
  withProducts = false,
): CategoryTreeInterface | null => (
  category
    ? buildCategoryTree(category, currentCategory, withProducts)
    : null
);

export const getCategoryBreadcrumbs = (category: any): AgnosticBreadcrumb[] => {
  let breadcrumbs = [];

  if (!category) {
    return [];
  }

  if (Array.isArray(category?.breadcrumbs)) {
    breadcrumbs = category.breadcrumbs.map((breadcrumb) => ({
      text: breadcrumb.category_name,
      link: `/c/${breadcrumb.category_url_path}${category.url_suffix || ''}`,
    } as AgnosticBreadcrumb));
  }

  breadcrumbs.push({
    text: category.name,
    link: `/c/${category.url_path}${category.url_suffix || ''}`,
  } as AgnosticBreadcrumb);

  return breadcrumbs;
};

const categoryGetters: CategoryGetters<Category> = {
  getTree,
  getBreadcrumbs: getCategoryBreadcrumbs,
  getCategoryTree,
};

export default categoryGetters;
