import type { SearchData } from './SearchData';

const buildBreadcrumbsList = (rootCat, bc) => {
  const newBc = [...bc, {
    text: rootCat.name,
    link: rootCat.slug,
  }];
  return rootCat.parent ? buildBreadcrumbsList(rootCat.parent, newBc) : newBc;
};

export const buildBreadcrumbs = (rootCat) => buildBreadcrumbsList(rootCat, [])
  .reverse()
  .reduce(
    (prev, curr, index) => ([
      ...prev,
      {
        ...curr,
        link: `${prev[index - 1]?.link || ''}/${curr.link}`,
      }]),
    [],
  );

const filterFacets = (criteria) => (f) => (criteria ? criteria.includes(f.attribute_code) : true);

const createFacetsFromOptions = (facets, filters, facet) => {
  const options = facet.options || [];
  const selectedList = filters && filters[facet.attribute_code] ? filters[facet.attribute_code] : [];
  return options
    .map(({
      label,
      value,
      count,
    }) => ({
      id: label,
      attrName: label,
      value,
      selected: selectedList.includes(value),
      count,
    }));
};

export const reduceForFacets = (facets, filters) => (prev, curr) => ([
  ...prev,
  ...createFacetsFromOptions(facets, filters, curr),
]);

export const reduceForGroupedFacets = (facets, filters) => (prev, curr) => ([
  ...prev,
  {
    id: curr.attribute_code,
    label: curr.label,
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

  return facets?.filter(filterFacets(criteria)).reduce(reduceFn(facets, filters), []);
};
