import { CategoryFilterInput } from '@vsf-enterprise/magento-api-types';
import { sdk } from '../integration/__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('categorySearch'), () => {
  it('returns categories with no params', async () => {
    const result = await sdk.magento.categorySearch();

    expect(result.data.categoryList).not.toHaveLength(0);
  });

  it('filters categories', async () => {
    const filters : CategoryFilterInput = { category_uid: { in: ['MjA='] } };

    const result = await sdk.magento.categorySearch({ filters });

    expect(result.data.categoryList).toContainEqual(expect.objectContaining({ uid: 'MjA=' }));
  });

  it('uses custom query', async () => {
    const customQuery = {
      categorySearch: 'category-search-custom-query',
      metadata: {
        // field that doesn't exist in default query
        fields: 'available_sort_by'
      }
    };

    const result = await sdk.magento.categorySearch({}, { customQuery });

    const expected = {
      __typename: 'CategoryTree',
      available_sort_by: null
    };
    expect(result.data.categoryList[0]).toStrictEqual(expected);
  });
});
