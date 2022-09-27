import { Logger } from '~/helpers/logger';
import { Cart, UpdateCartItemsInput } from '~/modules/GraphQL/types';
import { VsfContext } from '~/composables/context';

export const updateItemQtyCommand = {
  execute: async (context: VsfContext, {
    currentCart,
    product,
    quantity,
    customQuery = { updateCartItems: 'updateCartItems' },
    customHeaders = {},
  }) => {
    Logger.debug('[Magento]: Update product quantity on cart', {
      product,
      quantity,
      currentCart,
    });

    const updateCartParams: UpdateCartItemsInput = {
      cart_id: currentCart.id,
      cart_items: [
        {
          cart_item_uid: product.uid,
          quantity,
        },
      ],
    };

    const { data } = await context.$magento.api.updateCartItems(updateCartParams, customQuery, customHeaders);

    Logger.debug('[Result]:', { data });

    return data
      .updateCartItems
      .cart as unknown as Cart;
  },
};
