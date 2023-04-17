import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('categoryList'), () => {
  it('should return list of all categories', async () => {
    const categoryList = await sdk.magento.categoryList({});

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        categories: expect.objectContaining({
          items: expect.any(Array)
        })
      })
    });

    expect(categoryList).toEqual(expected);
    expect(categoryList?.data?.categories?.items?.length).toEqual(1);
  });

  it('should return customized categories result using custom query', async () => {
    const customQuery = {
      categoryList: 'category-list-custom-query',
      metadata: {
        fields: 'items { uid name }'
      }
    };

    const result = await sdk.magento.categoryList({}, { customQuery });

    const expected = {
      data: {
        categories: {
          __typename: 'CategoryResult',
          items: [
            {
              __typename: 'CategoryTree',
              name: 'Default Category',
              uid: 'Mg=='
            }
          ]
        }
      },
      loading: false,
      networkStatus: 7
    };

    expect(result).toEqual(expected);
  });
});
