/**
 * @deprecated since version 1.0.0
 */
import { AgnosticCategoryTree } from '@vue-storefront/core';
import { CategoryTree } from '@vue-storefront/magento-api';
import { htmlDecode } from './htmlDecoder';

export const buildCategoryTree = (rootCategory: CategoryTree, currentCategory: string, withProducts = false): AgnosticCategoryTree => {
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
