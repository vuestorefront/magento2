import { Logger } from '~/helpers/logger';
import { Cart } from '~/modules/GraphQL/types';
import { VsfContext } from '~/composables/context';

export const applyCouponCommand = {
  execute: async (context: VsfContext, {
    currentCart,
    couponCode,
    customQuery = { applyCouponToCart: 'applyCouponToCart' },
    customHeaders = {},
  }) => {
    Logger.debug('[Magento]: Apply coupon on cart', {
      couponCode,
      currentCart,
    });

    const { data, errors } = await context.$magento.api.applyCouponToCart({
      cart_id: currentCart.id,
      coupon_code: couponCode,
    }, customQuery, customHeaders);

    Logger.debug('[Result]:', { data, errors });

    return {
      updatedCart: data.applyCouponToCart?.cart as unknown as Cart,
      updatedCoupon: { code: couponCode },
      errors,
    };
  },
};
