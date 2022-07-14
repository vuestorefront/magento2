import { findActiveCategory } from '~/modules/catalog/category/helpers/findActiveCategory';
import categoryTreeData from '~/tests/unit/mocks/categoryTreeDataMock';

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

  it('find category node by default key with overlapping keys value (women, men)', () => {
    const result = findActiveCategory(categoryTreeData[0], 'men');

    expect(result).toMatchObject({
      is_anchor: 0,
      name: 'Men',
      position: 3,
      product_count: 0,
      uid: 'MTE=',
      url_path: 'men',
      url_suffix: '.html',
      include_in_menu: 1,
      redirect_code: 301,
    });
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
    // @ts-expect-error intentional breach of typedefs
    const result = findActiveCategory(categoryTreeData[0], 'woman', 'invalid_key');

    expect(result).toBeNull();
  });

  it('correctly returns child category', () => {
    const result = findActiveCategory(categoryTreeData[0], 'women/tops-women');
    expect(result).toStrictEqual(categoryTreeData[0].children[1].children[0]);
  });
});
