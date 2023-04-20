import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vsf-enterprise/magento-api-types';
import type {
  SubscribeEmailToNewsletterMutation,
  SubscribeEmailToNewsletterMutationVariables,
  CustomHeaders,
} from '@vsf-enterprise/magento-api-types';
import subscribeEmailToNewsletterMutation from './subscribeEmailToNewsletter';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Subscribes an email in the newsletter.
 * @param context VSF context
 * @param input params with the email to subscribe
 * @param [customQuery] (optional) - custom GraphQL query that extends the default query
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function subscribeEmailToNewsletter(
  context: Context,
  { email }: SubscribeEmailToNewsletterMutationVariables,
  customQuery: CustomQuery = { subscribeEmailToNewsletter: 'subscribeEmailToNewsletter' },
  customHeaders: CustomHeaders = {},
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
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
