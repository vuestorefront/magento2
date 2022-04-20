import { findActiveCategory } from '~/modules/catalog/category/helpers/findActiveCategory';
import categoryTreeData from '~/test-utils/mocks/categoryTreeDataMock';

describe('Find active category', () => {
  const sharedMatch = {
    is_anchor: 1,
    name: 'Women',
    position: 2,
    product_count: 75,
    uid: 'MjA=',
    url_path: 'women',
    url_suffix: '.html',
    include_in_menu: 1,
    redirect_code: 301,
  };

  it('find category node by default key', () => {
    const result = findActiveCategory(categoryTreeData[0], 'women');

    expect(result).toMatchObject(sharedMatch);
  });

  it('find category node by custom key', () => {
    const result = findActiveCategory(categoryTreeData[0], 'MjA=', 'uid');

    expect(result).toMatchObject(sharedMatch);
  });

  it('returns null if there is no match', () => {
    const result = findActiveCategory(categoryTreeData[0], 'not_found');

    expect(result).toBeNull();
  });

  it('returns null if findBy key does not exists', () => {
    const result = findActiveCategory(categoryTreeData[0], 'woman', 'invalid_key');

    expect(result).toBeNull();
  });
});
