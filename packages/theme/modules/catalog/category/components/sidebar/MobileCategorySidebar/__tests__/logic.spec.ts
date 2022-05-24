import { CategoryTree } from '~/modules/catalog/category/types';
import { useMobileCategoryTree } from '../logic';

const createCategoryItem = (name: string): CategoryTree => ({
  name, children: [], redirect_code: 302, uid: `${name}_${Math.floor(Math.random() * 100)}`,
});

describe('categoryTreeLogic', () => {
  it('can go down down a category', () => {
    const itemFirst = createCategoryItem('Itemless1');
    const { history, current, onGoCategoryDown } = useMobileCategoryTree();
    onGoCategoryDown(itemFirst);
    expect(current.value.name).toBe(itemFirst.name);
    expect(history.value).toHaveLength(1);
  });

  it('can go up a category', () => {
    const itemFirst = createCategoryItem('Itemless1');
    const itemSecond = createCategoryItem('Itemless2');

    const { current, onGoCategoryDown, onGoCategoryUp } = useMobileCategoryTree();

    onGoCategoryDown(itemFirst);
    onGoCategoryDown(itemSecond);
    onGoCategoryUp();

    expect(current.value.name).toBe(itemFirst.name);
  });

  it('current item is last in history', () => {
    const itemFirst = createCategoryItem('Itemless1');
    const itemSecond = createCategoryItem('Itemless2');
    const { history, current, onGoCategoryDown } = useMobileCategoryTree();

    onGoCategoryDown(itemFirst);
    onGoCategoryDown(itemSecond);

    expect(current.value.name).toBe(itemSecond.name);
    expect(history.value).toHaveLength(2);
  });
});
