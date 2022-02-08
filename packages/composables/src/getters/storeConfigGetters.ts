import { StoreConfig } from '@vue-storefront/magento-api';

const getCode = (config: StoreConfig) => config.store_code;
const getTitle = (config: StoreConfig) => config.default_title;
const getName = (config: StoreConfig) => config.store_name;
const getCurrency = (config: StoreConfig) => config.default_display_currency_code;
const getLocale = (config: StoreConfig) => config.locale;
const allowGuestProductReview = (config: StoreConfig) => config.allow_guests_to_write_product_reviews;
const enabledWishlist = (config: StoreConfig) => config.magento_wishlist_general_is_enabled;

const storeConfigGetters = {
  getCode,
  getTitle,
  getName,
  getCurrency,
  getLocale,
  allowGuestProductReview,
  enabledWishlist,
};

export default storeConfigGetters;
