import { FetchResult, gql } from '@apollo/client/core';
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
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<SubscribeEmailToNewsletterMutation>> {
  return context.client.mutate<SubscribeEmailToNewsletterMutation, SubscribeEmailToNewsletterMutationVariables>({
    mutation: gql`${subscribeEmailToNewsletterMutation}`,
    variables: {
      email,
    },
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
