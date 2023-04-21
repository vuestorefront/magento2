import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID } from './__config__/jest.const';

describe(describeGroup('applyCouponToCart'), () => {
  it('should return error if the coupon is invalid', async () => {
    const params = {
      cart_id: TEST_CART_ID,
      coupon_code: 'invalid-coupon'
    };

    const result = await sdk.magento.applyCouponToCart(params);

    expect(result.errors).toBeDefined();
    expect(result.errors![0].message).toEqual('The coupon code isn\'t valid. Verify the code and try again.');
  });

  it('should apply coupon to cart', async () => {
    const params = {
      cart_id: TEST_CART_ID,
      coupon_code: 'integration-tests'
    };

    const result = await sdk.magento.applyCouponToCart(params);

    expect(result.data?.applyCouponToCart?.cart?.applied_coupons?.[0]?.code).toEqual('integration-tests');
  });

  // TODO: fix this test when remove coupon from the cart is implemented
  it.skip('using custom query should return customized result', async () => {
    const customQuery = {
      applyCouponToCart: 'apply-coupon-to-cart-custom-query',
      metadata: {
        fields: 'cart { applied_coupons { code } }'
      }
    };

    const params = {
      cart_id: TEST_CART_ID,
      coupon_code: 'invalid-coupon'
    };

    const result = await sdk.magento.applyCouponToCart(params, { customQuery });

    expect(result.data).toEqual({
      applyCouponToCart: {
        cart: {
          applied_coupons: [
            {
              code: 'integration-tests'
            }
          ]
        }
      }
    });
  });
});
