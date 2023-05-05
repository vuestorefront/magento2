import { changeCustomerPassword } from './changeCustomerPassword';
import { customerCart } from './customerCart';
import { createCustomer } from './createCustomer';
import { customer } from './customer';
import { mergeCarts } from './mergeCarts';
import { applyCouponToCart } from './applyCouponToCart';
import { removeCouponFromCart } from './removeCouponFromCart';
import { productDetails } from './productDetails';
import { categoryList } from './categoryList';
import { categorySearch } from './categorySearch';
import { productsList } from './products';
import { relatedProducts } from './relatedProducts';
import { removeItemFromCart } from './removeItemFromCart';
import { upsellProducts } from './upsellProducts';
import { addProductToWishList } from './addProductToWishList';
import { cart } from './cart';
import { setBillingAddressOnCart } from './setBillingAddressOnCart';
import { setShippingAddressesOnCart } from './setShippingAddressesOnCart';
import { addProductsToCart } from './addProductsToCart';
import { setShippingMethodsOnCart } from './setShippingMethodsOnCart';
import { setPaymentMethodOnCart } from './setPaymentMethodOnCart';
import { updateCartItems } from './updateCartItems';

export const customQueries = {
  'apply-coupon-to-cart-custom-query': applyCouponToCart,
  'remove-coupon-from-cart-custom-query': removeCouponFromCart,
  'product-details-custom-query': productDetails,
  'category-list-custom-query': categoryList,
  'category-search-custom-query': categorySearch,
  'products-custom-query': productsList,
  'related-products-custom-query': relatedProducts,
  'remove-item-from-cart-custom-query': removeItemFromCart,
  'upsell-products-custom-query': upsellProducts,
  'update-cart-items-custom-query': updateCartItems,
  'add-product-to-wishlist-custom-query': addProductToWishList,
  'cart-custom-query': cart,
  'add-products-to-cart-custom-query': addProductsToCart,
  'set-billing-address-on-cart-custom-query': setBillingAddressOnCart,
  'set-shipping-addresses-on-cart-custom-query': setShippingAddressesOnCart,
  'set-shipping-methods-on-cart-custom-query': setShippingMethodsOnCart,
  'set-payment-method-on-cart-custom-query': setPaymentMethodOnCart,
  'merge-carts-custom-query': mergeCarts,
  'create-customer-custom-query': createCustomer,
  'customer-custom-query': customer,
  'change-customer-password-custom-query': changeCustomerPassword,
  'customer-cart-custom-query': customerCart
};
