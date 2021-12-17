import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import subscribeEmailToNewsletter from './subscribeEmailToNewsletter';
import {
  SubscribeEmailToNewsletterMutation, SubscribeEmailToNewsletterMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  { email }: SubscribeEmailToNewsletterMutationVariables,
  customQuery: CustomQuery = { subscribeEmailToNewsletter: 'subscribeEmailToNewsletter' },
): Promise<FetchResult<SubscribeEmailToNewsletterMutation>> => {
  const { subscribeEmailToNewsletter: subscribeEmailToNewsletterGQL } = context.extendQuery(
    customQuery,
    {
      subscribeEmailToNewsletter: {
        query: subscribeEmailToNewsletter,
        variables: {
          email,
        },
      },
    },
  );

  return context.client.mutate<SubscribeEmailToNewsletterMutation, SubscribeEmailToNewsletterMutationVariables>({
    mutation: subscribeEmailToNewsletterGQL.query,
    variables: subscribeEmailToNewsletterGQL.variables,
  });
};
