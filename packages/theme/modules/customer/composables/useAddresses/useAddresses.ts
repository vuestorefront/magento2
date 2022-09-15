import type { Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { CustomerAddress } from '~/modules/GraphQL/types';
import { CustomQuery, CustomHeaders } from '~/types/core';

/**
 * Errors that occured in the {@link useAddresses|useAddresses()} composable
 */
export interface UseAddressesErrors {
  /**
   * Contains error if `load` method failed, otherwise is `null`
   */
  load: Error | null;

  /**
   * Contains error if `save` method failed, otherwise is `null`
   */
  save: Error | null;

  /**
   * Contains error if `remove` method failed, otherwise is `null`
   */
  remove: Error | null;

  /**
   * Contains error if `update` method failed, otherwise is `null`
   */
  update: Error | null;
}

/**
 * The params object accepted by the `save`, `update` and `remove` methods in the {@link useAddresses|useAddresses()} composable
 */
export interface UseAddressesParamsInput {
  address: CustomerAddress;
}

/**
 * Data and methods returned from the {@link useAddresses|useAddresses()} composable
 */
export interface UseAddressesInterface {
  /**
   * Contains errors from the composable methods
   */
  error: Ref<UseAddressesErrors>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Ref<boolean>;

  /**
   * Loads addresses of the current customer
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#getCustomerAddresses} API endpoint
   * and doesn't accept custom queries.
   *
   * @example
   *
   * Loading customer addresses on client side using the `onMounted` Composition API hook:
   *
   * ```typescript
   * import { onMounted, ref } from '@nuxtjs/composition-api';
   * import { useAddresses } from '~/composables';
   *
   * export function {
   *   setup() {
   *     const { load } = useAddresses();
   *     const addresses = ref([]);
   *
   *     onMounted(async () => {
   *       addresses.value = await load();
   *     });
   *   }
   * }
   * ```
   */
  load(customQuery?: CustomQuery, customHeaders?: CustomHeaders): Promise<CustomerAddress[]>;

  /**
   * Saves a new address in the profile of the current customer
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#createCustomerAddress} API endpoint
   * and doesn't accept custom queries.
   *
   * @example
   *
   * Save a new customer address using an event handler/function:
   *
   * ```typescript
   * import { ref, useFetch } from '@nuxtjs/composition-api';
   * import { useAddresses, UseAddressesParamsInput } from '~/composables';
   *
   * export default {
   *   setup(props) {
   *     const { error, load } = useAddresses();
   *     const addresses = ref([]);
   *
   *     useFetch(async () => {
   *       addresses.value = await load();
   *     });
   *
   *     const onSaveAddress = async (input: UseAddressesParamsInput) => {
   *       const newAddress = await save(input);
   *
   *       if (error.value.save) {
   *         // handle saving error
   *       }
   *
   *       addresses.value.push(newAddress);
   *     };
   *   }
   * }
   * ```
   */
  save(params: ComposableFunctionArgs<UseAddressesParamsInput>): Promise<CustomerAddress>;

  /**
   * Updates an existing address in the profile of the current customer
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#updateCustomerAddress} API endpoint
   * and doesn't accept custom queries.
   *
   * @example
   *
   * Update a customer address using an event handler/function:
   *
   * ```typescript
   * import { ref, useFetch } from '@nuxtjs/composition-api';
   * import { useAddresses, UseAddressesParamsInput } from '~/composables';
   *
   * export default {
   *   setup(props) {
   *     const { error, load, update } = useAddresses();
   *     const addresses = ref([]);
   *
   *     useFetch(async () => {
   *       addresses.value = await load();
   *     });
   *
   *     const onUpdateAddress = async (input: UseAddressesParamsInput) => {
   *       const updatedAddress = await update(input);
   *
   *       if (error.value.update) {
   *         // handle updating error
   *       }
   *
   *       addresses.value = addresses.value.map((address) => {
   *         if (address.id === updatedAddress.id) {
   *           return updatedAddress;
   *         }
   *
   *         return address;
   *       });
   *     };
   *   }
   * }
   * ```
   */
  update(params: ComposableFunctionArgs<UseAddressesParamsInput>): Promise<CustomerAddress>;

  /**
   * Removes an existing address from the profile of the current customer
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#deleteCustomerAddress} API endpoint
   * and doesn't accept custom queries.
   *
   * @example
   *
   * Remove a customer address using event handler/function:
   *
   * ```typescript
   * import { ref, useFetch } from '@nuxtjs/composition-api';
   * import { useAddresses, UseAddressesParamsInput } from '~/composables';
   *
   * export default {
   *   setup(props) {
   *     const { error, load, remove } = useAddresses();
   *     const addresses = ref([]);
   *
   *     useFetch(async () => {
   *       addresses.value = await load();
   *     });
   *
   *     const onRemoveAddress = async (input: UseAddressesParamsInput) => {
   *       const wasRemoved = await remove(input);
   *
   *       if (error.value.remove || !wasRemoved) {
   *         // handle removing error
   *       }
   *
   *       addresses.value = addresses.value.filter((address) => {
   *         return address.id !== input.address.id;
   *       });
   *     };
   *   }
   * }
   * ```
   */
  remove(params: ComposableFunctionArgs<UseAddressesParamsInput>): Promise<boolean>;
}
