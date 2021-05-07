import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import { Category } from '@vue-storefront/magento-api';
import { htmlDecode } from '../../helpers/htmlDecoder';

const buildTree = (rootCategory: Category, currentCategory: string, withProducts = false): AgnosticCategoryTree => ({
  label: htmlDecode(rootCategory.name),
  slug: `/${rootCategory.url_path}${rootCategory.url_suffix || ''}`,
  items: Array.isArray(rootCategory.children) && rootCategory.children.length ? rootCategory
    .children
    .filter((c) => (withProducts ? c.product_count > 0 : true))
    .map((c) => buildTree(c, currentCategory)) : [],
  count: rootCategory.product_count,
  isCurrent: rootCategory.uid === currentCategory,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTree = (category: Category): AgnosticCategoryTree | null => {
  if (!category) {
    return null;
  }
  return buildTree(category, '');
};

export const getCategoryTree = (
  category: Category,
  currentCategory: string = '',
  withProducts = false,
): AgnosticCategoryTree | null => (
  category
    ? buildTree(category, currentCategory, withProducts)
    : null
);

export const getCategoryBreadcrumbs = (category: Category): AgnosticBreadcrumb[] => {
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
