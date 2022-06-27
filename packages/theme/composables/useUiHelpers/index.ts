import { useRoute, useRouter } from '@nuxtjs/composition-api';
import type { CategoryTree } from '~/modules/GraphQL/types';
import type { UseUiHelpersInterface } from '~/composables';
import type { Params, QueryParams, FilterParams } from './Params';
import type { FacetInterface } from '~/modules/catalog/category/types';

const nonFilters = new Set(['page', 'sort', 'term', 'itemsPerPage']);

function reduceFilters(query: QueryParams) {
  return (prev: FilterParams, curr: string): FilterParams => {
    const makeArray = Array.isArray(query[curr]) || nonFilters.has(curr);

    return {
      ...prev,
      [curr]: makeArray ? query[curr] as string[] : [query[curr] as string],
    };
  };
}

/**
 * Allows handling the parameters for filtering,
 * searching, sorting and pagination in the URL search/query params.
 *
 * See the {@link UseUiHelpersInterface} for a list of methods and values available in this composable.
 */
export function useUiHelpers(): UseUiHelpersInterface {
  const route = useRoute();
  const router = useRouter();
  let { query: routerQuery } = route.value;

  const resolveQuery = (): QueryParams => {
    if (typeof window !== 'undefined') {
      routerQuery = router.resolve((window.location.pathname + window.location.search).slice(1)).route.query;
    }

    return routerQuery;
  };

  const getFiltersDataFromUrl = (onlyFilters = false): FilterParams => {
    const currentQuery = resolveQuery();
    return (
      Object.keys(currentQuery)
        .filter((f) => (onlyFilters ? !nonFilters.has(f) : f))
        // eslint-disable-next-line unicorn/prefer-object-from-entries
        .reduce(reduceFilters(currentQuery), {})
    );
  };

  const getFacetsFromURL = (): Params => {
    const currentQuery = resolveQuery();

    return {
      filters: getFiltersDataFromUrl(true),
      itemsPerPage: Number.parseInt(currentQuery.itemsPerPage, 10) || 10,
      page: Number.parseInt(currentQuery.page, 10) || 1,
      sort: currentQuery.sort ?? '',
      term: currentQuery.term,
    };
  };

  const changeSearchTerm = (term: string) => term;

  const getSearchTermFromUrl = (): Params => {
    const currentQuery = resolveQuery();

    return {
      page: Number.parseInt(currentQuery.page, 10) || 1,
      sort: currentQuery.sort ?? '',
      filters: getFiltersDataFromUrl(true),
      itemsPerPage: Number.parseInt(currentQuery.itemsPerPage, 10) || 10,
      term: currentQuery.term,
    };
  };

  const getCatLink = (category: CategoryTree): string => `/c/${category.url_path}${category.url_suffix || ''}`;

  /**
   * Force push for a backward compatibility in other places, should be removed
   *
   * @param sort
   * @param forcePush
   */
  const changeSorting = async (sort: string, forcePush = true): Promise<void> => {
    if (forcePush) {
      await router.push({ query: { ...routerQuery, sort } });
    } else {
      const routeData = router.resolve({
        query: {
          ...getFiltersDataFromUrl(),
          sort,
        },
      });
      window.history.pushState({}, null, routeData.href);
    }
  };

  /**
   * Force push for a backward compatibility in other places, should be removed
   *
   * @param filters
   * @param forcePush
   */
  const changeFilters = async (filters: FilterParams, forcePush = true): Promise<void> => {
    const query = {
      ...getFiltersDataFromUrl(false),
      ...filters,
    };

    if (forcePush) {
      await router.push({ query });
    } else {
      const routeData = router.resolve({ query });
      window.history.pushState({}, null, routeData.href);
    }
  };

  const clearFilters = async (forcePush = true): Promise<void> => {
    if (forcePush) {
      await router.push({
        query: {},
      });
    } else {
      const routeData = router.resolve({
        query: {},
      });
      window.history.pushState({}, null, routeData.href);
    }
  };

  /**
   * Force push for a backward compatibility in other places, should be removed
   *
   * @param itemsPerPage
   * @param forcePush
   */
  const changeItemsPerPage = async (itemsPerPage: number, forcePush = true): Promise<void> => {
    const query = {
      ...getFiltersDataFromUrl(false),
      itemsPerPage: itemsPerPage.toString(10),
      page: '0',
    };

    if (forcePush) {
      await router.push({ query });
    } else {
      const routeData = router.resolve({ query });
      window.history.pushState({}, null, routeData.href);
    }
  };

  const changePage = async (page: number, forcePush = true): Promise<void> => {
    const query = {
      ...getFiltersDataFromUrl(false),
      page: page.toString(),
    };

    if (forcePush) {
      await router.push({ query });
    } else {
      const routeData = router.resolve({ query });
      window.history.pushState({}, null, routeData.href);
    }
  };

  const setTermForUrl = async (term: string): Promise<void> => {
    await router.push({
      query: {
        ...getFiltersDataFromUrl(false),
        term: term || undefined,
      },
    });
  };

  const isFacetColor = (facet: FacetInterface): boolean => facet.id === 'color';

  const isFacetCheckbox = (): boolean => false;

  return {
    changeFilters,
    changeItemsPerPage,
    changeSearchTerm,
    changeSorting,
    clearFilters,
    getCatLink,
    getFacetsFromURL,
    getSearchTermFromUrl,
    isFacetCheckbox,
    isFacetColor,
    setTermForUrl,
    changePage,
  };
}

export * from './Params';
export * from './useUiHelpers';
export default useUiHelpers;
