import { ComposableFunctionArgs } from '~/composables/types';
import { Logger } from '~/helpers/logger';
import { Cart } from '~/modules/GraphQL/types';
import { VsfContext } from '~/composables/context';

export const loadCartCommand = {
  execute: async (context: VsfContext, params: ComposableFunctionArgs<{
    realCart?: boolean;
  }>) => {
    const apiState = context.$magento.config.state;
    Logger.debug('[Magento Storefront]: Loading Cart');
    const customerToken = apiState.getCustomerToken();
    const virtual = !params.realCart;
    const createVirtualCart = () => (null as Cart);

    const createRealCart = async (): Promise<string> => {
      Logger.debug('[Magento Storefront]: useCart.load.createNewCart');

      apiState.setCartId();

      const { data } = await context.$magento.api.createEmptyCart();
      Logger.debug('[Result]:', { data });

      apiState.setCartId(data.createEmptyCart);

      return data.createEmptyCart;
    };

    const getCartData = async (id: string) => {
      Logger.debug('[Magento Storefront]: useCart.load.getCartData ID->', id);

      const { data, errors } = await context.$magento.api.cart(id);
      Logger.debug('[Result]:', { data });

      if (!data?.cart && errors?.length) {
        throw errors[0];
      }

      data.cart.items = data.cart.items.filter(Boolean);
      return data.cart as unknown as Cart;
    };

    const getCart = async (virtualCart: boolean, cartId?: string) => {
      if (!cartId) {
        if (virtualCart) {
          return createVirtualCart();
        }

        // eslint-disable-next-line no-param-reassign
        cartId = await createRealCart();
        apiState.setCartId(cartId);
      }

      return getCartData(cartId);
    };

    // Try to load cart for existing customer, clean customer token if not possible
    if (customerToken) {
      try {
        const { data, errors } = await context.$magento.api.customerCart();
        Logger.debug('[Result]:', { data, errors });

        if (!data?.customerCart && errors?.length) {
          throw errors[0];
        }

        apiState.setCartId(data.customerCart.id);
        data.customerCart.items = data.customerCart.items.filter(Boolean);

        return data.customerCart as unknown as Cart;
      } catch {
        apiState.setCustomerToken();
      }
    }

    try {
      // If it's not existing customer check if cart id is set and try to load it
      const cartId = apiState.getCartId();
      return await getCart(virtual, cartId);
    } catch {
      apiState.setCartId();
      return await getCart(virtual);
    }
  },
};
