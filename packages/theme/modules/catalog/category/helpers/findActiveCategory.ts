import findDeep from 'deepdash/findDeep';
import { CategoryTree } from '~/modules/GraphQL/types';

/**
 * Traverse Category Tree to find and return active category by "findBy" param
 *
 * @param categoryTree CategoryTree
 * @param toFind string
 * @param findBy string (default = url_path)
 *
 * @return CategoryTree
 */
export function findActiveCategory(categoryTree: CategoryTree, toFind: string, findBy: keyof CategoryTree = 'url_path'): CategoryTree | null {
  const categories = categoryTree?.children;

  return categories
    ? findDeep(categories, (value: string, key: string) => key === findBy && value === toFind)?.parent ?? null
    : null;
}
