const enum ProductsQueryType {
  list = 'LIST',
  detail = 'DETAIL',
}
import { ProductAttributeFilterInput, ProductAttributeSortInput, Products} from '../../types/GraphQL';
import {detailQuery, listQuery} from './query';
import {ApolloQueryResult} from 'apollo-client';

const getProduct = async({ client },
  pageSize = 20,
  currentPage = 1,
  queryType: ProductsQueryType = ProductsQueryType.list,
  search?: string,
  filter?: ProductAttributeFilterInput,
  sort?: ProductAttributeSortInput): Promise<ApolloQueryResult<Products>> => {
  const query = queryType === ProductsQueryType.list ? listQuery : detailQuery;

  return await client.query({
    query: query,
    variables: {search, filter, pageSize, currentPage, sort}
  });
};

export default getProduct;
