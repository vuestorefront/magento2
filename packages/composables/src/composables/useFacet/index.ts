import { Context, useFacetFactory, FacetSearchResult, ProductsSearchParams } from '@vue-storefront/core';
import { CategoryFilterInput, ProductAttributeFilterInput } from '@vue-storefront/magento-api'

const availableSortingOptions = [{
  value: 'name',
  label: 'Name'
}, {
  value: 'price-up',
  label: 'Price from low to high'
}, {
  value: 'price-down',
  label: 'Price from high to low'
}];


const constructFilterObject = (obj: Object) => {
  /*
  return Object.entries(obj)
    .reduce((prev, [value, options]) => {
      if (value !== 'price') {
        prev[value] = { in: options.map(({ value }) => value.toString()) };
      } else {
        const val = options[0].value.split('_');
        prev[value] = {
          from: decodeURIComponent(val[0].toString()),
          to: decodeURIComponent(val[1].toString())
        };
      }
      // eslint-disable-next-line camelcase,@typescript-eslint/camelcase
      return prev;
    }, {});
  */
  let filters = {};
  console.log(Object.entries(obj));
  for (const [key, value] of Object.entries(obj)) {
    if(value.length === 0)
      return;
    if (!filters[key]) {
      filters[key] = {
        "in": value.join(''),
        "scope": "catalog"
      };
    } else {
      filters[key].in = filters[key].in + "," + value.join('');
    }
  }

  return filters;
};

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    const itemsPerPage = params.input.itemsPerPage;
    const categoryParams: CategoryFilterInput = {
      filters: {
        url_path: {
          eq: params.input.categorySlug
        }
      }
    };

    const categoryResponse = await context.$ma.api.categoryList(
      categoryParams.perPage,
      categoryParams.page,
      categoryParams.filter,
      categoryParams.search,
      categoryParams.sort,
    );
    
    // What happen if not exsits?
    const category = categoryResponse.data.categoryList[0];
    const inputFilters = params.input.filters;
    
    const productParams: ProductAttributeFilterInput = {
      filter: {
        category_id: {
            eq: category.id
        }
      },
      perPage: itemsPerPage,
      offset: (params.input.page - 1) * itemsPerPage,
      page: params.input.page
    };
    
    const productResponse = await context.$ma.api.getProduct(
      productParams.perPage,
      productParams.page,
      Object.assign(productParams.filter, constructFilterObject(params.input.filters)),
      productParams.queryType,
      productParams.search,
      productParams.sort
    );

    const data = {
      items: productResponse?.data?.products?.items || [],
      total: productResponse?.data?.products?.total_count?.value || 0,
      availableFilters: productResponse?.data?.products?.attribute_metadata,
      category: category,
      availableSortingOptions
    };
    
    return data;
  },
};

export default useFacetFactory<any>(factoryParams);
