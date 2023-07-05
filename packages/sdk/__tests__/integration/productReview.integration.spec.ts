import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_PRODUCT_SKU } from './__config__/jest.const';

describe(describeGroup('productReview'), () => {
  const params = {
    filter: {
      sku: {
        eq: TEST_PRODUCT_SKU,
      },
    },
  };

  it('should fetch product reviews', async () => {
    const result = await sdk.magento.productReview(params);
    expect(result?.data?.products?.items?.[0]?.reviews?.items).toBeDefined();
  });

  it('should fetch product reviews using custom query', async () => {
    const customQuery = {
      productReview: 'product-review-custom-query',
      metadata: {
        fields: 'average_rating',
      },
    };

    const result = await sdk.magento.productReview(params, { customQuery });

    expect(result?.data?.products?.items?.[0]?.reviews?.items?.[0]?.average_rating).toBeDefined();
    // check if default (non-custom) query isn't ran on accident
    expect(result?.data?.products?.items?.[0]?.reviews?.items?.[0]?.ratings_breakdown).toBeUndefined();
  });
});
