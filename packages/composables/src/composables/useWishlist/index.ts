/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/require-await */
/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams,
} from '@vue-storefront/core';
import {
  Wishlist,
  WishlistProduct,
  WishlistQueryVariables,
  WishlistItemInput,
} from '@vue-storefront/magento-api';
import useUser from '../useUser';

// @ts-ignore
const factoryParams: UseWishlistFactoryParams<Wishlist, WishlistProduct, WishlistItemInput> = {
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
    if (!context.user.isAuthenticated.value) {
      throw new Error('Need to be authenticated to add a product to wishlist');
    }
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    switch (params.product.__typename) {
      case 'SimpleProduct':
        const { data } = await context.$magento.api.addProductToWishList({
          id: '0',
          items: [{
            sku: params.product.sku,
            quantity: 1,
          }],
        });

        return data.addProductsToWishlist.wishlist;
      case 'ConfigurableProduct':
      default:
        // todo implement other options
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        throw new Error(`Product Type ${product.__typename} not supported in add to wishlist yet`);
    }
  },
  removeItem: async ({ currentWishlist, product }) => ({}),
  clear: async ({ currentWishlist }) => ({}),
  isInWishlist: ({ currentWishlist }) => false,
};

export default useWishlistFactory<Wishlist, WishlistProduct, WishlistItemInput>(factoryParams);
