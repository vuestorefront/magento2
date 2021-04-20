import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import { Category } from '@vue-storefront/magento-api';

const buildTree = (rootCategory: Category): AgnosticCategoryTree => ({
  label: rootCategory.name,
  slug: `/${rootCategory.url_path}${rootCategory.url_suffix}`,
  items: rootCategory.children.map(buildTree),
  isCurrent: false,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategoryTree = (category: Category): AgnosticCategoryTree | null => {
  if (!category) {
    return null;
  }
  return buildTree(category);
};

export const getCategoryBreadcrumbs = (category: Category): AgnosticBreadcrumb[] => {
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
  getTree: getCategoryTree,
  getBreadCrumbs: getCategoryBreadcrumbs,
};

export default categoryGetters;
