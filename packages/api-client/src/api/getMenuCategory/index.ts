import { CustomQuery } from '@vue-storefront/core';
import { Context } from '../../types/context';
import {
  CategoryFilterInput,
  GetMenuCategoryQuery,
  GetMenuCategoryQueryVariables,
} from '../../types/GraphQL';
import query from './query.graphql';

export default async (
  context: Context,
  params: CategoryFilterInput,
  customQuery?: CustomQuery,
): Promise<GetMenuCategoryQuery> => {
  const defaultVariables = params ? {
    ids: params.ids,
    name: params.name,
    url_key: params.url_key,
  } : {};

  const { categories } = context.extendQuery(customQuery,
    {
      categories: {
        query,
        variables: defaultVariables,
      },
    });

  try {
    const { data } = await context.client.query<GetMenuCategoryQuery, GetMenuCategoryQueryVariables>({
      query,
      variables: categories.variables,
      fetchPolicy: 'no-cache',
    });

    return data;
  } catch (error) {
    throw error.graphQLErrors?.[0] || error.networkError?.result || error;
  }
};
