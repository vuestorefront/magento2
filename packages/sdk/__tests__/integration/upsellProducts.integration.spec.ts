import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_PRODUCT_SKU } from './__config__/jest.const';

describe(describeGroup('upsellProducts'), () => {
  it('returns upsell-products without filters', async () => {
    const upsellProducts = await sdk.magento.upsellProducts({});

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        products: expect.objectContaining({
          items: expect.arrayContaining([
            expect.objectContaining({
              upsell_products: expect.arrayContaining([expect.objectContaining({ __typename: 'SimpleProduct' })]),
              uid: expect.any(String),
            }),
          ]),
        }),
      }),
    });

    expect(upsellProducts).toEqual(expected);
  });

  it('returns filtered product with upsell_products', async () => {
    const upsellProducts = await sdk.magento.upsellProducts({
      pageSize: 20,
      currentPage: 1,

      filter: {
        sku: {
          eq: TEST_PRODUCT_SKU,
        },
      },
    });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        products: expect.objectContaining({
          items: expect.arrayContaining([
            expect.objectContaining({
              upsell_products: expect.arrayContaining([expect.objectContaining({ __typename: 'SimpleProduct' })]),
              uid: expect.any(String),
            }),
          ]),
        }),
      }),
    });

    expect(upsellProducts).toEqual(expected);
  });

  it('uses custom query to modify the request', async () => {
    const customQuery = {
      upsellProducts: 'upsell-products-custom-query',
      metadata: {
        fields: 'items { upsell_products { uid __typename activity } }',
      },
    };

    const result = await sdk.magento.upsellProducts(
      {
        filter: {
          sku: {
            eq: TEST_PRODUCT_SKU,
          },
        },
      },
      { customQuery },
    );

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        products: expect.objectContaining({
          items: expect.arrayContaining([
            expect.objectContaining({
              upsell_products: expect.arrayContaining([
                expect.objectContaining({
                  __typename: 'SimpleProduct',
                  activity: null,
                  uid: 'MQ==',
                }),
              ]),
            }),
          ]),
        }),
      }),
    });

    expect(result).toEqual(expected);
  });
});
