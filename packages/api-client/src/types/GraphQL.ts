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
  label: String
  options: [AggregationOption]
}

export type AggregationOption = {
  count: number
  label: string
  value: string
}

export type SortFields = {
  default: String
  options: [SortField]
}

export type SortField = {
  label: string
  value: string
}

export type ProductAttributeFilterInput = {
  category_id: FilterEqualTypeInput
  description: FilterMatchTypeInput
  name: FilterMatchTypeInput
  price: FilterRangeTypeInput
  short_description: FilterMatchTypeInput
}

export type ProductAttributeSortInput = {
  name: SortEnum
  position: SortEnum
  price: SortEnum
  relevance: SortEnum
}
enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}
