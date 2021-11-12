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

  const getFiltersDataFromUrl = (onlyFilters) => Object.keys(query)
    .filter((f) => (onlyFilters ? !nonFilters.has(f) : nonFilters.has(f)))
  // eslint-disable-next-line unicorn/prefer-object-from-entries
    .reduce(reduceFilters(query), {});

  const getFacetsFromURL = () => ({
    filters: getFiltersDataFromUrl(true),
    itemsPerPage: Number.parseInt(query.itemsPerPage as string, 10) || 10,
    page: Number.parseInt(query.page as string, 10) || 1,
    sort: query.sort as string || '',
    term: query.term as string,
  });

  const changeSearchTerm = (term: string) => term;

  const getSearchTermFromUrl = () => ({
    page: Number.parseInt(query.page as string, 10) || 1,
    sort: query.sort || '',
    filters: getFiltersDataFromUrl(true),
    itemsPerPage: Number.parseInt(query.itemsPerPage as string, 10) || 10,
    term: query.term,
  });

  const getCatLink = (category: Category): string => `/c/${category.url_path}${category.url_suffix || ''}`;

  const getAgnosticCatLink = (category: AgnosticCategoryTree): string => `/c${category.slug}`;

  const changeSorting = async (sort: string) => {
    await router.push({ query: { ...query, sort } });
  };

  const changeFilters = async (filters: any) => {
    await router.push({
      query: {
        ...getFiltersDataFromUrl(false),
        ...filters,
      },
    });
  };

  const changeItemsPerPage = async (itemsPerPage: number) => {
    await router.push({
      query: {
        ...getFiltersDataFromUrl(false),
        itemsPerPage,
      },
    });
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
