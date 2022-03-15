import { CategoryTreeInterface } from '~/modules/catalog/category/types';
import { useMobileCategoryTree } from '../logic';

const createCategoryItem = (label: string): CategoryTreeInterface => ({
  label, items: [], isCurrent: false, count: 10,
});

describe('categoryTreeLogic', () => {
  it('can go down down a category', () => {
    const itemFirst = createCategoryItem('Itemless1');
    const { history, current, onGoCategoryDown } = useMobileCategoryTree();
    onGoCategoryDown(itemFirst);
    expect(current.value.label).toBe(itemFirst.label);
    expect(history.value).toHaveLength(1);
  });

  it('can go up a category', () => {
    const itemFirst = createCategoryItem('Itemless1');
    const itemSecond = createCategoryItem('Itemless2');

    const { current, onGoCategoryDown, onGoCategoryUp } = useMobileCategoryTree();

    onGoCategoryDown(itemFirst);
    onGoCategoryDown(itemSecond);
    onGoCategoryUp();

    expect(current.value.label).toBe(itemFirst.label);
  });

  it('current item is last in history', () => {
    const itemFirst = createCategoryItem('Itemless1');
    const itemSecond = createCategoryItem('Itemless2');
    const { history, current, onGoCategoryDown } = useMobileCategoryTree();

    onGoCategoryDown(itemFirst);
    onGoCategoryDown(itemSecond);

    expect(current.value.label).toBe(itemSecond.label);
    expect(history.value).toHaveLength(2);
  });
});
