# useFacet Composable

Allows searching for products with pagination, totals and sorting options.

```js
// Basic Usage
import { useFacet } from '~/composables';
import facetGetters from '~/modules/catalog/category/getters/facetGetters';

const { search, result, loading, error } = useFacet();
const products = ssrRef([]);
const sortBy = ref({selected: '', options: []});
const pagination = ref({});

await search({term: 'text'});

products.value = facetGetters.getProducts(result.value);
sortBy.value = facetGetters.getSortOptions(result.value);
pagination.value = facetGetters.getPagination(result.value);
```


::: read-more
Learn more about the `products` query options from the [Magento docs](https://developer.adobe.com/commerce/webapi/graphql/schema/products/queries/products/).
:::

The `search` method will allow you to search your catalog for items with a given query object with your search parameters. 

The `result` property will contain the data returned from the search and together with getters, can be used to retrieve the products, supported sorting behavior, and pagination data.

## Getters

`getSortOptions` - returns the available sorting options for the current search
`getProducts` - returns the products for the current search
`getPagination` - returns the pagination data for the current search

## Examples

### Getting Products

To help with hydration of your page, you can use the [`ssrRef` function](https://composition-api.nuxtjs.org/data/ssrref/) from `@nuxtjs/composition-api` that will pass your server-side state to the client-side.

```js
import { ssrRef } from '@nuxtjs/composition-api'
import { useFacet } from '~/composables';
import facetGetters from '~/modules/catalog/category/getters/facetGetters';

const { result, search } = useFacet();
const products = ssrRef([]);

await search({ term	: 'value' }); // will perform a text search

const products = facetGetters.getProducts(result.value)
```

### Sorting

The `result` from your search will contain the available sorting options for the current search. You can use these options to display a dropdown to the user to allow them to change the sorting behavior.

```js
import type { SortingOptionsValuesEnum } from '~/modules/catalog/category/composables/useFacet/sortingOptions';
const { search, result, loading, error } = useFacet();
const sortBy = ref({selected: '', options: []});

await search({ category_uid	: 'fc2e8382-b344-4526-a42a-1571ff889eb6' });

// with a default sort
await search({ category_uid	: 'fc2e8382-b344-4526-a42a-1571ff889eb6', sort: SortingOptionsValuesEnum.NAME_ASC });


sortBy.value = facetGetters.getSortOptions(result.value); // get the sorting options

console.log(sortBy.value.options);
/*
Possible values for options
[
  { label: 'Default', value: '' },
  { label: 'Name (A-Z)', value: 'name_ASC' },
  { label: 'Name (Z-A)', value: 'name_DESC' },
  { label: 'Price (Low to High)', value: 'price_ASC' },
  { label: 'Price (High to Low)', value: 'price_DESC' }
]
*/
```

### Fetching all products from a category

```js
const { search, result, loading, error } = useFacet();
// by category uid
await search({ category_uid	: 'fc2e8382-b344-4526-a42a-1571ff889eb6' });

// by category slug
await search({ categorySlug	: 'shirts' }); 
```

### Filtering by price
```js
await search({ filters: { price: '100_200' } });
```

### Filtering by name
```js
await search({ filters: { name: 'Shirt' } });
```


### Pagination

For pagination, you can use the `getPagination` getter to get the pagination data for the current search. This will return an object with the following properties:
- `currentPage` - the current page number
- `totalPages` - the total number of pages
- `itemsPerPage` - the number of items per page
- `totalItems` - the total number of items

When you make a `search` request, you can pass in a `page` parameter to specify which page you want to fetch and adjust the `itemsPerPage`. By default, the `itemsPerPage` is set to 20. 

```js
import { useFacet } from '~/composables';
import facetGetters from '~/modules/catalog/category/getters/facetGetters';
const pagination = ref('');

await search({ category_uid	: 'fc2e8382-b344-4526-a42a-1571ff889eb6' });
// change items per page
await search({ category_uid	: 'fc2e8382-b344-4526-a42a-1571ff889eb6', itemsPerPage: 100 });
// change page for search
await search({ category_uid	: 'fc2e8382-b344-4526-a42a-1571ff889eb6', itemsPerPage: 100, page: 2 });

pagination.value = facetGetters.getPagination(result.value); // gets current pagination info


```



## Types
```js
/**
 * The {@link useFacet} search params data structure
 */
export interface FacetSearchParams {
  categorySlug?: string;
  rootCatSlug?: string;
  term?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
  filters?: Record<string, string[]>;
  metadata?: any;
  [x: string]: any;
}

/**
 * The {@link useFacet} search result data structure
 */
export interface SearchResultData {
  items: ProductInterface[],
  total: number,
  availableSortingOptions: SortingOption[],
  perPageOptions: number[],
  itemsPerPage: number
}

/**
 * The {@link useFacet} search results contain the parameters used to filter and
 * the obtained data that matches it.
 */
export interface UseFacetSearchResult {
  /** The data obtained in the search. */
  data: SearchResultData;
  /** The parameters used to filter the search. */
  input: FacetSearchParams;
}

/**
 * The {@link useFacet} error object. The properties values' are the errors
 * thrown by its methods.
 */
export interface UseFacetErrors {
  /** Error when searching with facets fails, otherwise is `null`. */
  search: Error | null;
}

/** The params received by {@link useFacet}'s `search` method. */
export type UseFacetSearchParams = ComposableFunctionArgs<FacetSearchParams>;

/**
 * Data and methods returned from the {@link useFacet} composable.
 */
export interface UseFacetInterface {
  /**
   * Contains errors from any of the composable methods.
   *
   * Read {@link UseFacetErrors} documentation for more details.
   */
  error: DeepReadonly<Ref<UseFacetErrors>>;

  /**
   * Contains the search results from the last search.
   *
   * Read {@link UseFacetSearchResult} documentation for more details.
   */
  result: Ref<UseFacetSearchResult>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;

  /** Searches for products using facets. */
  search(params?: UseFacetSearchParams): Promise<void>;
}

// Sorting

export interface SortingModel {
  selected: string,
  options: SortingOption[]
}

export interface SortingOption {
  label: string,
  value: SortingOptionsValuesEnum
}

export enum SortingOptionsValuesEnum {
  DEFAULT = '',
  NAME_ASC = 'name_ASC',
  NAME_DESC = 'name_DESC',
  PRICE_ASC = 'price_ASC',
  PRICE_DESC = 'price_DESC',
}
```