import { VsfContext } from '~/composables/context';
import { Logger } from '~/helpers/logger';
import {
  AddConfigurableProductsToCartInput,
  AddDownloadableProductsToCartInput,
  AddVirtualProductsToCartInput,
  Cart,
  CartItemInput,
} from '~/modules/GraphQL/types';

/** Params object used to add items to a cart */
export declare type AddProductsToCartInput = {
  cartId: string;
  cartItems: CartItemInput[];
};

export const addItemCommand = {
  execute: async (
    context: VsfContext,
    {
      product,
      quantity,
      currentCart,
    },
  ) => {
    Logger.debug('[Magento]: Add item to cart', {
      product,
      quantity,
      currentCart,
    });

    const apiState = context.$magento.config.state;
    const currentCartId = apiState.getCartId();

    if (!product) {
      return;
    }
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
        // eslint-disable-next-line no-underscore-dangle
        throw new Error(`Product Type ${product.__typename} not supported in add to cart yet`);
    }
  },
};
