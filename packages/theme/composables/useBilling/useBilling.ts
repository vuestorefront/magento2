import { Ref } from '@nuxtjs/composition-api';
import { BillingCartAddress } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs } from '~/composables/types';
import type BillingDetails from './BillingDetails';

/**
 * The {@link useBilling} error object. The properties values' are the errors
 * thrown by its methods.
 *
 * @example
 *
 * Check if saving the billing information was failed:
 *
 * ```typescript
 * import { useBilling, UseBillingSaveParams } from '~/composables';
 *
 * export default {
 *   setup() {
 *     const { error, save } = useBilling();
 *
 *     const onSave = async (params: UseBillingSaveParams) => {
 *       const newBilling = await save(params);
 *
 *       if (error.value.save) {
 *         // Handle save error
 *       }
 *     };
 *
 *     return { onSave };
 *   },
 * };
 * ```
 */
export interface UseBillingError {
  /** Error when loading the billing information fails, otherwise is `null`. */
  load: Error | null;

  /** Error when saving the billing information fails, otherwise is `null`. */
  save: Error | null;
}

/** The params required by {@link useBilling}'s `load` method. */
export type UseBillingLoadParams = ComposableFunctionArgs<{}>;

/** The params required by {@link useBilling}'s `save` method. */
export interface UseBillingSaveParams {
  billingDetails: BillingDetails;
}

/** The object with refs and methods returned by {@link useBilling} composable. */
export interface UseBillingInterface {
  /** The error object */
  error: Ref<UseBillingError>;

  /**
   * The loading state.
   *
   * It's `true` when loading or saving, and `false` otherwise.
   */
  loading: Ref<boolean>;

  /**
   * A method that loads the billing information.
   *
   * @remarks
   *
   * It supports custom query parameter.
   *
   * - The query parameter key is `cart`;
   *
   * - Should receive `cartId`, of type `String!`, as parameter;
   *
   * - Should return a {@link Cart} with `billing-address` field, of type {@link BillingCartAddress}.
   *
   * @example
   *
   * Load the billing information on server side using the `useFetch` composable:
   *
   * ```typescript
   * import { ref, useFetch } from '@nuxtjs/composition-api';
   * import { useBilling } from '~/composables';
   * import type { BillingCartAddress } from '~/modules/GraphQL/types';
   *
   * export default {
   *   setup() {
   *     const { error, load, loading } = useBilling();
   *
   *     const billing = ref<BillingCartAddress | null>(null);
   *
   *     useFetch(async () => {
   *       billing.value = await load();
   *
   *       if (error.value.load) {
   *         // Handle load errors
   *       }
   *     });
   *
   *     return { billing, loading };
   *   },
   * };
   * ```
   *
   * @example
   *
   * Use custom query to fetch only specific fields:
   *
   * ```typescript
   * // middleware.config.js
   *
   * module.exports = {
   *   integrations: {
   *     'magento': {
   *       location: 'magento',
   *       customQueries: {
   *         'load-only-name-in-billing': (_query, variables) => {
   *           const query = `
   *             query cart($cartId: String!) {
   *               cart(cart_id: $cartId) {
   *                 id
   *                 billing_address {
   *                   firstname
   *                   lastname
   *                 }
   *               }
   *             }
   *           `;
   *
   *           return { query, variables };
   *         },
   *       },
   *     },
   *   },
   * };
   * ```
   *
   * ```typescript
   * // components/BillingName.ts
   *
   * import { ref, useFetch } from '@nuxtjs/composition-api';
   * import { useBilling } from '~/composables';
   *
   * export default {
   *   setup() {
   *     const { error, load, loading } = useBilling();
   *
   *     const billingName = ref<string | null>(null);
   *
   *     useFetch(async () => {
   *       const billing = await load({
   *         customQuery: {
   *           cart: 'load-only-name-in-billing',
   *         },
   *       });
   *
   *       if (billing) {
   *         billingName.value = `${billing.firstname} ${billing.lastname}`;
   *       }
   *     });
   *
   *     return { billingName, loading };
   *   },
   * };
   * ```
   */
  load: (params?: UseBillingLoadParams) => Promise<BillingCartAddress | null>;

  /**
   * A method that saves the billing information.
   *
   * @example
   *
   * Save the billing information using an event handler/function:
   *
   * ```typescript
   * import { ref } from '@nuxtjs/composition-api';
   * import { useBilling, UseBillingSaveParams } from '~/composables';
   * import type { BillingCartAddress } from '~/modules/GraphQL/types';
   *
   * export default {
   *   setup() {
   *     const { error, save, loading: saving } = useBilling();
   *
   *     const newBilling = ref<BillingCartAddress | null>(null);
   *
   *     const onSave = async (params: UseBillingSaveParams) => {
   *       newBilling.value = await save(params);
   *
   *       if (error.value.save) {
   *         // Handle save error
   *       }
   *     };
   *
   *     return { onSave, saving, newBilling };
   *   },
   * };
   * ```
   */
  save: (params: UseBillingSaveParams) => Promise<BillingCartAddress | null>;
}
