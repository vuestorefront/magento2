import { CustomQuery } from '@vue-storefront/core';
import { Context } from '../../types/context';
import { CategoryFilterInput, CategoryProducts } from '../../types/GraphQL';
import { BaseQuery } from './query';

export default async function getMenuCategory(
  context: Context,
  params: CategoryFilterInput,
  customQuery?: CustomQuery,
): Promise<CategoryProducts> {
  const defaultVariables = params ? {
    ids: params.ids,
    name: params.name,
    url_key: params.url_key,
  } : { };

  const { categories } = context.extendQuery(customQuery,
    {
      categories: {
        query: BaseQuery,
        variables: defaultVariables,
      },
    });

  try {
    const { data } = await context.client.query({
      query: BaseQuery,
      variables: categories.variables,
      // temporary, seems like bug in apollo:
      // @link: https://github.com/apollographql/apollo-client/issues/3234
      fetchPolicy: 'no-cache',
    });

    return data;
  } catch (error) {
    throw error.graphQLErrors?.[0] || error.networkError?.result || error;
  }
}
