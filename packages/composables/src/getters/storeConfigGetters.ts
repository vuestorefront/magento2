const getCode = (config) => config.store_code;
const getTitle = (config) => config.default_title;
const getName = (config) => config.store_name;
const getCurrency = (config) => config.default_display_currency_code;
const getLocale = (config) => config.locale;
const allowGuestProductReview = (config) => config.allow_guests_to_write_product_reviews;
const enabledWishlist = (config) => config.magento_wishlist_general_is_enabled;

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
