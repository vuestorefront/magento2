import { applyCouponToCart } from './applyCouponToCart';
import { removeCouponFromCart } from './removeCouponFromCart';
import { productDetails } from './productDetails';
import { categoryList } from './categoryList';
import { categorySearch } from './categorySearch';
import { productsList } from './products';
import { relatedProducts } from './relatedProducts';
import { upsellProducts } from './upsellProducts';
import { addProductToWishList } from './addProductToWishList';
import { cart } from './cart';
import { setBillingAddressOnCart } from './setBillingAddressOnCart';
import { setShippingAddressesOnCart } from './setShippingAddressesOnCart';
import { addProductsToCart } from './addProductsToCart';
import { setShippingMethodsOnCart } from './setShippingMethodsOnCart';
import { removeItemFromCart } from './removeItemFromCart';

export const customQueries = {
  'apply-coupon-to-cart-custom-query': applyCouponToCart,
  'remove-coupon-from-cart-custom-query': removeCouponFromCart,
  'product-details-custom-query': productDetails,
  'category-list-custom-query': categoryList,
  'category-search-custom-query': categorySearch,
  'products-custom-query': productsList,
  'related-products-custom-query': relatedProducts,
  'upsell-products-custom-query': upsellProducts,
  'add-product-to-wishlist-custom-query': addProductToWishList,
  'cart-custom-query': cart,
  'add-products-to-cart-custom-query': addProductsToCart,
  'set-billing-address-on-cart-custom-query': setBillingAddressOnCart,
  'set-shipping-addresses-on-cart-custom-query': setShippingAddressesOnCart,
  'set-shipping-methods-on-cart-custom-query': setShippingMethodsOnCart,
  'remove-item-from-cart-custom-query': removeItemFromCart
};
