import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

const PRODUCT_SKU = 'WSH12';

describe(describeGroup('relatedProducts'), () => {
  it('returns related products for a product filtered by SKU', async () => {
    const result = await sdk.magento.relatedProducts({
      pageSize: 1,
      filter: {
        sku: {
          eq: PRODUCT_SKU
        }
      }
    });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        products: expect.objectContaining({
          __typename: 'Products',
          items: expect.arrayContaining([
            expect.objectContaining({
              related_products: expect.any(Array)
            })
          ])
        })
      })
    });

    expect(result).toEqual(expected);
  });

  it('uses custom query to modify the request', async () => {
    const customQuery = {
      relatedProducts: 'related-products-custom-query',
      metadata: {
        fields: 'items { related_products { uid __typename } }'
      }
    };

    const result = await sdk.magento.relatedProducts({
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
              related_products: [
                {
                  __typename: 'ConfigurableProduct',
                  uid: 'MTQzNA=='
                },
                {
                  __typename: 'ConfigurableProduct',
                  uid: 'MTUxNA=='
                },
                {
                  __typename: 'ConfigurableProduct',
                  uid: 'MTc3MA=='
                },
                {
                  __typename: 'ConfigurableProduct',
                  uid: 'MTgxOA=='
                }
              ]
            })
          ])
        })
      })
    });

    expect(result).toEqual(expected);
  });
});
