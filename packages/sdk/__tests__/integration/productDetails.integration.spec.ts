import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

const PRODUCT_SKU = 'WSH12';

describe(describeGroup('productDetails'), () => {
  it('returns product details without filters', async () => {
    const details = await sdk.magento.productDetails({});

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        products: expect.objectContaining({
          items: expect.arrayContaining([
            expect.objectContaining({
              categories: expect.any(Array),
              configurable_options: expect.any(Array)
            })
          ])
        })
      })
    });

    expect(details).toEqual(expected);
  });

  it('returns filtered product details', async () => {
    const details = await sdk.magento.productDetails({
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
          ])
        })
      })
    });

    expect(details).toEqual(expected);
    expect(details?.data?.products?.items?.length).toEqual(1);
  });

  it('uses custom query to modify the request', async () => {
    const customQuery = {
      productDetails: 'product-details-custom-query',
      metadata: {
        fields: 'items { sku name }'
      }
    };

    const details = await sdk.magento.productDetails({
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

    expect(details).toEqual(expected);
  });
});
