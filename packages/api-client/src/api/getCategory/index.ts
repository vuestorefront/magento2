import { CategoryFilterInput, categoryList } from '../../types/GraphQL';
import { filteredQuery, query } from './query';
import { ApolloQueryResult } from 'apollo-client';

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
