import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import subscribeEmailToNewsletterMutation from './subscribeEmailToNewsletter';
import type { SubscribeEmailToNewsletterMutation, SubscribeEmailToNewsletterMutationVariables } from '../../types/GraphQL';
import { Context } from '../../types/context';

/**
 * Subscribes an email in the newsletter.
 * @param context VSF context
 * @param input params with the email to subscribe
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 */
export default async function subscribeEmailToNewsletter(
  context: Context,
  { email }: SubscribeEmailToNewsletterMutationVariables,
  customQuery: CustomQuery = { subscribeEmailToNewsletter: 'subscribeEmailToNewsletter' },
): Promise<FetchResult<SubscribeEmailToNewsletterMutation>> {
  const { subscribeEmailToNewsletter: subscribeEmailToNewsletterGQL } = context.extendQuery(customQuery, {
    subscribeEmailToNewsletter: {
      query: subscribeEmailToNewsletterMutation,
      variables: {
        email,
      },
    },
  });

  return context.client.mutate<SubscribeEmailToNewsletterMutation, SubscribeEmailToNewsletterMutationVariables>({
    mutation: subscribeEmailToNewsletterGQL.query,
    variables: subscribeEmailToNewsletterGQL.variables,
  });
}
