import { Logger } from '~/helpers/logger';
import { Cart, RemoveItemFromCartInput } from '~/modules/GraphQL/types';
import { VsfContext } from '~/composables/context';
import { CustomQuery, CustomHeaders } from '~/types/core';

export const removeItemCommand = {
  execute: async (
    context: VsfContext,
    {
      currentCart,
      product,
      customQuery,
      customHeaders,
    },
  ) => {
    Logger.debug('[Magento]: Remove item from cart', {
      product,
      currentCart,
    });

    const item = currentCart.items.find((cartItem) => cartItem.uid === product.uid);

    if (!item) {
      return;
    }

    const removeItemParams: RemoveItemFromCartInput = {
      cart_id: currentCart.id,
      cart_item_uid: item.uid,
    };

    const { data } = await context.$magento.api.removeItemFromCart(
      removeItemParams,
      customQuery as CustomQuery,
      customHeaders as CustomHeaders,
    );

    Logger.debug('[Result]:', { data });

    // eslint-disable-next-line consistent-return
    return data
      .removeItemFromCart
      .cart as unknown as Cart;
  },
};
