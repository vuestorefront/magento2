import exp from "constants";

export type categoryList = [CategoryTree]

export type CategoryFilterInput = {
  ids?: FilterEqualTypeInput
  name?: FilterMatchTypeInput
  url_key?: FilterEqualTypeInput
}

type FilterEqualTypeInput = {
  eq: string
  in: [string]
}

type FilterMatchTypeInput = {
  match: string
}

type FilterRangeTypeInput = {
  from: string,
  to: string
}

export interface CategoryTree extends CategoryInterface {
  children: [CategoryTree]
}

export type CategoryInterface = {
  available_sort_by: [string]
  breadcrumbs: [Breadcrumb]
  canonical_url: string
  children_count: string
  cms_block: CmsBlock
  created_at: string
  custom_layout_update_file: string
  default_sort_by: string
  description: string
  display_mode: string
  filter_price_range: number
  id: number
  image: string
  include_in_menu: number
  is_anchor: boolean
  landing_page: number
  level: number
  meta_description: string
  meta_keywords: string
  meta_title: string
  name: string
  path: string
  path_in_store: string
  position: number
  product_count: number
  products: CategoryProducts
  updated_at: string
  url_key: string
  url_path: string
  url_suffix: string
}

export type CategoryProducts = {
  items: [ProductInterface]
  page_info: SearchResultPageInfo
  total_count: number
}

export type ProductInterface = {
  activity: string
  attribute_set_id: number
  canonical_url: string
  categories: [CategoryInterface]
  category_gear: string
  climate: string
  collar: string
  color: number
  country_of_manufacture: string
  created_at: string
  crosssell_products: [ProductInterface]
  description: ComplexTextValue
  eco_collection: number
  erin_recommends: number
  features_bags: string
  format: number
  gender: string
  gift_message_available: string
  id: number
  image: ProductImage
  manufacturer: number
  material: string
  media_gallery: [MediaGalleryInterface]
  meta_description: string
  meta_keyword: string
  meta_title: string
  name: string
  new: number
  new_from_date: string
  new_to_date: string
  only_x_left_in_stock: number
  options_container: string
  pattern: string
  performance_fabric: number
  price_range: PriceRange
  price_tiers: [TierPrice]
  product_links: [ProductLinksInterface]
  related_products: [ProductInterface]
  sale: number
  short_description: ComplexTextValue
  size: number
  sku: string
  sleeve: string
  small_image: ProductImage
  special_from_date: string
  special_price: number
  special_to_date: string
  stock_status: ProductStockStatus
  strap_bags: string
  style_bags: string
  style_bottom: string
  style_general: string
  swatch_image: string
  thumbnail: ProductImage
  updated_at: string
  upsell_products: [ProductInterface]
  url_key: string
  url_rewrites: [UrlRewrite]
  url_suffix: string
}

export type ProductLinksInterface = {
  link_type: string
  linked_product_sku: string
  linked_product_type: string
  position: number
  sku: string
}

export type ProductLinks = ProductLinksInterface

export enum ProductStockStatus {
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK'
}

export type MediaGalleryInterface = {
  label: string
  url: string
}

export type ProductImage = MediaGalleryInterface

export type ProductPrice = {
  discount?: ProductDiscount
  final_price: Money
  fixed_product_taxes?: [FixedProductTax]
  regular_price: Money
}

export type TierPrice = {
  discount: ProductDiscount
  final_price: Money
  quantity: number
}

export type ProductDiscount = {
  amount_off?: number
  percent_off?: number
}

export type PriceRange = {
  maximum_price?: ProductPrice
  minimum_price: ProductPrice
}

export type FixedProductTax = {
  amount?: Money
  label?: string
}

export type Money = {
  currency: CurrencyEnum
  value: number
}

enum CurrencyEnum {
  AFN = 'AFN',
  ALL = 'ALL',
  AZN = 'AZN',
  DZD = 'DZD',
  AOA = 'AOA',
  ARS = 'ARS',
  AMD = 'AMD',
  AWG = 'AWG',
  AUD = 'AUD',
  BSD = 'BSD',
  BHD = 'BHD',
  BDT = 'BDT',
  BBD = 'BBD',
  BYR = 'BYR',
  BZD = 'BZD',
  BMD = 'BMD',
  BTN = 'BTN',
  BOB = 'BOB',
  BAM = 'BAM',
  BWP = 'BWP',
  BRL = 'BRL',
  GBP = 'GBP',
  BND = 'BND',
  BGN = 'BGN',
  BUK = 'BUK',
  BIF = 'BIF',
  KHR = 'KHR',
  CAD = 'CAD',
  CVE = 'CVE',
  CZK = 'CZK',
  KYD = 'KYD',
  GQE = 'GQE',
  CLP = 'CLP',
  CNY = 'CNY',
  COP = 'COP',
  KMF = 'KMF',
  CDF = 'CDF',
  CRC = 'CRC',
  HRK = 'HRK',
  CUP = 'CUP',
  DKK = 'DKK',
  DJF = 'DJF',
  DOP = 'DOP',
  XCD = 'XCD',
  EGP = 'EGP',
  SVC = 'SVC',
  ERN = 'ERN',
  EEK = 'EEK',
  ETB = 'ETB',
  EUR = 'EUR',
  FKP = 'FKP',
  FJD = 'FJD',
  GMD = 'GMD',
  GEK = 'GEK',
  GEL = 'GEL',
  GHS = 'GHS',
  GIP = 'GIP',
  GTQ = 'GTQ',
  GNF = 'GNF',
  GYD = 'GYD',
  HTG = 'HTG',
  HNL = 'HNL',
  HKD = 'HKD',
  HUF = 'HUF',
  ISK = 'ISK',
  INR = 'INR',
  IDR = 'IDR',
  IRR = 'IRR',
  IQD = 'IQD',
  ILS = 'ILS',
  JMD = 'JMD',
  JPY = 'JPY',
  JOD = 'JOD',
  KZT = 'KZT',
  KES = 'KES',
  KWD = 'KWD',
  KGS = 'KGS',
  LAK = 'LAK',
  LVL = 'LVL',
  LBP = 'LBP',
  LSL = 'LSL',
  LRD = 'LRD',
  LYD = 'LYD',
  LTL = 'LTL',
  MOP = 'MOP',
  MKD = 'MKD',
  MGA = 'MGA',
  MWK = 'MWK',
  MYR = 'MYR',
  MVR = 'MVR',
  LSM = 'LSM',
  MRO = 'MRO',
  MUR = 'MUR',
  MXN = 'MXN',
  MDL = 'MDL',
  MNT = 'MNT',
  MAD = 'MAD',
  MZN = 'MZN',
  MMK = 'MMK',
  NAD = 'NAD',
  NPR = 'NPR',
  ANG = 'ANG',
  YTL = 'YTL',
  NZD = 'NZD',
  NIC = 'NIC',
  NGN = 'NGN',
  KPW = 'KPW',
  NOK = 'NOK',
  OMR = 'OMR',
  PKR = 'PKR',
  PAB = 'PAB',
  PGK = 'PGK',
  PYG = 'PYG',
  PEN = 'PEN',
  PHP = 'PHP',
  PLN = 'PLN',
  QAR = 'QAR',
  RHD = 'RHD',
  RON = 'RON',
  RUB = 'RUB',
  RWF = 'RWF',
  SHP = 'SHP',
  STD = 'STD',
  SAR = 'SAR',
  RSD = 'RSD',
  SCR = 'SCR',
  SLL = 'SLL',
  SGD = 'SGD',
  SKK = 'SKK',
  SBD = 'SBD',
  SOS = 'SOS',
  ZAR = 'ZAR',
  KRW = 'KRW',
  LKR = 'LKR',
  SDG = 'SDG',
  SRD = 'SRD',
  SZL = 'SZL',
  SEK = 'SEK',
  CHF = 'CHF',
  SYP = 'SYP',
  TWD = 'TWD',
  TJS = 'TJS',
  TZS = 'TZS',
  THB = 'THB',
  TOP = 'TOP',
  TTD = 'TTD',
  TND = 'TND',
  TMM = 'TMM',
  USD = 'USD',
  UGX = 'UGX',
  UAH = 'UAH',
  AED = 'AED',
  UYU = 'UYU',
  UZS = 'UZS',
  VUV = 'VUV',
  VEB = 'VEB',
  VEF = 'VEF',
  VND = 'VND',
  CHE = 'CHE',
  CHW = 'CHW',
  XOF = 'XOF',
  WST = 'WST',
  YER = 'YER',
  ZMK = 'ZMK',
  ZWD = 'ZWD',
  TRY = 'TRY',
  AZM = 'AZM',
  ROL = 'ROL',
  TRL = 'TRL',
  XPF = 'XPF'
}

export type Breadcrumb = {
  category_id: number
  category_level: number
  category_name: string
  category_url_key: string
  category_url_path: string
}

export type CmsBlock = {
  content: string
  identifier: string
  title: string
}

export type ComplexTextValue = {
  html: string
}

export type UrlRewrite = {
  parameters: [HttpQueryParameter]
  url: string
}

export type HttpQueryParameter = {
  name: string
  value: string
}

export type SearchResultPageInfo = {
  current_page: number
  page_size: number
  total_pages: number
}

export type urlResolver = EntityUrl;

export type EntityUrl = {
  id: number
  redirectCode: number
  relative_url: string
  type: UrlRewriteEntityTypeEnum
}

enum UrlRewriteEntityTypeEnum {
  CMS_PAGE = 'CMS_PAGE',
  PRODUCT = 'PRODUCT',
  CATEGORY = 'CATEGORY'
}

export type Products = {
  aggregations: [Aggregation]
  items: [ProductInterface]
  page_info: SearchResultPageInfo
  sort_fields: SortFields
  total_count: number
}

export type Aggregation = {
  attribute_code: string
  count: number
  label: string
  options: [AggregationOption]
}

export type AggregationOption = {
  count: number
  label: string
  value: string
}

export type SortFields = {
  default: string
  options: [SortField]
}

export type SortField = {
  label: string
  value: string
}

export type ProductAttributeFilterInput = {
  activity: FilterEqualTypeInput
  category_gear: FilterEqualTypeInput
  category_id: FilterEqualTypeInput
  climate: FilterEqualTypeInput
  collar: FilterEqualTypeInput
  color: FilterEqualTypeInput
  description: FilterMatchTypeInput
  eco_collection: FilterEqualTypeInput
  erin_recommends: FilterEqualTypeInput
  features_bags: FilterEqualTypeInput
  format: FilterEqualTypeInput
  gender: FilterEqualTypeInput
  material: FilterEqualTypeInput
  name: FilterMatchTypeInput
  new: FilterEqualTypeInput
  pattern: FilterEqualTypeInput
  performance_fabric: FilterEqualTypeInput
  price: FilterRangeTypeInput
  sale: FilterEqualTypeInput
  short_description: FilterMatchTypeInput
  size: FilterEqualTypeInput
  sku: FilterEqualTypeInput
  sleeve: FilterEqualTypeInput
  strap_bags: FilterEqualTypeInput
  style_bags: FilterEqualTypeInput
  style_bottom: FilterEqualTypeInput
  style_general: FilterEqualTypeInput
  url_key: FilterEqualTypeInput
}

export type ProductAttributeSortInput = {
  name: SortEnum
  position: SortEnum
  price: SortEnum
  relevance: SortEnum
}
export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type StoreConfig = {
  absolute_footer: string
  base_currency_code: string
  base_link_url: string
  base_media_url: string
  base_static_url: string
  base_url: string
  catalog_default_sort_by: string
  category_fixed_product_tax_display_setting: FixedProductTaxDisplaySettings
  category_url_suffix: string
  cms_home_page: string
  cms_no_cookies: string
  cms_no_route: string
  code: string
  copyright: string
  default_description: string
  default_display_currency_code: string
  default_keywords: string
  default_title: string
  demonotice: number
  front: string
  grid_per_page: number
  grid_per_page_values: string
  head_includes: string
  head_shortcut_icon: string
  header_logo_src: string
  id: number
  list_mode: string
  list_per_page: number
  list_per_page_values: string
  locale: string
  logo_alt: string
  logo_height: number
  logo_width: number
  no_route: string
  product_fixed_product_tax_display_setting: FixedProductTaxDisplaySettings
  product_url_suffix: string
  root_category_id: number
  sales_fixed_product_tax_display_setting: FixedProductTaxDisplaySettings
  secure_base_link_url: string
  secure_base_media_url: string
  secure_base_static_url: string
  secure_base_url: string
  show_cms_breadcrumbs: number
  store_name: string
  timezone: string
  title_prefix: string
  title_separator: string
  title_suffix: string
  website_id: number
  weight_unit: string
  welcome: string
}


enum FixedProductTaxDisplaySettings {
  INCLUDE_FPT_WITHOUT_DETAILS = 'INCLUDE_FPT_WITHOUT_DETAILS',
  INCLUDE_FPT_WITH_DETAILS = 'INCLUDE_FPT_WITH_DETAILS',
  EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS = 'EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS',
  EXCLUDE_FPT_WITHOUT_DETAILS = 'EXCLUDE_FPT_WITHOUT_DETAILS',
  FPT_DISABLED = 'FPT_DISABLED'
}

// Queries
export type storeConfigQuery = {
  storeConfig: StoreConfig;
}

export type CmsPage = {
  content: string
  content_heading: string
  identifier: string
  meta_description: string
  meta_keywords: string
  meta_title: string
  page_layout: string
  title: string
  url_key: string
}

export type cmsPageQuery = {
  cmsPage: CmsPage;
}

export type createEmptyCartMutation = {
  createEmptyCart: string
};

export type Cart = {
  applied_coupons: [AppliedCoupon]
  available_payment_methods: [AvailablePaymentMethod]
  billing_address: BillingCartAddress
  email: string
  id: string
  is_virtual: boolean
  items: [CartItemInterface]
  prices: CartPrices
  selected_payment_method: SelectedPaymentMethod
  shipping_addresses: [ShippingCartAddress]
  total_quantity: number
}

export type AppliedCoupon = {
  code: string
}

type AvailablePaymentMethod = {
  code: string
  title: string
}

type BillingCartAddress = CartAddressInterface;
type ShippingCartAddress = CartAddressInterface;

interface CartAddressInterface {
  city: string
  company: string
  country: CartAddressCountry
  firstname: string
  lastname: string
  postcode: string
  region: CartAddressRegion
  street: [string]
  telephone: string
}

type CartAddressCountry = {
  code: string
  label: string
}

type CartAddressRegion = {
  code: string
  label: string
}

export interface CartItemInterface {
  id: string
  prices: CartItemPrices
  product: ProductInterface
  quantity: number
}

type CartItemPrices = {
  discounts: [Discount]
  price: Money
  row_total: Money
  row_total_including_tax: Money
  total_item_discount: Money
}

type Discount = {
  amount: Money
  label: string
}

type CartPrices = {
  applied_taxes: [CartTaxItem]
  discounts: [Discount]
  grand_total: Money
  subtotal_excluding_tax: Money
  subtotal_including_tax: Money
  subtotal_with_discount_excluding_tax: Money
}

type CartTaxItem = {
  amount: Money
  label: string
}

type SelectedPaymentMethod = {
  code: string
  purchase_order_number: string
  title: string
}

export type cartQuery = {
  cart: CmsPage;
}

export type AddSimpleProductsToCartInput = {
  cart_id: string
  cart_items: [SimpleProductCartItemInput]
}

type SimpleProductCartItemInput = {
  customizable_options: [CustomizableOptionInput]
  data: CartItemInput
}

type CustomizableOptionInput = {
  id: number
  value_string: string
}

type CartItemInput = {
  quantity: number
  sku: string
}

export type AddSimpleProductsToCartOutput = {
  addSimpleProductsToCart: {
    cart: Cart
  }
}

export type UpdateCartItemsInput = {
  cart_id: string
  cart_items: [CartItemUpdateInput]
}

type CartItemUpdateInput = {
  cart_item_id: number
  customizable_options: [CustomizableOptionInput]
  quantity: number
}

export type UpdateCartItemsOutput = {
  updateCartItems: {
    cart: Cart
  }
}

export type RemoveItemFromCartInput = {
  cart_id: string
  cart_item_id: number
}

export type RemoveItemFromCartOutput = {
  removeItemFromCart: {
    cart: Cart
  }
}

export type ApplyCouponToCartInput = {
  cart_id: string
  coupon_code: string
}

export type ApplyCouponToCartOutput = {
  removeItemFromCart: {
    cart: Cart
  }
}

export type AddConfigurableProductsToCartInput = {
  cart_id: string
  cart_items: [ConfigurableProductCartItemInput]
}

type ConfigurableProductCartItemInput = {
  customizable_options: [CustomizableOptionInput]
  data: CartItemInput
  parent_sku: string
  variant_sku: string
}

export type AddConfigurableProductsToCartOutput = {
  addConfigurableProductsToCart: {
    cart: Cart
  }
}

export type CustomerToken = {
  generateCustomerToken: {
    token: string
  }
}

export type customerQuery = {
  customer: Customer
}

export type Customer = {
  addresses: [CustomerAddress]
  created_at: string
  date_of_birth: string
  default_billing: string
  default_shipping: string
  email: string
  firstname: string
  gender: number
  is_subscribed: Boolean
  lastname: string
  middlename: string
  prefix: string
  suffix: string
  taxvat: string
  wishlist: Wishlist
}

export type CustomerAddress = {
  city: string
  company: string
  country_code: CountryCodeEnum
  default_billing: Boolean
  default_shipping: Boolean
  extension_attributes: [CustomerAddressAttribute]
  fax: string
  firstname: string
  id: number
  lastname: string
  middlename: string
  postcode: string
  prefix: string
  region: CustomerAddressRegion
  street: [string]
  suffix: string
  telephone: string
  vat_id: string
}

enum CountryCodeEnum {
  AF = 'AF',
  AX = 'AX',
  AL = 'AL',
  DZ = 'DZ',
  AS = 'AS',
  AD = 'AD',
  AO = 'AO',
  AI = 'AI',
  AQ = 'AQ',
  AG = 'AG',
  AR = 'AR',
  AM = 'AM',
  AW = 'AW',
  AU = 'AU',
  AT = 'AT',
  AZ = 'AZ',
  BS = 'BS',
  BH = 'BH',
  BD = 'BD',
  BB = 'BB',
  BY = 'BY',
  BE = 'BE',
  BZ = 'BZ',
  BJ = 'BJ',
  BM = 'BM',
  BT = 'BT',
  BO = 'BO',
  BA = 'BA',
  BW = 'BW',
  BV = 'BV',
  BR = 'BR',
  IO = 'IO',
  VG = 'VG',
  BN = 'BN',
  BG = 'BG',
  BF = 'BF',
  BI = 'BI',
  KH = 'KH',
  CM = 'CM',
  CA = 'CA',
  CV = 'CV',
  KY = 'KY',
  CF = 'CF',
  TD = 'TD',
  CL = 'CL',
  CN = 'CN',
  CX = 'CX',
  CC = 'CC',
  CO = 'CO',
  KM = 'KM',
  CG = 'CG',
  CD = 'CD',
  CK = 'CK',
  CR = 'CR',
  CI = 'CI',
  HR = 'HR',
  CU = 'CU',
  CY = 'CY',
  CZ = 'CZ',
  DK = 'DK',
  DJ = 'DJ',
  DM = 'DM',
  DO = 'DO',
  EC = 'EC',
  EG = 'EG',
  SV = 'SV',
  GQ = 'GQ',
  ER = 'ER',
  EE = 'EE',
  ET = 'ET',
  FK = 'FK',
  FO = 'FO',
  FJ = 'FJ',
  FI = 'FI',
  FR = 'FR',
  GF = 'GF',
  PF = 'PF',
  TF = 'TF',
  GA = 'GA',
  GM = 'GM',
  GE = 'GE',
  DE = 'DE',
  GH = 'GH',
  GI = 'GI',
  GR = 'GR',
  GL = 'GL',
  GD = 'GD',
  GP = 'GP',
  GU = 'GU',
  GT = 'GT',
  GG = 'GG',
  GN = 'GN',
  GW = 'GW',
  GY = 'GY',
  HT = 'HT',
  HM = 'HM',
  HN = 'HN',
  HK = 'HK',
  HU = 'HU',
  IS = 'IS',
  IN = 'IN',
  ID = 'ID',
  IR = 'IR',
  IQ = 'IQ',
  IE = 'IE',
  IM = 'IM',
  IL = 'IL',
  IT = 'IT',
  JM = 'JM',
  JP = 'JP',
  JE = 'JE',
  JO = 'JO',
  KZ = 'KZ',
  KE = 'KE',
  KI = 'KI',
  KW = 'KW',
  KG = 'KG',
  LA = 'LA',
  LV = 'LV',
  LB = 'LB',
  LS = 'LS',
  LR = 'LR',
  LY = 'LY',
  LI = 'LI',
  LT = 'LT',
  LU = 'LU',
  MO = 'MO',
  MK = 'MK',
  MG = 'MG',
  MW = 'MW',
  MY = 'MY',
  MV = 'MV',
  ML = 'ML',
  MT = 'MT',
  MH = 'MH',
  MQ = 'MQ',
  MR = 'MR',
  MU = 'MU',
  YT = 'YT',
  MX = 'MX',
  FM = 'FM',
  MD = 'MD',
  MC = 'MC',
  MN = 'MN',
  ME = 'ME',
  MS = 'MS',
  MA = 'MA',
  MZ = 'MZ',
  MM = 'MM',
  NA = 'NA',
  NR = 'NR',
  NP = 'NP',
  NL = 'NL',
  AN = 'AN',
  NC = 'NC',
  NZ = 'NZ',
  NI = 'NI',
  NE = 'NE',
  NG = 'NG',
  NU = 'NU',
  NF = 'NF',
  MP = 'MP',
  KP = 'KP',
  NO = 'NO',
  OM = 'OM',
  PK = 'PK',
  PW = 'PW',
  PS = 'PS',
  PA = 'PA',
  PG = 'PG',
  PY = 'PY',
  PE = 'PE',
  PH = 'PH',
  PN = 'PN',
  PL = 'PL',
  PT = 'PT',
  QA = 'QA',
  RE = 'RE',
  RO = 'RO',
  RU = 'RU',
  RW = 'RW',
  WS = 'WS',
  SM = 'SM',
  ST = 'ST',
  SA = 'SA',
  SN = 'SN',
  RS = 'RS',
  SC = 'SC',
  SL = 'SL',
  SG = 'SG',
  SK = 'SK',
  SI = 'SI',
  SB = 'SB',
  SO = 'SO',
  ZA = 'ZA',
  GS = 'GS',
  KR = 'KR',
  ES = 'ES',
  LK = 'LK',
  BL = 'BL',
  SH = 'SH',
  KN = 'KN',
  LC = 'LC',
  MF = 'MF',
  PM = 'PM',
  VC = 'VC',
  SD = 'SD',
  SR = 'SR',
  SJ = 'SJ',
  SZ = 'SZ',
  SE = 'SE',
  CH = 'CH',
  SY = 'SY',
  TW = 'TW',
  TJ = 'TJ',
  TZ = 'TZ',
  TH = 'TH',
  TL = 'TL',
  TG = 'TG',
  TK = 'TK',
  TO = 'TO',
  TT = 'TT',
  TN = 'TN',
  TR = 'TR',
  TM = 'TM',
  TC = 'TC',
  TV = 'TV',
  UG = 'UG',
  UA = 'UA',
  AE = 'AE',
  GB = 'GB',
  US = 'US',
  UY = 'UY',
  UM = 'UM',
  VI = 'VI',
  UZ = 'UZ',
  VU = 'VU',
  VA = 'VA',
  VE = 'VE',
  VN = 'VN',
  WF = 'WF',
  EH = 'EH',
  YE = 'YE',
  ZM = 'ZM',
  ZW = 'ZW'
}

type CustomerAddressAttribute = {
  attribute_code: string
  value: string
}

type CustomerAddressRegion = {
  region: string
  region_code: string
}

export type Wishlist = {
  id: number
  items: [WishlistItem]
  items_count: number
  sharing_code: string
  updated_at: string
}

type WishlistItem = {
  added_at: string
  description: string
  id: number
  product: ProductInterface
  qty: number
}

export type CustomerInput = {
  date_of_birth: string
  dob: string
  email: string
  firstname: string
  gender: number
  is_subscribed: boolean
  lastname: string
  middlename: string
  password: string
  prefix: string
  suffix: string
  taxvat: string
}
