import { CategoryTree as Category } from '@absolute-web/magento-api';
import { AgnosticCategoryTree } from '@absolute-web/vsf-core';
import { htmlDecode } from './htmlDecoder';

const getChildrenUids = (category: Category) => {
  if (!Array.isArray(category.children) || category.children.length === 0) {
    return [];
  }

  return category
    .children
    .reduce((acc, curr) => [...acc, curr.uid, ...getChildrenUids(curr)], []);
};

const getChildrenProductCount = (category: Category): number => {
  if (!Array.isArray(category.children) || category.children.length === 0) {
    return 0;
  }

  return category
    .children
    .reduce((acc, curr) => acc + curr.product_count + getChildrenProductCount(curr), 0);
};

export const buildCategoryTree = (rootCategory: any, currentCategory: string, withProducts = false): AgnosticCategoryTree => {
  const hasChildren = Array.isArray(rootCategory.children) && rootCategory.children.length > 0;
  const isCurrent = rootCategory.uid === currentCategory;
  const label = htmlDecode(rootCategory.name);
  const slug = `/${rootCategory.url_path}${rootCategory.url_suffix || ''}`;

  const childrenUid = getChildrenUids(rootCategory);

  const childProductCount = getChildrenProductCount(rootCategory);

  const items = hasChildren
    ? rootCategory
      .children
      .filter((c) => (withProducts ? c.product_count > 0 : true))
      .map((c) => buildCategoryTree(c, currentCategory))
    : [];

  return {
    label,
    slug,
    uid: [rootCategory.uid, ...childrenUid],
    items: items.filter((c) => c.count > 0),
    count: childProductCount || rootCategory.product_count,
    isCurrent,
  };
};
