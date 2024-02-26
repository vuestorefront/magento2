import { Mutation, SubscribeEmailToNewsletterMutationVariables } from '@vue-storefront/magento-types';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';
import { AxiosRequestSender } from '@vue-storefront/sdk-axios-request-sender';
import { client } from '../../client';
import { MethodBaseOptions } from '../../types';

/**
 * mutation type for the {@link subscribeEmailToNewsletter} method.
 */
export type SubscribeEmailToNewsletterMutation = { subscribeEmailToNewsletter: Mutation['subscribeEmailToNewsletter'] };

/**
 * subscribeEmailToNewsletter response type
 */
export type SubscribeEmailToNewsletterResponse<
  T extends DeepPartial<SubscribeEmailToNewsletterMutation> = SubscribeEmailToNewsletterMutation,
> = FetchResult<T>;

/**
 * Method allows guests and registered customers to sign up to receive newsletters.
 *
 * @remarks
 * This method sends a POST request to the
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/subscribeEmailToNewsletter | subscribeEmailToNewsletter } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/subscribeEmailToNewsletter | here}.
 *
 * @param params -
 * Parameter object which can be used with this method.
 * Refer to its type definition to learn about possible properties.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link https://docs.vuestorefront.io/integrations/magento/api/magento-api/SubscribeEmailToNewsletterResponse | SubscribeEmailToNewsletterResponse}.
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
export async function subscribeEmailToNewsletter<RES extends SubscribeEmailToNewsletterResponse>(
  params: SubscribeEmailToNewsletterMutationVariables,
  options?: MethodBaseOptions,
) {
  return new AxiosRequestSender(client)
    .setUrl('subscribeEmailToNewsletter')
    .setMethod('POST')
    .setProps([params, options?.customHeaders])
    .setConfig(options?.clientConfig)
    .send<RES>();
}
