import { categoryList, CategoryFilterInput } from '../../types/GraphQL';
import { ApolloQueryResult } from 'apollo-client';
import { query, filteredQuery } from './query';

const getCategory = async ({ client }, categoryFilter?: CategoryFilterInput): Promise<ApolloQueryResult<categoryList>> => {
  if (!categoryFilter) {
    return await client.query({
      query: query
    });
  } else {
    return await client.query({
      query: filteredQuery,
      variables: { filters: categoryFilter }
    });
  }
};

export default getCategory;
