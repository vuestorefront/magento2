/* istanbul ignore file */
/* eslint-disable camelcase */
import { useCartFactory, UseCartFactoryParams, Context } from '@vue-storefront/core';
import {
  Cart, CartItem, Coupon, Product,
} from '../../types';

const params: UseCartFactoryParams<Cart, CartItem, Product, Coupon> = {
  load: async (context: Context) => {
    const apiState = context.$ma.config.state;
    // is user authenticated.
    if (apiState.getCustomerToken()) {
      try {
        // get cart ID
        const result = await context.$ma.api.customerCart();
        return result.data.customerCart;
      } catch {
        // Signed up user don't have a cart.
        apiState.setCartId(null);
        apiState.setCustomerToken(null);
        return await params.load(context, {});
      }
    }

    // if guest user have a cart ID
    let cartId = apiState.getCartId();

    if (!cartId) {
      const result = await context.$ma.api.createEmptyCart();
      cartId = result.data.createEmptyCart;
      apiState.setCartId(cartId);
    }

    try {
      const cartResponse = await context.$ma.api.cart(cartId);
      // console.log(cartResponse);
      return cartResponse.data.cart;
    } catch {
      apiState.setCartId(null);
      return await params.load(context, {});
    }
  },
  addItem: async (context: Context, { currentCart, product, quantity }) => {
    switch (product.type_id) {
      case 'simple':
        const response = await context.$ma.api.addSimpleProductsToCart({
          cart_id: currentCart.id,
          cart_items: [
            {
              data: {
                quantity,
                sku: product.sku,
              },
            },
          ],
        });
        return response.data.addSimpleProductsToCart.cart;
      case 'configurable':
        const configurableResponse = await context.$ma.api.addConfigurableProductsToCart({
          cart_id: currentCart.id,
          cart_items: [
            {
              parent_sku: product.sku,
              variant_sku: product.variant_sku,
              data: {
                quantity,
                sku: product.variant_sku,
              },
            },
          ],
        });
        return configurableResponse.data.addConfigurableProductsToCart.cart;
      default:
        // todo implement other options
        throw new Error(`Product Type ${product.type_id} not supported in add to cart yet`);
    }
  },
  removeItem: async (context: Context, { currentCart, product }) => {
    const response = await context.$ma.api.removeItemFromCart({
      cart_id: currentCart.id,
      cart_item_id: product.id,
    });
    return response.data.removeItemFromCart.cart;
  },
  updateItemQty: async (context: Context, { currentCart, product, quantity }) => {
    const response = await context.$ma.api.updateCartItems({
      cart_id: currentCart.id,
      cart_items: [
        {
          cart_item_id: product.id,
          quantity,
        },
      ],
    });
    return response.data.updateCartItems.cart;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    context.$ma.config.state.setCartId(null);
    return params.load(context, {});
  },
  applyCoupon: async (context: Context, { currentCart, couponCode }) => {
    const response = await context.$ma.api.applyCouponToCart({
      cart_id: currentCart.id,
      coupon_code: couponCode,
    });

    return { updatedCart: response.data.applyCouponToCart.cart, updatedCoupon: { code: couponCode } };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart }) => {
    const response = await context.$ma.api.removeCouponFromCart({
      cart_id: currentCart.id,
    });

    return { updatedCart: response.data.removeCouponFromCart.cart, updatedCoupon: { code: '' } };
  },
  // @TODO: Check if this is the format.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnCart: (context: Context, { currentCart, product }) => currentCart.items.find((item) => item.id === product.id),
};

export default useCartFactory<Cart, CartItem, Product, Coupon>(params);
