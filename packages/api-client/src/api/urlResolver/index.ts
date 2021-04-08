import { ApolloQueryResult } from 'apollo-client';
import { UrlResolver } from '../../types/GraphQL';
import query from './query';
import { Context } from '../../types/context';

const getUrl = async ({ client }: Context, url: string): Promise<ApolloQueryResult<UrlResolver>> => client.query({
  query,
  variables: { url },
});

export default getUrl;
