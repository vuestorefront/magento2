/* istanbul ignore file */
/* eslint-disable no-param-reassign */
import {
  useCartFactory,
  UseCartFactoryParams,
  Context,
  Logger,
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

const params: UseCartFactoryParams<Cart, CartItem, Product, Coupon> = {
  load: async (context: Context) => {
    const apiState = context.$magento.config.state;
    // is user authenticated.
    if (apiState.getCustomerToken()) {
      try {
        // get cart ID
        const result = await context.$magento.api.customerCart();
        return result.data.customerCart;
      } catch (e) {
        // Signed up user don't have a cart.
        apiState.setCartId(null);
        apiState.setCustomerToken(null);
        return await params.load(context, {});
      }
    }

    // if guest user have a cart ID
    let cartId = apiState.getCartId();

    if (!cartId) {
      const result = await context.$magento.api.createEmptyCart();
      cartId = result.data.createEmptyCart;
      apiState.setCartId(cartId);
    }

    try {
      const cartResponse = await context.$magento.api.cart(cartId);
      Logger.debug(cartResponse);
      return cartResponse.data.cart;
    } catch (e) {
      apiState.setCartId(null);
      return await params.load(context, {});
    }
  },
  addItem: async (context: Context, {
    product,
    quantity,
  }) => {
    const apiState = context.$magento.config.state;
    let currentCartId = apiState.getCartId();

    if (!currentCartId) {
      await params.load(context, {});
      currentCartId = apiState.getCartId();
    }

    if (!product) {
      return;
    }

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

        return simpleProduct.data.addSimpleProductsToCart.cart;
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

        return configurableProduct.data.addConfigurableProductsToCart.cart;
      default:
        // todo implement other options
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

    return data.removeItemFromCart.cart;
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

    return data.updateCartItems.cart;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    context.$magento.config.state.setCartId(null);
    return params.load(context, {});
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
      updatedCart: response.data.applyCouponToCart.cart,
      updatedCoupon: { code: couponCode },
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart }) => {
    const response = await context.$magento.api.removeCouponFromCart({
      cart_id: currentCart.id,
    });

    return {
      updatedCart: response.data.removeCouponFromCart.cart,
      updatedCoupon: { code: '' },
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (context: Context, { currentCart, product }) => !!currentCart.items.find((cartItem) => cartItem.product.uid === product.uid),
};

export default useCartFactory<Cart, CartItem, Product, Coupon>(params);
