import { currency } from './currency';
import { productReview } from './productReview';
import { productReviewRatingsMetadata } from './productReviewRatingsMetadata';
import { storeConfig } from './storeConfig';
import { availableStores } from './availableStores';
import { countries } from './countries';
import { getAvailableCustomerShippingMethods } from './getAvailableCustomerShippingMethods';
import { removeProductsFromWishlist } from './removeProductsFromWishlist';
import { cmsBlocks } from './cmsBlocks';
import { cmsPage } from './cmsPage';
import { getAvailableShippingMethods } from './getAvailableShippingMethods';
import { reviews } from './reviews';
import { getCustomerAddresses } from './getCustomerAddresses';
import { updateCustomer } from './updateCustomer';
import { updateCustomerEmail } from './updateCustomerEmail';
import { updateCustomerAddress } from './updateCustomerAddress';
import { changeCustomerPassword } from './changeCustomerPassword';
import { customerCart } from './customerCart';
import { createCustomerAddress } from './createCustomerAddress';
import { createCustomer } from './createCustomer';
import { customer } from './customer';
import { mergeCarts } from './mergeCarts';
import { applyCouponToCart } from './applyCouponToCart';
import { removeCouponFromCart } from './removeCouponFromCart';
import { productDetails } from './productDetails';
import { categoryList } from './categoryList';
import { categories } from './categories';
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
import { generateCustomerToken } from './generateCustomerToken';
import { route } from './route';
import { addConfigurableProductsToCart } from './addConfigurableProductsToCart';
import { addBundleProductsToCart } from './addBundleProductsToCart';

export const customQueries = {
  'apply-coupon-to-cart-custom-query': applyCouponToCart,
  'remove-coupon-from-cart-custom-query': removeCouponFromCart,
  'product-details-custom-query': productDetails,
  'category-list-custom-query': categoryList,
  'categories-custom-query': categories,
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
  'customer-cart-custom-query': customerCart,
  'get-customer-addresses-custom-query': getCustomerAddresses,
  'update-customer-custom-query': updateCustomer,
  'create-customer-address-custom-query': createCustomerAddress,
  'update-customer-email-custom-query': updateCustomerEmail,
  'customer-product-review-custom-query': reviews,
  'update-customer-address-custom-query': updateCustomerAddress,
  'remove-products-from-wishlist-custom-query': removeProductsFromWishlist,
  'cms-blocks-custom-query': cmsBlocks,
  'cms-page-custom-query': cmsPage,
  'get-available-shipping-methods-custom-query': getAvailableShippingMethods,
  'get-available-customer-shipping-methods-custom-query': getAvailableCustomerShippingMethods,
  'available-stores-custom-query': availableStores,
  'countries-custom-query': countries,
  'currency-custom-query': currency,
  'product-review-custom-query': productReview,
  'product-review-ratings-metadata-custom-query': productReviewRatingsMetadata,
  'store-config-custom-query': storeConfig,
  'route-custom-query': route,
  'generate-customer-token-custom-query': generateCustomerToken,
  'add-configurable-products-to-cart-custom-query': addConfigurableProductsToCart,
  'add-bundle-products-to-cart-custom-query': addBundleProductsToCart,
};
