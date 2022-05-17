/**
 * @deprecated since version 1.0.0
 */
import {
  ComposableFunctionArgs,
  Context,
  Logger,
} from '@vue-storefront/core';
import {
  AddConfigurableProductsToCartInput,
  AddDownloadableProductsToCartInput,
  AddVirtualProductsToCartInput,
  AddProductsToCartInput,
  Cart,
  CartItem,
  Product,
  RemoveItemFromCartInput,
  UpdateCartItemsInput,
} from '@vue-storefront/magento-api';
import {
  UseCartFactoryParams,
  useCartFactory,
} from '../../factories/useCartFactory';

const factoryParams: UseCartFactoryParams<Cart, CartItem, Product> = {
  load: async (context: Context, params: ComposableFunctionArgs<{
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

  addItem: async (context: Context, {
    product,
    quantity,
    currentCart,
    customQuery,
  }) => {
    Logger.debug('[Magento]: Add item to cart', {
      product,
      quantity,
      currentCart,
    });

    const apiState = context.$magento.config.state;
    let currentCartId = apiState.getCartId();
    if (!currentCartId) {
      await factoryParams.load(context, {
        realCart: true,
      });

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

          Logger.debug('[Result]:', { data: simpleProduct });

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

          Logger.debug('[Result]:', { data: configurableProduct });

          // eslint-disable-next-line consistent-return
          return configurableProduct
            .data
            .addConfigurableProductsToCart
            .cart as unknown as Cart;
        case 'BundleProduct':
          const createEnteredOptions = () =>
            // @ts-ignore
            // eslint-disable-next-line implicit-arrow-linebreak
            product.bundle_options.map((bundleOption) => ({
              ...bundleOption,
              value: bundleOption.value.toString(),
            }));

          const bundleCartInput: AddProductsToCartInput = {
            cartId: currentCartId,
            cartItems: [
              {
                quantity,
                sku: product.sku,
                entered_options: createEnteredOptions(),
              },
            ],
          };

          const bundleProduct = await context.$magento.api.addProductsToCart(bundleCartInput);

          Logger.debug('[Result]:', { data: bundleProduct });

          // eslint-disable-next-line consistent-return
          return bundleProduct
            .data
            .addProductsToCart
            .cart as unknown as Cart;
        case 'DownloadableProduct':
          const downloadableCartItems = [
            {
              data: {
                quantity,
                sku: product.sku,
              },
              downloadable_product_links: product.downloadable_product_links.map((dpl) => ({ link_id: dpl.id })),
            },
          ];

          const downloadableCartInput: AddDownloadableProductsToCartInput = {
            cart_id: currentCartId,
            cart_items: downloadableCartItems,
          };

          const downloadableProduct = await context.$magento.api.addDownloadableProductsToCart(downloadableCartInput);

          Logger.debug('[Result DownloadableProduct]:', { data: downloadableProduct });

          // eslint-disable-next-line consistent-return
          return downloadableProduct
            .data
            .addDownloadableProductsToCart
            .cart as unknown as Cart;
        case 'VirtualProduct':
          const virtualCartInput: AddVirtualProductsToCartInput = {
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
          const virtualProduct = await context.$magento.api.addVirtualProductsToCart(virtualCartInput);

          Logger.debug('[Result VirtualProduct]:', { data: virtualProduct });

          // eslint-disable-next-line consistent-return
          return virtualProduct
            .data
            .addVirtualProductsToCart
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

    const { data } = await context.$magento.api.removeItemFromCart(removeItemParams);

    Logger.debug('[Result]:', { data });

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

    try {
      const { data } = await context.$magento.api.updateCartItems(updateCartParams);

      Logger.debug('[Result]:', { data });

      return data
        .updateCartItems
        .cart as unknown as Cart;
    } catch {
      // If we can't change quantity, the card could be expired on Magento side, try to reload
      return await factoryParams.load(context, {
        realCart: true,
      });
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, _params = null) => {
    context.$magento.config.state.setCartId();

    return factoryParams.load(context, {});
  },
  applyCoupon: async (context: Context, {
    currentCart,
    couponCode,
  }) => {
    Logger.debug('[Magento]: Apply coupon on cart', {
      couponCode,
      currentCart,
    });

    const { data } = await context.$magento.api.applyCouponToCart({
      cart_id: currentCart.id,
      coupon_code: couponCode,
    });

    Logger.debug('[Result]:', { data });

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

    Logger.debug('[Result]:', { data });

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
  ) => !!currentCart?.items.find((cartItem) => cartItem?.product?.uid === product.uid),
  loadTotalQty: async (context: Context) => {
    const apiState = context.$magento.config.state;
    if (apiState.getCartId()) {
      const { data } : any = await context.$magento.api.cartTotalQty(apiState.getCartId());

      return data?.cart?.total_quantity ?? 0;
    }

    return 0;
  },
};

export default useCartFactory<Cart, CartItem, Product>(factoryParams);
