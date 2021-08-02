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
  AddProductsToCartInput,
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

    const createNewCart = async (): Promise<string> => {
      Logger.debug('[Magento Storefront]: useCart.load.createNewCart');

      apiState.setCartId();

      const { data } = await context.$magento.api.createEmptyCart();

      apiState.setCartId(data.createEmptyCart);

      return data.createEmptyCart;
    };

    const generateCart = async (id?: string) => {
      const cartId = await createNewCart();

      return getCartData(id || apiState.getCartId() || cartId);
    };

    const getCartData = async (id?: string) => {
      const fetchData = async (cartId = id) => {
        apiState.setCartId(cartId);
        const cartResponse = await context.$magento.api.cart(cartId);

        Logger.debug(cartResponse);

        return cartResponse.data.cart as unknown as Cart;
      };

      try {
        Logger.debug('[Magento Storefront]: useCart.load.getCartData ID->', id);

        return await fetchData();
      } catch {
        apiState.setCartId();

        const cartId = await createNewCart();

        return await fetchData(cartId);
      }
    };

    if (customerToken) {
      try {
        const result = await context.$magento.api.customerCart();

        return result.data.customerCart as unknown as Cart;
      } catch {
        apiState.setCustomerToken();

        return await generateCart();
      }
    }

    const cartId = apiState.getCartId();

    try {
      if (!cartId) {
        return await generateCart();
      }

      return await getCartData(cartId);
    } catch {
      return generateCart();
    }
  },
  addItem: async (context: Context, {
    product,
    quantity,
    currentCart,
    customQuery,
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
    try {
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      switch (product.__typename) {
        case 'SimpleProduct':
          const simpleCartInput: AddProductsToCartInput = {
            cartId: currentCartId,
            cartItems: [
              {
                quantity,
                sku: product.sku,
              },
            ],
          };

          const simpleProduct = await context.$magento.api.addProductsToCart(simpleCartInput);

          // eslint-disable-next-line consistent-return
          return simpleProduct
            .data
            .addProductsToCart
            .cart as unknown as Cart;

        case 'ConfigurableProduct':
          const cartItems = [
            {
              parent_sku: product.sku,
              data: {
                quantity,
                sku: product.configurable_product_options_selection?.variant?.sku || '',
              },
            },
          ];

          const configurableCartInput: AddConfigurableProductsToCartInput = {
            cart_id: currentCartId,
            cart_items: cartItems,
          };

          const configurableProduct = await context.$magento.api.addConfigurableProductsToCart(configurableCartInput);

          // eslint-disable-next-line consistent-return
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
    } catch {
      await factoryParams.clear(context, null);

      await factoryParams.addItem(context, {
        product,
        quantity,
        currentCart,
        customQuery,
      });
    }
  },
  removeItem: async (context: Context, {
    currentCart,
    product,
  }) => {
    const item = currentCart.items.find((cartItem) => cartItem.uid === product.uid);

    if (!item) {
      return;
    }

    const removeItemParams: RemoveItemFromCartInput = {
      cart_id: currentCart.id,
      cart_item_uid: item.uid,
    };

    const { data } = await context.$magento.api.removeItemFromCart(removeItemParams);

    // eslint-disable-next-line consistent-return
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
          cart_item_uid: product.uid,
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
  clear: async (context: Context, _params = null) => {
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
