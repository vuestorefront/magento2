import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@absolute-web/vsf-core';
import { Category } from '@absolute-web/magento-api';
import { buildCategoryTree } from '../helpers/buildCategoryTree';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTree = (category: Category): AgnosticCategoryTree | null => {
  if (!category) {
    return null;
  }
  return buildCategoryTree(category, '');
};

export const getCategoryTree = (
  category: Category,
  currentCategory: string = '',
  withProducts = false,
): AgnosticCategoryTree | null => (
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
      link: `/${breadcrumb.category_url_path}${category.url_suffix || ''}`,
    } as AgnosticBreadcrumb));
  }

  breadcrumbs.push({
    text: category.name,
    link: `/${category.url_path}${category.url_suffix || ''}`,
  } as AgnosticBreadcrumb);

  return breadcrumbs;
};

const categoryGetters: CategoryGetters<Category> = {
  getTree,
  getBreadcrumbs: getCategoryBreadcrumbs,
  getCategoryTree,
};

export default categoryGetters;
