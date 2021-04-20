import { SearchData } from '../../types';

const buildBreadcrumbsList = (rootCat, bc) => {
  const newBc = [...bc, {
    text: rootCat.name,
    link: rootCat.slug,
  }];
  return rootCat.parent ? buildBreadcrumbsList(rootCat.parent, newBc) : newBc;
};

export const buildBreadcrumbs = (rootCat) => buildBreadcrumbsList(rootCat, [])
  .reverse()
  .reduce((prev, curr, index) => ([
    ...prev,
    {
      ...curr,
      link: `${prev[index - 1]?.link || ''}/${curr.link}`,
    }]),
  []);

const filterFacets = (criteria) => (f) => (criteria ? criteria.includes(f) : true);

const getFacetTypeByCode = (code) => {
  if (code === 'type_of_stones') {
    return 'radio';
  }
  return 'checkbox';
};

const createFacetsFromOptions = (facets, filters, filterKey) => {
  const options = facets[filterKey]?.options || [];
  const selectedList = filters && filters[filterKey] ? filters[filterKey] : [];

  return options
    .map(({
      label,
      value,
    }) => ({
      type: getFacetTypeByCode(facets[filterKey]?.attribute_code),
      id: value,
      attrName: label,
      value,
      selected: selectedList.includes(value),
      count: null,
    }));
};

export const reduceForFacets = (facets, filters) => (prev, curr) => ([
  ...prev,
  ...createFacetsFromOptions(facets, filters, curr),
]);

export const reduceForGroupedFacets = (facets, filters) => (prev, curr) => ([
  ...prev,
  {
    id: facets[curr].attribute_code,
    label: facets[curr].default_frontend_label,
    options: createFacetsFromOptions(facets, filters, curr),
    count: null,
  },
]);

export const buildFacets = (searchData: SearchData, reduceFn, criteria?: string[]) => {
  if (!searchData.data) {
    return [];
  }

  const {
    data: { availableFilters: facets },
    input: { filters },
  } = searchData;

  return Object.keys(facets || [])
    .filter(filterFacets(criteria))
    .reduce(reduceFn(facets, filters), []);
};
