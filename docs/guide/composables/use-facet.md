# useFacet

## Features
`useFacet` composition function can be used to fetch data related to:
* products,
* categories,
* breadcrumbs.

What makes it powerful is the ability to accept multiple filters, allowing to narrow down the results to a specific category, search term, etc.

## API
```typescript
interface UseFacet<any> {
  result: ComputedProperty<FacetSearchResult<any>>;
  loading: ComputedProperty<boolean>;
  search: (params?: AgnosticFacetSearchParams) => Promise<void>;
  error: ComputedProperty<UseFacetErrors>;
}
```

### `search`
Function for searching and classifying records, allowing users to browse the catalog data. It accepts a single object as a parameter
```typescript
interface AgnosticFacetSearchParams {
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
```

### `result`
Reactive data object containing the response from the backend.

### `loading`
Reactive object containing information about the loading state of search.

### `error`
Reactive object containing the error message, if search failed for any reason.


## Getters
````typescript
interface FacetsGetters<SEARCH_DATA, RESULTS, CRITERIA = any> {
    getAll: (searchData: FacetSearchResult<SEARCH_DATA>, criteria?: CRITERIA) => AgnosticFacet[];
    getGrouped: (searchData: FacetSearchResult<SEARCH_DATA>, criteria?: CRITERIA) => AgnosticGroupedFacet[];
    getCategoryTree: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticCategoryTree;
    getSortOptions: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticSort;
    getProducts: (searchData: FacetSearchResult<SEARCH_DATA>) => RESULTS;
    getPagination: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticPagination;
    getBreadcrumbs: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticBreadcrumb[];
}
````

* `getAll` - returns all available facets.
* `getGrouped` - returns grouped facets by facet name.
* `getCategoryTree` - return the tree of nested categories.
* `getSortOptions` - returns available and currently selected sorting options.
* `getProducts` - returns products matching current filters.
* `getPagination` - returns pagination information.
* `getBreadcrumbs` - returns breadcrumbs information.

## Example
```javascript
import { onSSR } from '@vue-storefront/core';
import { useFacet, facetGetters } from '@vue-storefront/magento';

export default {
  setup (props, context) {
    const { result, search, loading } = useFacet(`facetId:${path}`);

    const products = computed(() => facetGetters.getProducts(result.value));
    const breadcrumbs = computed(() => facetGetters.getBreadcrumbs(result.value));
    const sortBy = computed(() => facetGetters.getSortOptions(result.value));
    const facets = computed(() => facetGetters.getGrouped(result.value));
    const pagination = computed(() => facetGetters.getPagination(result.value));

    onSSR(async () => {
      await search({
        categorySlug: 'clothing',
        sort: 'latest',
        itemsPerPage: 10,
        term: 'some search query'
      });
    });

    return {
      produproducts,
      breadcrumbs,
      sortBy,
      facets,
      pagination,
      loading,
    };
  }
}
```
