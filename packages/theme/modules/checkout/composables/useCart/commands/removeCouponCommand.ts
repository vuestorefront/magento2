import { Logger } from '~/helpers/logger';
import { Cart } from '~/modules/GraphQL/types';
import { VsfContext } from '~/composables/context';

export const removeCouponCommand = {
  execute: async (context: VsfContext, { currentCart, customQuery = { removeCouponFromCart: 'removeCouponFromCart' }, customHeaders = {} }) => {
    Logger.debug('[Magento]: Remove coupon from cart', { currentCart });

    const { data, errors } = await context.$magento.api.removeCouponFromCart({
      cart_id: currentCart.id,
    }, customQuery, customHeaders);

    Logger.debug('[Result]:', { data });

    return {
      updatedCart: data.removeCouponFromCart?.cart as unknown as Cart,
      updatedCoupon: { code: '' },
      errors,
    };
  },
};
