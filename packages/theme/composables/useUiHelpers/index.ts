// eslint-disable-next-line import/no-extraneous-dependencies
import { Category } from '@vue-storefront/magento-api';
import { AgnosticCategoryTree, AgnosticFacet } from '@vue-storefront/core';
import { getInstance } from '~/helpers/hooks/getInstance';
import { useVueRouter } from '~/helpers/hooks/useVueRouter';

const nonFilters = new Set(['page', 'sort', 'term', 'itemsPerPage']);

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.has(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]],
  };
};

const getFiltersDataFromUrl = (context, onlyFilters) => {
  const { query } = context.$router.history.current;

  return Object.keys(query)
    .filter((f) => (onlyFilters ? !nonFilters.has(f) : nonFilters.has(f)))
    .reduce(reduceFilters(query), {});
};

const useUiHelpers = () => {
  const { route } = useVueRouter();
  const instance = getInstance();

  const getFacetsFromURL = () => {
    const { query } = route;

    return {
      filters: getFiltersDataFromUrl(instance, true),
      itemsPerPage: Number.parseInt(query.itemsPerPage as string, 10) || 10,
      page: Number.parseInt(query.page as string, 10) || 1,
      sort: query.sort as string || '',
      term: query.term as string,
    };
  };

  const changeSearchTerm = (term: string) => term;

  const getSearchTermFromUrl = () => {
    const { query } = route;

    return {
      page: Number.parseInt(query.page as string, 10) || 1,
      sort: query.sort || '',
      filters: getFiltersDataFromUrl(instance, true),
      itemsPerPage: Number.parseInt(query.itemsPerPage as string, 10) || 10,
      term: query.term,
    };
  };

  const getCatLink = (category: Category): string => `/c/${category.url_path}${category.url_suffix || ''}`;

  const getAgnosticCatLink = (category: AgnosticCategoryTree): string => `/c${category.slug}`;

  const changeSorting = (sort: string) => {
    // @ts-ignore
    const { query } = route;
    instance.$router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters: any) => {
    instance.$router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        ...filters,
      },
    });
  };

  const changeItemsPerPage = (itemsPerPage: number) => {
    instance.$router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        itemsPerPage,
      },
    });
  };

  const setTermForUrl = (term: string) => {
    instance.$router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
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
