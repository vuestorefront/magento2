/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/require-await */
/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams,
} from '@vue-storefront/core';
import {
  Wishlist,
  WishlistQueryVariables,
} from '@vue-storefront/magento-api';
import useUser from '../useUser';

const compareWishlistProduct = (
  productA,
  productB,
): boolean => {
  const equalSku = productA?.sku === productB?.sku;
  const equalUid = productA?.uid === productB?.uid;

  return equalSku && equalUid;
};

const findItemOnWishlist = (currentWishlist, product) => {
  const wishlist = Array.isArray(currentWishlist) ? currentWishlist[0] : currentWishlist;

  return wishlist
    ?.items_v2
    ?.items?.find((item) => compareWishlistProduct(item.product, product));
};

// @ts-ignore
const factoryParams: UseWishlistFactoryParams<Wishlist, any, any> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  // @ts-ignore
  load: async (context: Context, params) => {
    const apiState = context.$magento.config.state;

    if (apiState.getCustomerToken()) {
      const wishlistParams: WishlistQueryVariables = {
        ...(params.customQuery || {}),
      };
      const { data } = await context.$magento.api.wishlist(wishlistParams);

      return data.customer.wishlists;
    }

    return [];
  },
  addItem: async (context, params) => {
    const {
      currentWishlist,
      product,
    } = params;

    if (!currentWishlist) await factoryParams.load(context, {});

    const itemOnWishlist = findItemOnWishlist(currentWishlist, params.product);

    if (itemOnWishlist) {
      return factoryParams.removeItem(context, {
        product,
        currentWishlist,
      });
    }

    if (!context.user.isAuthenticated.value) {
      throw new Error('Need to be authenticated to add a product to wishlist');
    }
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    switch (product.__typename) {
      case 'SimpleProduct':
        const { data } = await context.$magento.api.addProductToWishList({
          id: '0',
          items: [{
            sku: product.sku,
            quantity: 1,
          }],
        });

        return data.addProductsToWishlist.wishlist;
      case 'ConfigurableProduct':
        const { data: configurableProductData } = await context.$magento.api.addProductToWishList({
          id: '0',
          items: [{
            sku: product.configurable_product_options_selection.variant.sku,
            quantity: 1,
            parent_sku: product.sku,
          }],
        });

        return configurableProductData.addProductsToWishlist.wishlist;
      default:
        // todo implement other options
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        throw new Error(`Product Type ${product.__typename} not supported in add to wishlist yet`);
    }
  },
  removeItem: async (context, params) => {
    const { product, currentWishlist } = params;

    const itemOnWishlist = findItemOnWishlist(currentWishlist, params.product);

    const { data } = await context.$magento.api.removeProductsFromWishlist({
      id: '0',
      items: [itemOnWishlist.id],
    });

    return data.removeProductsFromWishlist.wishlist;
  },
  clear: async ({ currentWishlist }) => ({}),
  isInWishlist: (context, params) => {
    const {
      currentWishlist,
      product,
    } = params;
    return !!findItemOnWishlist(currentWishlist, product);
  },
};

export default useWishlistFactory<Wishlist, any, any>(factoryParams);
