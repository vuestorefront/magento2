import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import { Category } from '@vue-storefront/magento-api';
import { htmlDecode } from '../../helpers/htmlDecoder';

const buildTree = (rootCategory: Category, currentCategory: string, withProducts = false): AgnosticCategoryTree => {
  const hasChildren = Array.isArray(rootCategory.children) && rootCategory.children.length > 0;
  const isCurrent = rootCategory.uid === currentCategory;
  const label = htmlDecode(rootCategory.name);
  const slug = `/${rootCategory.url_path}${rootCategory.url_suffix || ''}`;
  const childrenUid = hasChildren
    ? rootCategory
      .children
      .reduce((acc, curr) => [...acc, curr.uid], [])
    : [];

  const childProductCount = hasChildren
    ? rootCategory
      .children
      .reduce((acc, curr) => acc + curr.product_count, 0)
    : 0;

  const items = hasChildren
    ? rootCategory
      .children
      .filter((c) => (withProducts ? c.product_count > 0 : true))
      .map((c) => buildTree(c, currentCategory))
    : [];

  return {
    label,
    slug,
    uid: [rootCategory.uid, ...childrenUid],
    items,
    count: childProductCount || rootCategory.product_count,
    isCurrent,
  };
};

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
