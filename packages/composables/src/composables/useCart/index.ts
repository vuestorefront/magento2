/* istanbul ignore file */
/* eslint-disable no-param-reassign */
import {
  Context,
  Logger,
  useCartFactory,
  UseCartFactoryParams,
} from '@vue-storefront/core';
import {
  AddConfigurableProductsToCartInput,
  AddSimpleProductsToCartInput,
  Cart,
  CartItem,
  Coupon,
  Product,
  RemoveItemFromCartInput,
  UpdateCartItemsInput,
} from '@vue-storefront/magento-api';

const factoryParams: UseCartFactoryParams<Cart, CartItem, Product, Coupon> = {
  load: async (context: Context) => {
    const apiState = context.$magento.config.state;
    Logger.debug('[Magento Storefront]: Loading Cart');
    const customerToken = apiState.getCustomerToken();

    if (customerToken) { // is user authenticated.
      try { // get cart ID
        const result = await context.$magento.api.customerCart();

        return result.data.customerCart as unknown as Cart;
      } catch (e) { // Signed up user don't have a cart.
        apiState.setCartId(null);
        apiState.setCustomerToken(null);

        return await factoryParams.load(context, {}) as unknown as Cart;
      }
    }

    let cartId = apiState.getCartId(); // if guest user have a cart ID

    if (!cartId) {
      const { data } = await context.$magento.api.createEmptyCart();

      cartId = data.createEmptyCart;

      apiState.setCartId(cartId);
    }

    try {
      const cartResponse = await context.$magento.api.cart(cartId);

      Logger.debug(cartResponse);

      return cartResponse.data.cart as unknown as Cart;
    } catch (e) {
      apiState.setCartId(null);

      return await factoryParams.load(context, {}) as unknown as Cart;
    }
  },
  addItem: async (context: Context, {
    product,
    quantity,
  }) => {
    const apiState = context.$magento.config.state;
    let currentCartId = apiState.getCartId();

    if (!currentCartId) {
      await factoryParams.load(context, {});

      currentCartId = apiState.getCartId();
    }

    if (!product) {
      return;
    }

    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    switch (product.__typename) {
      case 'SimpleProduct':
        const simpleCartInput: AddSimpleProductsToCartInput = {
          cart_id: currentCartId,
          cart_items: [
            {
              data: {
                quantity,
                sku: product.sku,
              },
            },
          ],
        };

        const simpleProduct = await context.$magento.api.addSimpleProductsToCart(simpleCartInput);

        return simpleProduct
          .data
          .addSimpleProductsToCart
          .cart as unknown as Cart;
      case 'ConfigurableProduct':
        const configurableCartInput: AddConfigurableProductsToCartInput = {
          cart_id: currentCartId,
          cart_items: [
            {
              parent_sku: product.sku,
              data: {
                quantity,
                sku: product.sku,
              },
            },
          ],
        };

        const configurableProduct = await context.$magento.api.addConfigurableProductsToCart(configurableCartInput);

        return configurableProduct
          .data
          .addConfigurableProductsToCart
          .cart as unknown as Cart;
      default:
        // todo implement other options
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        throw new Error(`Product Type ${product.__typename} not supported in add to cart yet`);
    }
  },
  removeItem: async (context: Context, {
    currentCart,
    product,
  }) => {
    const item = currentCart.items.find((cartItem) => cartItem.product.uid === product.uid);

    if (!item) {
      return;
    }

    const removeItemParams: RemoveItemFromCartInput = {
      cart_id: currentCart.id,
      cart_item_id: Number.parseInt(item.uid, 10),
    };

    const { data } = await context.$magento.api.removeItemFromCart(removeItemParams);

    return data
      .removeItemFromCart
      .cart as unknown as Cart;
  },

  updateItemQty: async (context: Context, {
    currentCart,
    product,
    quantity,
  }) => {
    const updateCartParams: UpdateCartItemsInput = {
      cart_id: currentCart.id,
      cart_items: [
        {
          cart_item_id: Number.parseInt(product.uid, 10),
          quantity,
        },
      ],
    };

    const { data } = await context.$magento.api.updateCartItems(updateCartParams);

    return data
      .updateCartItems
      .cart as unknown as Cart;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    context.$magento.config.state.setCartId(null);

    return factoryParams.load(context, {});
  },
  applyCoupon: async (context: Context, {
    currentCart,
    couponCode,
  }) => {
    const response = await context.$magento.api.applyCouponToCart({
      cart_id: currentCart.id,
      coupon_code: couponCode,
    });

    return {
      updatedCart: response.data.applyCouponToCart.cart as unknown as Cart,
      updatedCoupon: { code: couponCode },
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart }) => {
    const response = await context.$magento.api.removeCouponFromCart({
      cart_id: currentCart.id,
    });

    return {
      updatedCart: response.data.removeCouponFromCart.cart as unknown as Cart,
      updatedCoupon: { code: '' },
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (
    context: Context,
    {
      currentCart,
      product,
    },
  ) => !!currentCart
    .items
    .find((cartItem) => cartItem.product.uid === product.uid),
};

export default useCartFactory<Cart, CartItem, Product, Coupon>(factoryParams);
