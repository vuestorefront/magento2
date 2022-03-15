import findDeep from 'deepdash/findDeep';
import { CategoryTreeInterface } from '~/modules/catalog/category/types';

export const buildCategoryTree = (rootCategory: any, currentCategory: string, withProducts = false): CategoryTreeInterface => {
  const hasChildren = Array.isArray(rootCategory.children) && rootCategory.children.length > 0;
  const isCurrent = rootCategory.uid === currentCategory;
  const label = rootCategory.name;
  const slug = `/${rootCategory.url_path}${rootCategory.url_suffix || ''}`;

  const childrenUid = hasChildren
    ? rootCategory
      .children
      .reduce((acc, curr) => [...acc, curr.uid], [])
    : [];

  const childProductCount = hasChildren
    ? rootCategory
      .children
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
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

export const findActiveCategory = (categoryTree: CategoryTreeInterface, slugToFind: string): CategoryTreeInterface | null => {
  const categories = categoryTree?.items;
  return categories
    ? findDeep(categories, (value: unknown, key: string) => key === 'slug' && slugToFind.includes(value as string))?.parent ?? null
    : null;
};

/*
 * Finds each category preceding `toFind` in the category tree
 * Uses a modified Breadth First Search algorithm to tell you if the toFind node exists how to get to it
 * @returns Flat array of categories ([level1Obj, level2Obj, level3Obj])
 */
export const findCategoryAncestors = (node: CategoryTreeInterface, toFind: CategoryTreeInterface, startingArray = [])
: CategoryTreeInterface[] | null => {
  if (node === toFind) {
    return startingArray;
  }
  if (node.items && node.items.length > 0) {
    for (let i = 0; i < node.items.length; i += 1) {
      const subnode = node.items[i];
      const result = findCategoryAncestors(subnode, toFind, [...startingArray, subnode]);
      if (result) return result;
    }
  }
  return null;
};
