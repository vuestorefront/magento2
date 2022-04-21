// eslint-disable-next-line import/no-extraneous-dependencies
import { useRoute, useRouter } from '@nuxtjs/composition-api';
import { Category, FacetInterface } from '~/composables/types';

const nonFilters = new Set(['page', 'sort', 'term', 'itemsPerPage']);

const reduceFilters = (query) => (prev, curr: string) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.has(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]],
  };
};

const useUiHelpers = () => {
  const route = useRoute();
  const router = useRouter();
  let { query } = route.value;

  const resolveQuery = () => {
    if (typeof window !== 'undefined') {
      query = router.resolve((window.location.pathname + window.location.search).slice(1)).route.query;
    }

    return query;
  };

  const getFiltersDataFromUrl = (onlyFilters = false) => {
    const currentQuery = resolveQuery();
    return Object.keys(currentQuery)
      .filter((f) => (onlyFilters ? !nonFilters.has(f) : f))
      // eslint-disable-next-line unicorn/prefer-object-from-entries
      .reduce(reduceFilters(currentQuery), {});
  };

  const getFacetsFromURL = () => {
    const currentQuery = resolveQuery();

    return {
      filters: getFiltersDataFromUrl(true),
      itemsPerPage: Number.parseInt(currentQuery.itemsPerPage as string, 10) || 10,
      page: Number.parseInt(currentQuery.page as string, 10) || 1,
      sort: currentQuery.sort as string || '',
      term: currentQuery.term as string,
    };
  };

  const changeSearchTerm = (term: string) => term;

  const getSearchTermFromUrl = () => {
    const currentQuery = resolveQuery();

    return {
      page: Number.parseInt(currentQuery.page as string, 10) || 1,
      sort: currentQuery.sort || '',
      filters: getFiltersDataFromUrl(true),
      itemsPerPage: Number.parseInt(currentQuery.itemsPerPage as string, 10) || 10,
      term: currentQuery.term,
    };
  };

  const getCatLink = (category: Category): string => `/c/${category.url_path}${category.url_suffix || ''}`;

  /**
   * Force push for a backward compatibility in other places, should be removed
   *
   * @param sort
   * @param forcePush
   */
  const changeSorting = async (sort: string, forcePush = true) => {
    if (forcePush) {
      await router.push({ query: { ...query, sort } });
    } else {
      const routeData = router.resolve({
        query: {
          ...getFiltersDataFromUrl(),
          sort,
        },
      });
      window.history.pushState(
        {},
        null,
        routeData.href,
      );
    }
  };

  /**
   * Force push for a backward compatibility in other places, should be removed
   *
   * @param filters
   * @param forcePush
   */
  const changeFilters = async (filters: any, forcePush = true) => {
    if (forcePush) {
      await router.push({
        query: {
          ...getFiltersDataFromUrl(false),
          ...filters,
        },
      });
    } else {
      const routeData = router.resolve({
        query: {
          ...getFiltersDataFromUrl(),
          ...filters,
        },
      });
      window.history.pushState(
        {},
        null,
        routeData.href,
      );
    }
  };

  const clearFilters = async (forcePush = true) => {
    if (forcePush) {
      await router.push({
        query: {},
      });
    } else {
      const routeData = router.resolve({
        query: {},
      });
      window.history.pushState(
        {},
        null,
        routeData.href,
      );
    }
  };

  /**
   * Force push for a backward compatibility in other places, should be removed
   *
   * @param itemsPerPage
   * @param forcePush
   */
  const changeItemsPerPage = async (itemsPerPage: number, forcePush = true) => {
    if (forcePush) {
      await router.push({
        query: {
          ...getFiltersDataFromUrl(false),
          itemsPerPage,
        },
      });
    } else {
      const routeData = router.resolve({
        query: {
          ...getFiltersDataFromUrl(),
          itemsPerPage,
        },
      });
      window.history.pushState(
        {},
        null,
        routeData.href,
      );
    }
  };

  const setTermForUrl = async (term: string) => {
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
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    clearFilters,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl,
    changeSearchTerm,
  };
};

export default useUiHelpers;
