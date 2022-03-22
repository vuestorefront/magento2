import { StoreConfig } from '~/modules/GraphQL/types';

const getCode = (config: StoreConfig) => config.store_code;
const getTitle = (config: StoreConfig) => config.default_title;
const getName = (config: StoreConfig) => config.store_name;
const getCurrency = (config: StoreConfig) => config.default_display_currency_code;
const getLocale = (config: StoreConfig) => config.locale;
const allowGuestProductReview = (config: StoreConfig) => config.allow_guests_to_write_product_reviews;
const enabledWishlist = (config: StoreConfig) => config.magento_wishlist_general_is_enabled;
const getBaseMediaUrl = (config: StoreConfig) => config.base_media_url;
const getLogoSrc = (config: StoreConfig) => config.header_logo_src;
const getLogoWidth = (config: StoreConfig) => config.logo_width;
const getLogoHeight = (config: StoreConfig) => config.logo_height;
const getLogoAlt = (config: StoreConfig) => config.logo_alt;

const storeConfigGetters = {
  getCode,
  getTitle,
  getName,
  getCurrency,
  getLocale,
  allowGuestProductReview,
  enabledWishlist,
  getBaseMediaUrl,
  getLogoSrc,
  getLogoWidth,
  getLogoHeight,
  getLogoAlt,
};

export default storeConfigGetters;
