import { ProductAttributeFilterInput, ProductAttributeSortInput, Products } from '../../types/GraphQL';
import { detailQuery, listQuery } from './query';
import { ApolloQueryResult } from 'apollo-client';

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
}

const getProduct = async({ client },
  pageSize = 20,
  currentPage = 1,
  queryType: ProductsQueryType = ProductsQueryType.list,
  search?: string,
  filter?: ProductAttributeFilterInput,
  sort?: ProductAttributeSortInput): Promise<ApolloQueryResult<Products>> => {
  const query = queryType === ProductsQueryType.list ? listQuery : detailQuery;

  const variables: Variables = { pageSize, currentPage };
  if (search) variables.search = search;
  if (filter) variables.filter = filter;
  if (sort) variables.sort = sort;

  return await client.query({
    query,
    variables
  });
};

export default getProduct;
