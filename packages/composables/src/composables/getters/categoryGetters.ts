import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import { Category } from '@vue-storefront/magento-api';

const buildTree = (rootCategory: Category, currentCategory: string): AgnosticCategoryTree => ({
  label: rootCategory.name,
  slug: `/${rootCategory.url_path}${rootCategory.url_suffix || ''}`,
  items: Array.isArray(rootCategory.children) && rootCategory.children.length ? rootCategory.children.map((c) => buildTree(c, currentCategory)) : [],
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
): AgnosticCategoryTree | null => (
  category
    ? buildTree(category, currentCategory)
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
