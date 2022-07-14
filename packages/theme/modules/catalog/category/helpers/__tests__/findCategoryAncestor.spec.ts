import { findCategoryAncestors } from '~/modules/catalog/category/helpers/findCategoryAncestors';
import categoryTreeData from '~/tests/unit/mocks/categoryTreeDataMock';

describe('findCategoryAncestors', () => {
  it('if "node" is equal to "toFind" then return starting array', () => {
    const result = findCategoryAncestors(categoryTreeData[0], categoryTreeData[0], categoryTreeData);
    expect(result).toEqual(categoryTreeData);
  });

  it('returns an array of preceding toFinds in a proper order', () => {
    const result = findCategoryAncestors(categoryTreeData[0], categoryTreeData[0].children[1], categoryTreeData);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ uid: 'Mg==' }),
        expect.objectContaining({ uid: 'MjA=' }),
      ]),
    );
  });

  it('returns null if there are no ancestors', () => {
    const result = findCategoryAncestors(categoryTreeData[0].children[1], categoryTreeData[0], categoryTreeData);

    expect(result).toBeNull();
  });
});
