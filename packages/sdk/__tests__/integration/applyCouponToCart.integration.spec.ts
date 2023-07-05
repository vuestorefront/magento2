import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID, TEST_COUPON_CODE } from './__config__/jest.const';

describe(describeGroup('applyCouponToCart'), () => {
  it('should return error if the coupon is invalid', async () => {
    const params = {
      cart_id: TEST_CART_ID,
      coupon_code: 'invalid-code',
    };

    const result = await sdk.magento.applyCouponToCart(params);

    expect(result.errors).toBeDefined();
    expect(result.errors![0].message).toEqual("The coupon code isn't valid. Verify the code and try again.");
  });

  it('should apply coupon to cart', async () => {
    const params = {
      cart_id: TEST_CART_ID,
      coupon_code: TEST_COUPON_CODE,
    };

    const result = await sdk.magento.applyCouponToCart(params);

    expect(result.data?.applyCouponToCart?.cart?.applied_coupons?.[0]?.code).toEqual(TEST_COUPON_CODE);

    await sdk.magento.removeCouponFromCart({ cart_id: TEST_CART_ID });
  });

  it('using custom query should return customized result', async () => {
    const customQuery = {
      applyCouponToCart: 'apply-coupon-to-cart-custom-query',
      metadata: {
        fields: 'cart { applied_coupons { code } }',
      },
    };

    const params = {
      cart_id: TEST_CART_ID,
      coupon_code: TEST_COUPON_CODE,
    };

    const result = await sdk.magento.applyCouponToCart(params, { customQuery });

    expect(result.data).toEqual({
      applyCouponToCart: {
        __typename: 'ApplyCouponToCartOutput',
        cart: {
          __typename: 'Cart',
          applied_coupons: [
            {
              __typename: 'AppliedCoupon',
              code: TEST_COUPON_CODE,
            },
          ],
        },
      },
    });

    await sdk.magento.removeCouponFromCart({ cart_id: TEST_CART_ID });
  });
});
