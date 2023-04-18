import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

const PRODUCT_SKU = 'WSH12';

describe(describeGroup('products'), () => {
  it('returns products without filters', async () => {
    const products = await sdk.magento.products({});

    const expected = {
      data: {
        products: expect.objectContaining({
          aggregations: expect.any(Array),
          items: expect.any(Array),
          page_info: expect.any(Object),
          total_count: expect.any(Number)
        })
      },
      loading: expect.anything(),
      networkStatus: expect.any(Number)
    };

    expect(products).toEqual(expected);
  });

  it('returns filtered products', async () => {
    const products = await sdk.magento.products({
      pageSize: 20,
      currentPage: 1,
      filter: {
        sku: {
          eq: PRODUCT_SKU
        }
      }
    });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        products: expect.objectContaining({
          items: expect.arrayContaining([
            expect.objectContaining({
              sku: PRODUCT_SKU
            })
          ]),
          total_count: 1
        })
      })
    });

    expect(products).toEqual(expected);
    expect(products?.data?.products?.items?.length).toEqual(1);
  });

  it('uses custom query to modify the request', async () => {
    const customQuery = {
      products: 'products-custom-query',
      metadata: {
        fields: 'items { sku name }'
      }
    };

    const products = await sdk.magento.products({
      filter: {
        sku: {
          eq: PRODUCT_SKU
        }
      }
    }, { customQuery });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        products: expect.objectContaining({
          items: expect.arrayContaining([
            expect.objectContaining({
              sku: PRODUCT_SKU,
              name: expect.any(String)
            })
          ])
        })
      })
    });

    expect(products).toEqual(expected);
  });
});
