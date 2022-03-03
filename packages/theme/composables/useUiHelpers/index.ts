// eslint-disable-next-line import/no-extraneous-dependencies
import { Category } from '@vue-storefront/magento-api';
import { AgnosticCategoryTree, AgnosticFacet } from '@vue-storefront/core';
import { useRoute, useRouter } from '@nuxtjs/composition-api';

const nonFilters = new Set(['page', 'sort', 'term', 'itemsPerPage']);

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.has(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]],
  };
};

const useUiHelpers = () => {
  const route = useRoute();
  const router = useRouter();
  const { query } = route.value;

  const resolveQuery = () => {
    if (typeof window !== 'undefined') {
      return router.resolve((window.location.pathname + window.location.search).slice(1)).route.query;
    }
    return query;
  };

  const getFiltersDataFromUrl = (onlyFilters) => Object.keys(resolveQuery())
    .filter((f) => (onlyFilters ? !nonFilters.has(f) : nonFilters.has(f)))
  // eslint-disable-next-line unicorn/prefer-object-from-entries
    .reduce(reduceFilters(resolveQuery()), {});

  const getFacetsFromURL = () => ({
    filters: getFiltersDataFromUrl(true),
    itemsPerPage: Number.parseInt(resolveQuery().itemsPerPage as string, 10) || 10,
    page: Number.parseInt(resolveQuery().page as string, 10) || 1,
    sort: resolveQuery().sort as string || '',
    term: resolveQuery().term as string,
  });

  const changeSearchTerm = (term: string) => term;

  const getSearchTermFromUrl = () => ({
    page: Number.parseInt(resolveQuery().page as string, 10) || 1,
    sort: resolveQuery().sort || '',
    filters: getFiltersDataFromUrl(true),
    itemsPerPage: Number.parseInt(resolveQuery().itemsPerPage as string, 10) || 10,
    term: resolveQuery().term,
  });

  const getCatLink = (category: Category): string => `/c/${category.url_path}${category.url_suffix || ''}`;

  const getAgnosticCatLink = (category: AgnosticCategoryTree): string => `/c${category.slug}`;

  const changeSorting = async (sort: string, callback = null) => {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location;
      const path = router.resolve({ query: { ...resolveQuery(), sort }, path: (pathname) }).route.fullPath;
      if (callback !== null) {
        callback(path);
      } else {
        await router.push(path);
      }
    } else {
      await router.push({ query: { ...query, sort } });
    }
  };

  const changeFilters = async (filters: any, callback = null) => {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location;
      const path = router.resolve({ query: { ...resolveQuery(), ...getFiltersDataFromUrl(false), ...filters }, path: (pathname) }).route.fullPath;
      if (callback !== null) {
        callback(path);
      } else {
        await router.push(path);
      }
    } else {
      await router.push({
        query: {
          ...getFiltersDataFromUrl(false),
          ...filters,
        },
      });
    }
  };

  const changeItemsPerPage = async (itemsPerPage: number, callback = null) => {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location;
      const path = router.resolve({ query: { ...resolveQuery(), ...getFiltersDataFromUrl(false), itemsPerPage }, path: (pathname) }).route.fullPath;
      if (callback !== null) {
        callback(path);
      } else {
        await router.push(path);
      }
    } else {
      await router.push({
        query: {
          ...getFiltersDataFromUrl(false),
          itemsPerPage,
        },
      });
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

  const isFacetColor = (facet: AgnosticFacet): boolean => facet.id === 'color';

  const isFacetCheckbox = (): boolean => false;

  return {
    getFacetsFromURL,
    getCatLink,
    getAgnosticCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl,
    changeSearchTerm,
  };
};

export default useUiHelpers;
