import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_PRODUCT_SKU } from './__config__/jest.const';

describe(describeGroup('createProductReview'), () => {
  const review = {
    sku: TEST_PRODUCT_SKU,
    nickname: 'john do the test',
    summary: 'awesome thing, whatever it is!',
    text: 'this is a test review',
    ratings: [
      {
        id: 'NA==',
        value_id: 'MjA=',
      },
    ],
  };

  it('should create a product review', async () => {
    const result = await sdk.magento.createProductReview(review);

    const expected = {
      data: {
        createProductReview: {
          __typename: 'CreateProductReviewOutput',
          review: {
            __typename: 'ProductReview',
            average_rating: 100,
            created_at: expect.any(String),
            nickname: 'john do the test',
            text: 'this is a test review',
            summary: 'awesome thing, whatever it is!',
            ratings_breakdown: expect.any(Array),
          },
        },
      },
    };

    expect(result).toEqual(expected);
  });
});
