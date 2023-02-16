# useProduct composable

`useProduct` composable allows loading product details or list with params for sorting, filtering and pagination.

## API
`useProduct` composable returns the following properties:

- `getProductList` - function that fetches a list of products with sorting, filtering and pagination.
- `getProductDetails` - function that fetches a product details with sorting, filtering and pagination.
- `getProductPath` - function that gets a product path from url_rewrites or url_key 
- `error` - ref that contains an errors from the composable methods
- `loading` - ref that contains information whether any of the composable methods is loading

## Interfaces

```ts
type GetProductSearchParams = {
  search?: string;
  filter?: ProductAttributeFilterInput;
  pageSize?: number;
  currentPage?: number;
  sort?: ProductAttributeSortInput;
  configurations?: string[];
};
interface UseProductErrors {
  getProductList: Error | null;
  getProductDetails: Error | null;
}

interface UseProductInterface {
  error: DeepReadonly<Ref<UseProductErrors>>;
  loading: Readonly<Ref<boolean>>;
  getProductList(searchParams: GetProductSearchParams): Promise<ProductList | null>;
  getProductDetails(searchParams: GetProductSearchParams): Promise<ProductDetails | null>;
  getProductPath(product: Product): string;
}
```

## productGetters

`productGetters` is a set of helper functions that can be used to get data from the product. They receive product object as a parameter and return the data from it.

### product parameter

- `getName` - returns the name of the product
- `getSlug` - returns the slug of the product
- `getPrice` - returns an object with the prices of the product:
  - `regular` - returns the regular price of the product
  - `special` - returns the special price of the product
  - `maximum` - returns the maximum price of the product
  - `final` - returns final price with discounts, etc.
- `getGallery` - returns an object with the media content:
  - `small` - returns URL for small sized image
  - `normal`- returns URL for normal sized image
  - `big` - returns URL for big sized image
- `getCoverImage` - returns the main product cover image URL
- `getAttributes` - returns an object with the attributes objects, can be filter by attribute name
- `getDescription` - returns product description
- `getCategoryIds` - returns an array of product category IDs
- `getId` - returns product ID
- `getTotalReviews` - returns a number of user's reviews for a product
- `getAverageRating` - returns a number of an average product's rating
- `getBreadcrumbs` - returns an array of breadcrumb objects:
  - `text` - text of the breadcrumb
  - `link` - link of the breadcrumb
- `getCategory` - returns product's category object
- `getProductRelatedProduct` - returns a related product
- `getProductSku` - returns SKU of the product
- `getProductThumbnailImage` - returns thumbnail image URL
- `getProductUpsellProduct` - returns the upsell product
- `getShortDescription` - returns a short product's description
- `getTypeId` - returns type id
- `getSwatchData` - returns product's swatch data
- `getGroupedProducts` - returns grouped products
- `getBundleProducts` - returns bundle products


## productGetters usage

```ts
import productGetters from '~/modules/catalog/product/getters/productGetters';

const productName = productGetters.getName(product);
const productSlug = productGetters.getSlug(product);
const productDescription = productGetters.getDescription(product);
```

## Examples

### Search products

Handle user search input and fetch list of products:

```ts
<script>
import { useProduct } from '~/composables';

setup() {
  const term = ref('');

  const { getProductList } = useProduct();

  const rawHandleSearch = async (searchTerm: string) => {
    term.value = searchTerm;

    const productList : Products = await getProductList({
      pageSize: 30,
      search: term.value,
    }) as Products;
  };
}
</script>
```

### Get product details

Fetch product details by `sku`:

```ts
import { usePageStore } from '~/stores/page';
import { useProduct } from '~/composables';

setup() {
  const { routeData } = usePageStore();
  const { getProductDetails } = useProduct();

  const getBaseSearchQuery = {
    filter: {
      sku: {
        eq: routeData.sku,
      },
    }
  };

  const fetchProductBaseData = async (searchQuery = getBaseSearchQuery()) => {
    const result = await getProductDetails({
      ...searchQuery,
    });

    product.value = result.items[0] as Product;
  };

  useFetch(async () => {
    await fetchProductBaseData();
  });
}
```

### Get product path

Get product's path and pass as link prop to `SfProductCard` component:

```ts
<template>
  <div>
    <SfProductCard
      //...
      :link="localePath(getProductPath(product))"
    />
  </div>
</template>

<script lang="ts">
import { useProduct } from '~/composables';

setup() {
  const { getProductPath } = useProduct();

  return {
    getProductPath,
  };
}
</script>
```