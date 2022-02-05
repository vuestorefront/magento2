import { SetGuestEmailOnCartInput } from '@absolute-web/magento-api';
import { Logger } from '@absolute-web/vsf-core';
import { useGuestUserFactory, UseGuestUserFactoryParams } from '../../factories/useGuestUserFactory';
import useCart from '../useCart';

const factoryParams: UseGuestUserFactoryParams<any, { email:string }> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  attachToCart: async (context, params) => {
    Logger.debug('[Magento]: Attach guest cart to user');

    const cartId = context.$magento.config.state.getCartId();

    const emailOnCartInput: SetGuestEmailOnCartInput = {
      email: params.email,
      cart_id: cartId,
    };

    // workaround to save email to the cart,
    // so in case load() will be called email will be populated correctly
    context.cart.setCart({
      ...context.cart.cart.value,
      email: params.email,
    });

    await context.$magento.api.setGuestEmailOnCart({
      ...emailOnCartInput,
    });
  },
};

export default useGuestUserFactory<any, { email:string }>(factoryParams);
