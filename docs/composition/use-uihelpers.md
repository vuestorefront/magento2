# useUiHelpers composable

`useUiHelpers` composable allows handling the parameters for filtering, searching, sorting and pagination in the URL search/query params.

## API
`useUiHelpers` composable returns the following properties:

- `changeFilters` - function that updates current URL with filters as query/search params. It forces the navigation to updated URL when `forcePush` is `true`.
- `changeItemsPerPage` - function that updates current URL with items per page count as query/search param. It forces the navigation to updated URL when `forcePush` is `true`.
- `changeSorting` - function that updates current URL with sorting as query/search param. It forces the navigation to updated URL when `forcePush` is `true`.
- `clearFilters` - function that clears filters from current URL query/search params. It forces the navigation to updated URL when `forcePush` is `true`.
- `changePage` - function that updates current URL with a page as a query/search param. It forces the navigation to updated URL when `forcePush` is `true`.
- `getCatLink` - function that gets route link for received category.
- `getFacetsFromURL` - function that gets facets parameters from current URL query/search params.
- `getSearchTermFromUrl` - function that gets search term and other params from current URL query/search params.
- `isFacetColor` - function that checks if received facet is a color facet.
- `setTermForUrl` - function that updates current URL with the search term as query/search param and navigates to it.

## Interfaces

```ts
interface UseUiHelpersInterface {
  changeFilters(filters: FilterParams, forcePush?: boolean): Promise<void>;
  changeItemsPerPage(itemsPerPage: number, forcePush?: boolean): Promise<void>;
  changeSearchTerm(term: string): string;
  changeSorting(sort: string, forcePush?: boolean): Promise<void>;
  clearFilters(forcePush?: boolean): Promise<void>;
  changePage(page: number, forcePush?: boolean): Promise<void>;
  getCatLink(category: CategoryTree): string;
  getFacetsFromURL(): Params;
  getSearchTermFromUrl(): Params;
  isFacetColor(facet: FacetInterface): boolean;
  setTermForUrl(term?: string): Promise<void>;
}
```

## Example

Extract category link from category tree, clear filters and apply filters:

```ts
import { useUiHelpers } from '~/composables';

setup() {
  const { getCatLink, changeFilters, clearFilters } = useUiHelpers();

  const categoryLink = getCatLink(category);

  const doClearFilters = () => {
    clearFilters(false);
  };

  const doApplyFilters = () => {
    changeFilters(selectedFilters.value, false);
  };
}
```