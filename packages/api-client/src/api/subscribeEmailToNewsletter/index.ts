import { FetchResult } from "@apollo/client/core";
import type { CustomHeaders, SubscribeEmailToNewsletterMutation, SubscribeEmailToNewsletterMutationVariables } from "@vue-storefront/magento-types";
import gql from "graphql-tag";
import subscribeEmailToNewsletterMutation from "./subscribeEmailToNewsletter";
import { Context } from "../../types/context";
import getHeaders from "../getHeaders";

/**
 * Allows guests and registered customers to sign up to receive newsletters.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // subscribe an email in the newsletter. * const email = 'somemail@vsf.local';
 * const result = await sdk.magento.subscribeEmailToNewsletter({ email });
 *
 * result.data?.subscribeEmailToNewsletter?.status; // status of the operation. Possible values: https://developer.adobe.com/commerce/webapi/graphql/schema/customer/mutations/subscribe-email-to-newsletter/#subscriptionstatusesenum
 * ```
 */
export async function subscribeEmailToNewsletter(
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
