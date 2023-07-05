import { FetchResult } from '@apollo/client/core';
import type { CustomHeaders, SubscribeEmailToNewsletterMutation, SubscribeEmailToNewsletterMutationVariables } from '@vue-storefront/magento-types';
import gql from 'graphql-tag';
import subscribeEmailToNewsletterMutation from './subscribeEmailToNewsletter';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Subscribes an email in the newsletter.
 * @param context VSF context
 * @param input params with the email to subscribe
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function subscribeEmailToNewsletter(
  context: Context,
  { email }: SubscribeEmailToNewsletterMutationVariables,
  customHeaders: CustomHeaders = {}
): Promise<FetchResult<SubscribeEmailToNewsletterMutation>> {
  return context.client.mutate<SubscribeEmailToNewsletterMutation, SubscribeEmailToNewsletterMutationVariables>({
    mutation: gql`
      ${subscribeEmailToNewsletterMutation}
    `,
    variables: {
      email,
    },
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
