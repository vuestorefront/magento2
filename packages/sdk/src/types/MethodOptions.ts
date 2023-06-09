import { AxiosRequestConfig } from 'axios';

/**
 * Options available for methods which do not use custom queries.
 */
export type MethodBaseOptions = {

  /**
   * {@link https://axios-http.com/docs/req_config | AxiosRequestConfig} object
   * You can use it to override Axios request configuration
   */
  clientConfig?: AxiosRequestConfig;

  /**
   * Custom headers to be sent with the request.
   */
  customHeaders?: Record<string, string>;
}

/**
 * Options available for methods which use custom queries.
 */
export type MethodOptions<CustomQueryType> = MethodBaseOptions & {

  /**
   * Name of the custom GraphQL query function to be executed
   * and an additional metadata object to pass to it.
   *
   * @example
   * Registering the custom query function in `middleware.config.js`:
   *
   * ```ts
   * module.exports = {
   *   integrations: {
   *     magento: {
   *       customQueries: {
   *         'my-custom-query': ({ query, variables, metadata }) => {
   *           variables.customerId = metadata.customerId;
   *           return { query, variables };
   *         }
   *       }
   *     }
   *   }
   * };
   * ```
   *
   * @example
   * Using the previously registered custom query function with
   * an SDK method:
   *
   * ```ts
   * const customQuery = {
   *   createCart: 'my-custom-query',
   *   metadata: {
   *     customerId: '1'
   *   }
   * }
   *
   * const cart = await sdk.commerce.createCart(null, { customQuery });
   * ```
   */
  customQuery?: CustomQueryType;
};
