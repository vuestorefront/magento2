const getCode = (config) => config.store_code;
const getTitle = (config) => config.default_title;
const getName = (config) => config.store_name;
const getCurrency = (config) => config.default_display_currency_code;
const getLocale = (config) => config.locale.replace('_', '-');
const allowGuestProductReview = (config) => config.allow_guests_to_write_product_reviews;
const enabledWishlist = (config) => config.magento_wishlist_general_is_enabled;
const isSelectedStore = (config) => (store) => config.store_code === store.store_code;

const storeConfigGetters = {
  getCode,
  getTitle,
  getName,
  getCurrency,
  getLocale,
  allowGuestProductReview,
  enabledWishlist,
  isSelectedStore,
};

export default storeConfigGetters;
