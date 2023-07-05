import { sdk } from './__config__/sdk.config';
import { describeGroup } from './__config__/jest.setup';
import { TEST_CART_ID, TEST_COUPON_CODE } from './__config__/jest.const';

const TO_ADD_PARAMS = {
  cart_id: TEST_CART_ID,
  coupon_code: TEST_COUPON_CODE,
};

const TO_REMOVE_PARAMS = {
  cart_id: TEST_CART_ID,
};

describe(describeGroup('removeCouponFromCart'), () => {
  it('should remove coupon from cart if was previously applied', async () => {
    await sdk.magento.applyCouponToCart(TO_ADD_PARAMS);
    const result = await sdk.magento.removeCouponFromCart(TO_REMOVE_PARAMS);

    expect(result.data?.removeCouponFromCart?.cart?.applied_coupons).toBeNull();
  });

  it('using custom query should return customized result', async () => {
    const customQuery = {
      removeCouponFromCart: 'remove-coupon-from-cart-custom-query',
      metadata: {
        fields: 'cart { applied_coupons { code } }',
      },
    };

    await sdk.magento.applyCouponToCart(TO_ADD_PARAMS);
    const result = await sdk.magento.removeCouponFromCart(TO_REMOVE_PARAMS, { customQuery });

    expect(result.data).toEqual({
      removeCouponFromCart: {
        __typename: 'RemoveCouponFromCartOutput',
        cart: {
          __typename: 'Cart',
          applied_coupons: null,
        },
      },
    });
  });
});
