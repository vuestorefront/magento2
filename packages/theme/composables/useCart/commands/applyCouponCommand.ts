import { Context } from '@vue-storefront/core';
import { Logger } from '~/helpers/logger';
import { Cart } from '~/modules/GraphQL/types';

export const applyCouponCommand = {
  execute: async (context: Context, {
    currentCart,
    couponCode,
    customQuery = { applyCouponToCart: 'applyCouponToCart' },
  }) => {
    Logger.debug('[Magento]: Apply coupon on cart', {
      couponCode,
      currentCart,
    });

    const { data } = await context.$magento.api.applyCouponToCart({
      cart_id: currentCart.id,
      coupon_code: couponCode,
    }, customQuery);

    Logger.debug('[Result]:', { data });

    return {
      updatedCart: data.applyCouponToCart.cart as unknown as Cart,
      updatedCoupon: { code: couponCode },
    };
  },
};
