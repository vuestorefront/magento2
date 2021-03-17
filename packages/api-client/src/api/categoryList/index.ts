import { CategoryTree, CategoryFilterInput } from '../../types/GraphQL';
import { ApolloQueryResult } from 'apollo-client';
import { query } from './query';

const categoryList = async ({ client }, filters: CategoryFilterInput): Promise<ApolloQueryResult<CategoryTree[]>> => {
  return await client.query({
    query,
    variables: { filters }
  });
};

export default categoryList;
