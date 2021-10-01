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
  Product,
  RemoveItemFromCartInput,
  UpdateCartItemsInput,
} from '@vue-storefront/magento-api';

const factoryParams: UseCartFactoryParams<Cart, CartItem, Product> = {
  load: async (context: Context) => {
    const apiState = context.$magento.config.state;
    Logger.debug('[Magento Storefront]: Loading Cart');
    const customerToken = apiState.getCustomerToken();

    const createNewCart = async (): Promise<string> => {
      Logger.debug('[Magento Storefront]: useCart.load.createNewCart');

      apiState.setCartId();

      const { data } = await context.$magento.api.createEmptyCart();

      Logger.debug('[Result]:', JSON.stringify(data, null, 2));

      apiState.setCartId(data.createEmptyCart);

      return data.createEmptyCart;
    };

    const getCartData = async (id?: string) => {
      const fetchData = async (cartId = id) => {
        apiState.setCartId(cartId);
        const cartResponse = await context.$magento.api.cart(cartId);

        Logger.debug('[Result]:', JSON.stringify(cartResponse, null, 2));

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

    const generateCart = async (id?: string) => {
      const cartId = await createNewCart();

      return getCartData(id || apiState.getCartId() || cartId);
    };

    if (customerToken) {
      try {
        const result = await context.$magento.api.customerCart();
        apiState.setCartId(result.data.customerCart.id);

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
    Logger.debug('[Magento]: Add item to cart', { product, quantity, currentCart });

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

          Logger.debug('[Result]:', JSON.stringify(simpleProduct, null, 2));

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

          Logger.debug('[Result]:', JSON.stringify(configurableProduct, null, 2));

          // eslint-disable-next-line consistent-return
          return configurableProduct
            .data
            .addConfigurableProductsToCart
            .cart as unknown as Cart;
        case 'BundleProduct':
          const bundleCartInput: AddProductsToCartInput = {
            cartId: currentCartId,
            cartItems: [
              {
                quantity,
                sku: product.sku,
                entered_options: [
                  // @ts-ignore
                  ...product.bundle_options,
                ],
              },
            ],
          };

          const bundleProduct = await context.$magento.api.addProductsToCart(bundleCartInput);

          Logger.debug('[Result]:', JSON.stringify(bundleProduct, null, 2));

          // eslint-disable-next-line consistent-return
          return bundleProduct
            .data
            .addProductsToCart
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
    Logger.debug('[Magento]: Remove item from cart', { product, currentCart });

    const item = currentCart.items.find((cartItem) => cartItem.uid === product.uid);

    if (!item) {
      return;
    }

    const removeItemParams: RemoveItemFromCartInput = {
      cart_id: currentCart.id,
      cart_item_uid: item.uid,
    };

    const { data } = await context.$magento.api.removeItemFromCart(removeItemParams);

    Logger.debug('[Result]:', JSON.stringify(data, null, 2));

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
    Logger.debug('[Magento]: Update product quantity on cart', { product, quantity, currentCart });

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

    Logger.debug('[Result]:', JSON.stringify(data, null, 2));

    return data
      .updateCartItems
      .cart as unknown as Cart;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: (context: Context, _params = null) => {
    context.$magento.config.state.setCartId(null);

    return factoryParams.load(context, {});
  },
  applyCoupon: async (context: Context, {
    currentCart,
    couponCode,
  }) => {
    Logger.debug('[Magento]: Apply coupon on cart', { couponCode, currentCart });

    const { data } = await context.$magento.api.applyCouponToCart({
      cart_id: currentCart.id,
      coupon_code: couponCode,
    });

    Logger.debug('[Result]:', JSON.stringify(data, null, 2));

    return {
      updatedCart: data.applyCouponToCart.cart as unknown as Cart,
      updatedCoupon: { code: couponCode },
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart }) => {
    Logger.debug('[Magento]: Remove coupon from cart', { currentCart });

    const { data } = await context.$magento.api.removeCouponFromCart({
      cart_id: currentCart.id,
    });

    Logger.debug('[Result]:', JSON.stringify(data, null, 2));

    return {
      updatedCart: data.removeCouponFromCart.cart as unknown as Cart,
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

export default useCartFactory<Cart, CartItem, Product>(factoryParams);
