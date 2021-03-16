import { cmsPageQuery } from '../../types/GraphQL';
import { ApolloQueryResult } from 'apollo-client';
import query from './query';

const getCmsPage = async ({ client }, identifier: string): Promise<ApolloQueryResult<cmsPageQuery>> => {
  return await client.query({
    query: query,
    variables: { identifier },
    fetchPolicy: 'no-cache'
  });
};

export default getCmsPage;
