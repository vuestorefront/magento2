import { ApolloQueryResult } from '@apollo/client/core';
import { FocusProductAttributeQuery, FocusProductAttributeQueryVariables } from '../../types/GraphQL';
import focusProductAttribute from './focusProductAttribute';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  attribute_code: string,
): Promise<ApolloQueryResult<FocusProductAttributeQuery>> => client
  .query<FocusProductAttributeQuery, FocusProductAttributeQueryVariables>({
  query: focusProductAttribute,
  variables: { attribute_code },
  fetchPolicy: 'cache-first',
});
