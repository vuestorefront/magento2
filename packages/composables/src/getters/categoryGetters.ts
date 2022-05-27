/**
 * @deprecated since version 1.0.0
 */
import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import { CategoryTree } from '@vue-storefront/magento-api';
import { buildCategoryTree } from '../helpers/buildCategoryTree';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTree = (category: CategoryTree): AgnosticCategoryTree | null => {
  if (!category) {
    return null;
  }
  return buildCategoryTree(category, '');
};

export const getCategoryTree = (
  category: CategoryTree,
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
      link: `/c/${breadcrumb.category_url_path}${category.url_suffix || ''}`,
    } as AgnosticBreadcrumb));
  }

  breadcrumbs.push({
    text: category.name,
    link: `/c/${category.url_path}${category.url_suffix || ''}`,
  } as AgnosticBreadcrumb);

  return breadcrumbs;
};

const categoryGetters: CategoryGetters<CategoryTree> = {
  getTree,
  getBreadcrumbs: getCategoryBreadcrumbs,
  getCategoryTree,
};

export default categoryGetters;
