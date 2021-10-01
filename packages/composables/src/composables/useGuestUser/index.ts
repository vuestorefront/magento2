import { SetGuestEmailOnCartInput } from '@vue-storefront/magento-api';
import { Logger } from '@vue-storefront/core';
import { useGuestUserFactory, UseGuestUserFactoryParams } from '../../factories/useGuestUserFactory';
import useCart from '../useCart';

const factoryParams: UseGuestUserFactoryParams<any, any> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  attachToCart: async (context, params) => {
    Logger.debug('[Magento]: Attach guest cart to user');

    const emailOnCartInput: SetGuestEmailOnCartInput = {
      email: params.email,
      cart_id: context.cart.cart.value.id,
    };

    await context.$magento.api.setGuestEmailOnCart(emailOnCartInput);
  },
};

export default useGuestUserFactory<any, any>(factoryParams);
