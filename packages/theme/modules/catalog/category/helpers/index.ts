import { computed, useContext, useRoute } from '@nuxtjs/composition-api';
import findDeep from 'deepdash/findDeep';
import { CategoryTreeInterface } from '~/modules/catalog/category/types';
import { useCategoryStore } from '~/stores/category';

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

/**
 * Logic for finding the current product category and its parent and grandparent categories (ancestors)
 * */
export const useCategoryLogic = () => {
  const context = useContext();
  const categoryStore = useCategoryStore();
  const route = useRoute();

  const categoryTree = computed(() => categoryStore.categories);
  const isCategoryTreeLoaded = computed(() => categoryStore.categories !== null);
  const loadCategoryTree = () => categoryStore.load();

  const activeCategory = computed(() => {
    // on localhost the default store is localhost:3000/default/ but in a multi-store Magento instance this can change
    const slugToFind = route.value.fullPath.replace(context.app.localePath('/c'), '');
    return categoryTree.value === null ? null : findActiveCategory(categoryTree.value, slugToFind);
  });

  const categoryAncestors = computed(() => (activeCategory.value === null
    ? []
    : findCategoryAncestors(categoryTree.value, activeCategory.value)) ?? []);

  return {
    activeCategory,
    categoryAncestors,
    categoryTree,

    loadCategoryTree,
    isCategoryTreeLoaded,
  };
};
