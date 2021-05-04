import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import { Category } from '@vue-storefront/magento-api';

const buildTree = (rootCategory: Category): AgnosticCategoryTree => ({
  label: rootCategory.name,
  slug: `/${rootCategory.url_path}${rootCategory.url_suffix || ''}`,
  items: Array.isArray(rootCategory.children) && rootCategory.children.length ? rootCategory.children.map(buildTree) : [],
  isCurrent: false,
});

const buildCategoryTreeList = (categories: Category[]): Category[] | null => {
  if (!categories) {
    return null;
  }

  const baseList: Category[] = [];

  categories.sort((a, b) => {
    if (a.breadcrumbs === null || b.breadcrumbs) return 1;
    return (Array.isArray(a.breadcrumbs)
      && Array.isArray(b.breadcrumbs)
      && a.breadcrumbs.length > b.breadcrumbs.length)
      ? 1
      : -1;
  }).filter((c) => c.url_path !== null).map((c) => {
    if (c.breadcrumbs === null && baseList.findIndex((e) => e.uid === c.uid) === -1) baseList.push(c);
    return c;
  }).forEach((c) => {
    if (c.breadcrumbs && c.breadcrumbs.length) {
      const baseListCategoryIndex = baseList.findIndex((e) => e.uid === c.breadcrumbs[0].category_uid);

      return baseListCategoryIndex !== -1 ? baseList[baseListCategoryIndex].children.push(c) : false;
    }
    return false;
  });

  return baseList;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategoryTree = (category: Category): AgnosticCategoryTree | null => {
  if (!category) {
    return null;
  }
  return buildTree(category);
};

export const getCategoryTreeList = (categories: Category[]): AgnosticCategoryTree[] | null => {
  if (!categories) {
    return null;
  }

  const baseCategoryTree = buildCategoryTreeList(categories);

  return baseCategoryTree.length ? baseCategoryTree.map((c) => buildTree(c)) : null;
};

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
  getTree: getCategoryTree,
  getBreadcrumbs: getCategoryBreadcrumbs,
  getCategoryTreeList,
};

export default categoryGetters;
