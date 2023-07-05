import { sdk } from './__config__/sdk.config';
import { describeGroup, getUserToken } from './__config__/jest.setup';

describe(describeGroup('reviews'), () => {
  it('should fetch customer product reviews', async () => {
    const token = await getUserToken();

    const result = await sdk.magento.reviews({ pageSize: 1 }, { customHeaders: { Authorization: `Bearer ${token}` } });

    const expected = expect.objectContaining({
      data: expect.objectContaining({
        customer: expect.objectContaining({
          __typename: 'Customer',
          reviews: expect.objectContaining({
            items: expect.arrayContaining([
              expect.objectContaining({
                __typename: 'ProductReview',
              }),
            ]),
          }),
        }),
      }),
    });

    expect(result).toEqual(expected);
    expect(result?.data?.customer?.reviews?.items?.length).toBe(1);
    expect(result?.data?.customer?.reviews?.page_info?.page_size).toBe(1);
  });

  it('should fetch customer products reviews using custom query', async () => {
    const customQuery = {
      reviews: 'customer-product-review-custom-query',
      metadata: {
        fields: 'items { text }',
      },
    };

    const token = await getUserToken();

    const result = await sdk.magento.reviews(
      { pageSize: 1 },
      { customQuery, customHeaders: { Authorization: `Bearer ${token}` } },
    );
    const review = result?.data?.customer?.reviews?.items?.[0];

    expect(review?.text).toBeDefined();
    expect(review?.summary).toBeUndefined();
  });
});
