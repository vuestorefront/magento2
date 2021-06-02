# useProduct

## Features
`useProduct` composable is responsible for fetching a list of products.

## API
```typescript
interface UseProduct<Products, ProductsSearchParams> {
  products: ComputedProperty<Products>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseProductErrors>;
  search(params: ComposableFunctionArgs<ProductsSearchParams>): Promise<void>;
}

export interface ProductsSearchParams {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: any;
  [x: string]: any;
}

export interface Products {
  /** Layered navigation aggregations. */
  aggregations?: Maybe<Array<Maybe<Aggregation>>>;
  /**
   * Layered navigation filters array.
   * @deprecated Use aggregations instead
   */
  filters?: Maybe<Array<Maybe<LayerFilter>>>;
  /** An array of products that match the specified search criteria. */
  items?: Maybe<Array<Maybe<ProductInterface>>>;
  /** An object that includes the page_info and currentPage values specified in the query. */
  page_info?: Maybe<SearchResultPageInfo>;
  /** An object that includes the default sort field and all available sort fields. */
  sort_fields?: Maybe<SortFields>;
  /** The number of products that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
  total_count?: Maybe<Scalars['Int']>;
}

export interface ProductInterface {
  activity?: Maybe<Scalars['String']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']>;
  /** Relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled */
  canonical_url?: Maybe<Scalars['String']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  category_gear?: Maybe<Scalars['String']>;
  climate?: Maybe<Scalars['String']>;
  collar?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['Int']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  eco_collection?: Maybe<Scalars['Int']>;
  erin_recommends?: Maybe<Scalars['Int']>;
  features_bags?: Maybe<Scalars['String']>;
  format?: Maybe<Scalars['Int']>;
  gender?: Maybe<Scalars['String']>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: Maybe<Scalars['String']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** A number representing the product's manufacturer. */
  manufacturer?: Maybe<Scalars['Int']>;
  material?: Maybe<Scalars['String']>;
  /** An array of Media Gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use product's `media_gallery` instead
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']>;
  new?: Maybe<Scalars['Int']>;
  /**
   * The beginning date for new product listings, and determines if the product is featured as a new product.
   * @deprecated The field should not be used on the storefront.
   */
  new_from_date?: Maybe<Scalars['String']>;
  /**
   * The end date for new product listings.
   * @deprecated The field should not be used on the storefront.
   */
  new_to_date?: Maybe<Scalars['String']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']>;
  pattern?: Maybe<Scalars['String']>;
  performance_fabric?: Maybe<Scalars['Int']>;
  /**
   * A ProductPrices object, indicating the price of an item.
   * @deprecated Use price_range for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** A PriceRange object, indicating the range of prices for the product */
  price_range: PriceRange;
  /** An array of TierPrice objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of ProductLinks objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float'];
  /** Related Products */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  sale?: Maybe<Scalars['Int']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  size?: Maybe<Scalars['Int']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']>;
  sleeve?: Maybe<Scalars['String']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']>;
  /** The end date that a product has a special price. */
  special_to_date?: Maybe<Scalars['String']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  strap_bags?: Maybe<Scalars['String']>;
  style_bags?: Maybe<Scalars['String']>;
  style_bottom?: Maybe<Scalars['String']>;
  style_general?: Maybe<Scalars['String']>;
  /** The file name of a swatch image */
  swatch_image?: Maybe<Scalars['String']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use price_tiers for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use price_tiers for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use __typename instead.
   */
  type_id?: Maybe<Scalars['String']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
}

export interface UseProductErrors {
  search: Error;
}
```

### `search`
Function that takes in `ProductsSearchParams` as optional params and gets the `products` accordingly

### `products`
Returns `products` as a `computed` property

### `loading`
Returns the `loading` state of `search`

### `error`
reactive object containing the error message, if search failed for any reason.


## Getters

```typescript
interface ProductGetters<Products, ProductsSearchParams> {
  getAttributes: (
    products: Product,
    _filterByAttributeName?: string[],
  ) => Record<string, AgnosticAttribute | string>,
  getAverageRating: () => number,
  getBreadcrumbs: (
    product: Product,
    category?: Category,
  ) => AgnosticBreadcrumb[],
  getCategory: (
    product: Product,
    currentUrlPath: string,
  ) => Category | null,
  getCategoryIds: (product: Product) => string[],
  getCoverImage: (product: Product) => string,
  getDescription: (product: Product) => string,
  getFiltered: (
    products: Product[],
    _filters: ProductsSearchParams,
  ) => Product[],
  getFormattedPrice: (price: number) => string | null,
  getGallery: (product: Product) => AgnosticMediaGalleryItem[],
  getId: (product: Product) => string,
  getName: (product: Product) => string,
  getPrice: (product: Product) => AgnosticPrice,
  getProductRelatedProduct: (product: Product) => Product[] | [],
  getProductUpsellProduct: (product: Product) => Product[] | [],
  getProductSku: (product: Product) => string,
  getProductThumbnailImage: (product: Product) => string,
  getShortDescription: (product: Product) => string,
  getSlug: (product: Product, category?: Category) => string,
  getTotalReviews: () => number,
  getTypeId: (product: Product) => string,
}
```
* `getAttributes` - returns product attributes.
* `getAverageRating` - returns average rating from all reviews.
* `getBreadcrumbs` - returns 'Breadcrumbs'.
* `getCategoryIds` - returns all product categories.
* `getCategory` - returns 'Category'.
* `getCoverImage` - returns cover image of product.
* `getDescription` - returns product description.
* `getFiltered` - returns filtered product.
* `getFormattedPrice` - returns product price with currency sign.
* `getGallery` - returns product gallery.
* `getId` - returns product ID.
* `getName` - returns product name.
* `getPrice` - returns product price.
* `getProductRelatedProduct` - returns 'ProductRelatedProduct'.
* `getProductSku` - returns 'ProductSku'.
* `getProductThumbnailImage` - returns 'ProductThumbnailImage'.
* `getProductUpsellProduct` - returns 'ProductUpsellProduct'.
* `getShortDescription` - returns 'ShortDescription'.
* `getSlug` - returns product slug.
* `getTotalReviews` - returns total number of reviews product has.
* `getTypeId` - returns 'TypeId'.

## Example

```javascript
import { useProduct, productGetters } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { products, search, loading, error } = useProduct('<UNIQUE_ID>');

    onSSR(async () => {
      await search({
        pageSize: 10,
        currentPage: 1,
        sort: {
          position: 'ASC',
        },
      })
    })

    return {
      loading,
      error,
      product: computed(() => productGetters.getFiltered(products.value?.items, { master: true })[0]),
    }
  }
}
```
