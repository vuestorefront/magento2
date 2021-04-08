import { ApolloQueryResult } from 'apollo-client';
import { CmsPageQuery } from '../../types/GraphQL';
import query from './query';
import { Context } from '../../types/context';

const getCmsPage = async ({ client }: Context, identifier: string): Promise<ApolloQueryResult<CmsPageQuery>> => client.query({
  query,
  variables: { identifier },
  fetchPolicy: 'no-cache',
});

export default getCmsPage;
