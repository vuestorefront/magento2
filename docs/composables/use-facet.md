# useFacet
`useFacet` composition function can be used to fetch data related to:
* products,
* categories,
* breadcrumbs.

What makes it powerful is the ability to accept multiple filters, allowing to narrow down the results to a specific category, search term, etc.

For more information about faceting, please refer to this page.

## API
````typescript
interface UseFacet<SEARCH_DATA> {
    result: ComputedProperty<FacetSearchResult<SEARCH_DATA>>;
    loading: ComputedProperty<boolean>;
    search: (params?: AgnosticFacetSearchParams) => Promise<void>;
    error: ComputedProperty<UseFacetErrors>;
}
````

* `search` - function for searching and classifying records, allowing users to browse the catalog data. It accepts a single object as a parameter
* `result` - reactive data object containing the response from the backend.
* `loading` - reactive object containing information about the loading state of search.
* `error - reactive object containing the error message, if search failed for any reason.

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
    [getterName: string]: (element: any, options?: any) => unknown;
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
import { useFacet, facetGetters } from '@vue-storefront/magento';

export default {
  setup (props, context) {
    const {
      result,
      search,
      loading
    } = useFacet();

    onSSR(async () => {
      await search({
        categorySlug: 'clothing',
        sort: 'latest',
        itemsPerPage: 10,
        term: 'some search query'
      });
    });

    return {
      products: computed(() => facetGetters.getProducts(result.value)),
      categoryTree: computed(() => facetGetters.getCategoryTree(result.value)),
      breadcrumbs: computed(() => facetGetters.getBreadcrumbs(result.value)),
      sortBy: computed(() => facetGetters.getSortOptions(result.value)),
      facets: computed(() => facetGetters.getGrouped(result.value, ['color', 'size'])),
      pagination: computed(() => facetGetters.getPagination(result.value)),
      loading
    };
  }
}
```
