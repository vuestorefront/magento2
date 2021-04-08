import { ApolloQueryResult } from 'apollo-client';
import { CategoryTree, CategoryFilterInput } from '../../types/GraphQL';
import { query } from './query';
import { Context } from '../../types/context';

const categoryList = async ({ client }: Context, filters: CategoryFilterInput): Promise<ApolloQueryResult<CategoryTree[]>> => client.query({
  query,
  variables: { filters },
});

export default categoryList;
