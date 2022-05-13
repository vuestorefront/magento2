import { CategoryTree } from '~/modules/GraphQL/types';

/*
 * Finds each category preceding `toFind` in the category tree
 * Uses a modified Breadth First Search algorithm to tell you if the toFind node exists how to get to it
 *
 * @param node CategoryTree
 * @param toFind CategoryTree
 * @param startingArray CategoryTree[]
 *
 * @returns Flat array of categories ([level1Obj, level2Obj, level3Obj])
 */
export function findCategoryAncestors(node: CategoryTree, toFind: CategoryTree, startingArray: CategoryTree[] = [])
  : CategoryTree[] | null {
  if (node === toFind) {
    return startingArray;
  }

  if (node.children && node.children.length > 0) {
    for (let i = 0; i < node.children.length; i += 1) {
      const subnode = node.children[i];
      const result = findCategoryAncestors(subnode, toFind, [...startingArray, subnode]);
      if (result) return result;
    }
  }

  return null;
}
