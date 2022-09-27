import { VsfContext } from '~/composables/context';
import { Logger } from '~/helpers/logger';
import {
  Cart,
  CartItemInput,
} from '~/modules/GraphQL/types';
import { CustomQuery, CustomHeaders } from '~/types/core';

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
      productConfiguration,
      customQuery,
      customHeaders,
    },
  ) => {
    Logger.debug('[Magento]: Add item to cart', {
      product,
      quantity,
      currentCart,
    });

    const apiState = context.$magento.config.state;
    const cartId = apiState.getCartId();

    if (!product) {
      return;
    }
    // eslint-disable-next-line no-underscore-dangle
    switch (product.__typename) {
      case 'SimpleProduct':
        const simpleCartInput: AddProductsToCartInput = {
          cartId,
          cartItems: [
            {
              quantity,
              sku: product.sku,
            },
          ],
        };

        const simpleProduct = await context.$magento.api.addProductsToCart(
          simpleCartInput,
          customQuery as CustomQuery,
          customHeaders as CustomHeaders,
        );

        Logger.debug('[Result]:', { data: simpleProduct.data });

        if (simpleProduct.data.addProductsToCart.user_errors.length > 0) {
          throw new Error(String(simpleProduct.data.addProductsToCart.user_errors[0].message));
        }

        // eslint-disable-next-line consistent-return
        return simpleProduct
          .data
          .addProductsToCart
          .cart as unknown as Cart;
      case 'ConfigurableProduct':
        const selectedOptions = Object.values(productConfiguration as object);

        const configurableCartInput: AddProductsToCartInput = {
          cartId,
          cartItems: [
            {
              quantity,
              sku: product.sku,
              selected_options: selectedOptions,
            },
          ],
        };

        const configurableProduct = await context.$magento.api.addProductsToCart(
          configurableCartInput,
          customQuery as CustomQuery,
          customHeaders as CustomHeaders,
        );
        Logger.debug('[Result]:', { data: configurableProduct.data });

        if (configurableProduct.data.addProductsToCart.user_errors.length > 0) {
          throw new Error(String(configurableProduct.data.addProductsToCart.user_errors[0].message));
        }

        // eslint-disable-next-line consistent-return
        return configurableProduct.data
          .addProductsToCart
          .cart as unknown as Cart;
      case 'BundleProduct':
        const createEnteredOptions = () =>
        // eslint-disable-next-line implicit-arrow-linebreak
          product.bundle_options.map((bundleOption) => ({
            ...bundleOption,
            value: bundleOption.value.toString(),
          }));

        const bundleCartInput: AddProductsToCartInput = {
          cartId,
          cartItems: [
            {
              quantity,
              sku: product.sku,
              entered_options: createEnteredOptions(),
            },
          ],
        };

        const bundleProduct = await context.$magento.api.addProductsToCart(
          bundleCartInput,
          customQuery as CustomQuery,
          customHeaders as CustomHeaders,
        );

        Logger.debug('[Result]:', { data: bundleProduct });

        if (bundleProduct.data.addProductsToCart.user_errors.length > 0) {
          throw new Error(String(bundleProduct.data.addProductsToCart.user_errors[0].message));
        }

        // eslint-disable-next-line consistent-return
        return bundleProduct
          .data
          .addProductsToCart
          .cart as unknown as Cart;
      case 'DownloadableProduct':
        const downloadableCartInput: AddProductsToCartInput = {
          cartId,
          cartItems: [
            {
              quantity,
              sku: product.sku,
            },
          ],
        };

        const downloadableProduct = await context.$magento.api.addProductsToCart(
          downloadableCartInput,
          customQuery as CustomQuery,
          customHeaders as CustomHeaders,
        );

        Logger.debug('[Result DownloadableProduct]:', { data: downloadableProduct });

        if (downloadableProduct.data.addProductsToCart.user_errors.length > 0) {
          throw new Error(String(downloadableProduct.data.addProductsToCart.user_errors[0].message));
        }

        // eslint-disable-next-line consistent-return
        return downloadableProduct
          .data
          .addProductsToCart
          .cart as unknown as Cart;
      case 'VirtualProduct':
        const virtualCartInput: AddProductsToCartInput = {
          cartId,
          cartItems: [
            {
              quantity,
              sku: product.sku,
            },
          ],
        };
        const virtualProduct = await context.$magento.api.addProductsToCart(
          virtualCartInput,
          customQuery as CustomQuery,
          customHeaders as CustomHeaders,
        );

        Logger.debug('[Result VirtualProduct]:', { data: virtualProduct });

        if (virtualProduct.data.addProductsToCart.user_errors.length > 0) {
          throw new Error(String(virtualProduct.data.addProductsToCart.user_errors[0].message));
        }

        // eslint-disable-next-line consistent-return
        return virtualProduct
          .data
          .addProductsToCart
          .cart as unknown as Cart;
      case 'GroupedProduct':
        const groupedCartInput: AddProductsToCartInput = {
          cartId,
          cartItems: product.items.map((item) => ({
            quantity,
            sku: item.product.sku,
          })),
        };

        const groupedProduct = await context.$magento.api.addProductsToCart(groupedCartInput, customQuery as CustomQuery);

        Logger.debug('[Result GroupedProduct]:', { data: groupedProduct });

        if (groupedProduct.data.addProductsToCart.user_errors.length > 0) {
          throw new Error(String(groupedProduct.data.addProductsToCart.user_errors[0].message));
        }

        // eslint-disable-next-line consistent-return
        return groupedProduct
          .data
          .addProductsToCart
          .cart as unknown as Cart;
      default:
        // eslint-disable-next-line no-underscore-dangle
        throw new Error(`Product Type ${product.__typename} not supported in add to cart yet`);
    }
  },
};
