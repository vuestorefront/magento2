import { ApolloQueryResult } from 'apollo-client';
import { ProductAttributeFilterInput, ProductAttributeSortInput, Products } from '../../types/GraphQL';
import { detailQuery, listQuery } from './query';
import { Context } from '../../types/context';

const enum ProductsQueryType {
  list = 'LIST',
  detail = 'DETAIL',
}

type Variables = {
  pageSize: number;
  currentPage: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};
type GetProductParams = {
  pageSize: number;
  currentPage: number;
  queryType: ProductsQueryType;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
};

const getProduct = async ({ client }: Context,
  params: GetProductParams): Promise<ApolloQueryResult<Products>> => {
  const defaultParams: GetProductParams = {
    pageSize: 20,
    currentPage: 1,
    queryType: ProductsQueryType.list,
    ...params,
  };

  const query = defaultParams.queryType === ProductsQueryType.list ? listQuery : detailQuery;

  const variables: Variables = {
    pageSize: defaultParams.pageSize,
    currentPage: defaultParams.currentPage,
  };
  if (defaultParams.search) variables.search = defaultParams.search;
  if (defaultParams.filter) variables.filter = defaultParams.filter;
  if (defaultParams.sort) variables.sort = defaultParams.sort;

  return client.query({
    query,
    variables,
  });
};

export default getProduct;
