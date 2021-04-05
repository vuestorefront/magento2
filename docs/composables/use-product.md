# useProduct

`useProduct` composable is responsible for fetching a list of products.

## API

```typescript
interface UseProduct<PRODUCTS, PRODUCT_SEARCH_PARAMS> {
  products: ComputedProperty<PRODUCTS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseProductErrors>;
  search(params: ComposableFunctionArgs<PRODUCT_SEARCH_PARAMS>): Promise<void>;
  [x: string]: any;
}
```

* `products` - Returns `products` as a `computed` property
* `search` - Function that takes in `perPage` , `page` , `sort` , `term` , `filters` and an `array of String` as optional params and gets the `products` accordingly
* `loading` - Returns the `loading` state of `search`
* `error` - reactive object containing the error message, if search failed for any reason.

## Getters

```typescript
interface ProductGetters<PRODUCT, PRODUCT_FILTER> {
    getName: (product: PRODUCT) => string;
    getSlug: (product: PRODUCT) => string;
    getPrice: (product: PRODUCT) => AgnosticPrice;
    getGallery: (product: PRODUCT) => AgnosticMediaGalleryItem[];
    getCoverImage: (product: PRODUCT) => string;
    getFiltered: (products: PRODUCT[], filters?: PRODUCT_FILTER) => PRODUCT[];
    getAttributes: (products: PRODUCT[] | PRODUCT, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
    getDescription: (product: PRODUCT) => string;
    getCategoryIds: (product: PRODUCT) => string[];
    getId: (product: PRODUCT) => string;
    getFormattedPrice: (price: number) => string;
    getTotalReviews: (product: PRODUCT) => number;
    getAverageRating: (product: PRODUCT) => number;
    getBreadcrumbs?: (product: PRODUCT) => AgnosticBreadcrumb[];
    [getterName: string]: any;
}
```
* `getName` - returns product name.
* `getSlug` - returns product slug.
* `getPrice` - returns product price.
* `getGallery` - returns product gallery.
* `getCoverImage` - returns cover image of product.
* `getFiltered` - returns filtered product.
* `getAttributes` - returns product attributes.
* `getDescription` - returns product description.
* `getCategoryIds` - returns all product categories.
* `getId` - returns product ID.
* `getFormattedPrice` - returns product price with currency sign.
* `getTotalReviews` - returns total number of reviews product has.
* `getAverageRating` - returns average rating from all reviews.

## Example

```javascript
import { useProduct, productGetters } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { products, search, loading, error } = useProduct('<UNIQUE_ID>');

    onSSR(async () => {
      await search({ slug: 'super-t-shirt' })
    })

    return {
      loading,
      error,
      product: computed(() => productGetters.getFiltered(products.value, { master: true, attributes: context.root.$route.query })[0]),
      option: computed(() => productGetters.getAttributes(products.value, ['color', 'size'])),
      configuration: computed(() => productGetters.getCategoryIds(product.value))
    }
  }
}
```
