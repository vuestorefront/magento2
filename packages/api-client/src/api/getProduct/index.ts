import { ProductAttributeFilterInput, ProductAttributeSortInput, Products } from '../../types/GraphQL';
import query from './query';
import { ApolloQueryResult } from 'apollo-client';

const getProduct = async ({ client },
  search?: string,
  filter?: ProductAttributeFilterInput,
  pageSize = 20,
  currentPage = 1,
  sort?: ProductAttributeSortInput): Promise<ApolloQueryResult<Products>> => {
  return await client.query({
    query: query,
    variables: {
      search,
      filter,
      pageSize,
      currentPage,
      sort
    }
  });
};

export default getProduct;
