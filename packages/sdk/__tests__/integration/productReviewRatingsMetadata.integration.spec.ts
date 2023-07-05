import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';

describe(describeGroup('productReviewRatingsMetadata'), () => {
  it('fetches the active ratings attributes and the values each rating can have', async () => {
    const expected = expect.objectContaining({
      data: expect.objectContaining({
        productReviewRatingsMetadata: expect.objectContaining({
          __typename: 'ProductReviewRatingsMetadata',
          items: expect.arrayContaining([
            expect.objectContaining({
              __typename: 'ProductReviewRatingMetadata',
              id: expect.any(String),
              name: expect.any(String),
              values: expect.arrayContaining([
                expect.objectContaining({
                  __typename: 'ProductReviewRatingValueMetadata',
                  value: expect.any(String),
                  value_id: expect.any(String),
                }),
              ]),
            }),
          ]),
        }),
      }),
    });

    const result = await sdk.magento.productReviewRatingsMetadata();

    expect(result).toEqual(expected);
  });

  it('fetches the active ratings attributes and the values each rating can have using custom query', async () => {
    const customQuery = {
      productReviewRatingsMetadata: 'product-review-ratings-metadata-custom-query',
      metadata: {
        fields: 'id',
      },
    };
    const expected = expect.objectContaining({
      data: expect.objectContaining({
        productReviewRatingsMetadata: expect.objectContaining({
          __typename: 'ProductReviewRatingsMetadata',
          items: expect.arrayContaining([
            expect.objectContaining({
              __typename: 'ProductReviewRatingMetadata',
              id: expect.any(String),
            }),
          ]),
        }),
      }),
    });

    const result = await sdk.magento.productReviewRatingsMetadata({ customQuery });

    expect(result).toEqual(expected);
    expect(result?.data?.productReviewRatingsMetadata?.items?.[0]?.name).toBeUndefined();
    expect(result?.data?.productReviewRatingsMetadata?.items?.[0]?.values).toBeUndefined();
  });
});
