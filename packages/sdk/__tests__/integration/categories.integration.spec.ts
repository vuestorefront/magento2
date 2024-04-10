import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('categories'), () => {
  it('should return list of all categories', async () => {
    const categories = await sdk.magento.categories({});

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        categories: expect.objectContaining({
          items: expect.any(Array),
        }),
      }),
    });

    expect(categories).toEqual(expected);
    expect(categories?.data?.categories?.items?.length).toEqual(1);
  });

  it('should return filtered list of categories', async () => {
    const categories = await sdk.magento.categories({
      pageSize: 2,
      currentPage: 1,
      filters: {
        category_uid: {
          in: ['MjE=', 'MjM=', 'MjU='],
        },
      },
    });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        categories: expect.objectContaining({
          items: expect.any(Array),
        }),
      }),
    });

    expect(categories).toEqual(expected);
    expect(categories?.data?.categories?.items?.length).toEqual(2);
    expect(categories?.data?.categories?.items?.find((category: any) => category.uid === 'MjE=')).toBeTruthy();
  });

  it('should return customized categories result using custom query', async () => {
    const customQuery = {
      categories: 'categories-custom-query',
      metadata: {
        fields: 'items { uid name }',
      },
    };

    const result = await sdk.magento.categories({}, { customQuery });

    const expected = {
      data: {
        categories: {
          __typename: 'CategoryResult',
          items: [
            {
              __typename: 'CategoryTree',
              name: 'Default Category',
              uid: 'Mg==',
            },
          ],
        },
      },
      loading: false,
      networkStatus: 7,
    };

    expect(result).toEqual(expected);
  });
});
