import { Ref } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';
import { CustomerAddress } from '~/modules/GraphQL/types';

/**
 * The {@link useAddresses} error object. The properties values' are the errors thrown by its methods.
 *
 * @example
 *
 * Check if removing a customer address failed:
 *
 * ```typescript
 * import { useAddresses } from '~/modules/customer/composables/useAddresses';
 *
 * export default {
 *   setup(props) {
 *     const { error, remove } = useAddresses();
 *
 *     const onRemove = async (address: CustomerAddress) => {
 *       await remove(address);
 *
 *       if (error.value.remove) {
 *         // handle removing error
 *       }
 *     };
 *
 *     return { onRemove };
 *   }
 * }
 * ```
 */
export interface UseAddressesErrors {
  /** Error when loading customer addresses fails, otherwise is `null`. */
  load: Error | null;

  /** Error when saving a new customer address fails, otherwise is `null`. */
  save: Error | null;

  /** Error when removing a customer address fails, otherwise is `null`. */
  remove: Error | null;

  /** Error when updating a customer address fails, otherwise is `null`. */
  update: Error | null;
}

/** The params object required to **save**, **update** or **remove** a customer address. */
export interface UseAddressesParamsInput {
  address: CustomerAddress;
}

/**
 * The refs and methods returned by {@link useAddresses} composable.
 */
export interface UseAddressesInterface {
  /** The error object */
  error: Ref<UseAddressesErrors>;

  /** The loading state. It's `true` when loading, saving, updating, or removing customer addresses and `false` otherwise. */
  loading: Ref<boolean>;

  /**
   * Loads customer addresses.
   *
   * Returns a `Promise` that resolves to a list of {@link CustomerAddress} objects.
   *
   * @example
   *
   * Load customer addresses on client side using the `onMounted` Composition API hook:
   *
   * ```vue
   * <template>
   *   <div v-if="loading">
   *     Loading…
   *   </div>
   *   <div v-else-if="error.load">
   *     Error: {{ error.load.message }}
   *   </div>
   *   <div v-else-if="addresses.length === 0">
   *     No addresses found.
   *   </div>
   *   <div v-else>
   *     <!-- Display addresses in 'v-for' -->
   *   </div>
   * </template>
   *
   * <script lang="ts">
   * import { onMounted, ref } from '@nuxtjs/composition-api';
   * import { useAddresses } from '~/composables';
   *
   * export function {
   *   setup() {
   *     const { error, load, loading } = useAddresses();
   *
   *     const addresses = ref([]);
   *
   *     onMounted(async () => {
   *       addresses.value = await load();
   *     });
   *
   *     return { error, loading, addresses };
   *   }
   * }
   * </script>
   * ```
   */
  load: () => Promise<CustomerAddress[]>;

  /**
   * Saves a new customer address.
   *
   * Returns a `Promise` that resolves to the new {@link CustomerAddress} object.
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
   *     const { error, load, loading, save } = useAddresses();
   *
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
   *
   *     return { addresses, loading, onSaveAddress };
   *   }
   * }
   * ```
   */
  save: (saveParams: ComposableFunctionArgs<UseAddressesParamsInput>) => Promise<CustomerAddress>;

  /**
   * Updates an existing customer address.
   *
   * Returns a `Promise` that resolves to the updated {@link CustomerAddress} object.
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
   *     const { error, load, loading, update } = useAddresses();
   *
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
   *
   *     return { addresses, loading, onUpdateAddress };
   *   }
   * }
   * ```
   */
  update: (updateParams?: ComposableFunctionArgs<UseAddressesParamsInput>) => Promise<CustomerAddress>;

  /**
   * Removes an existing customer address.
   *
   * Returns a `Promise` that resolves to a `boolean`, which is `true` when successful and `false` otherwise.
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
   *     const { error, load, loading, remove } = useAddresses();
   *
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
   *
   *     return { addresses, loading, onRemoveAddress };
   *   }
   * }
   * ```
   */
  remove: (removeParams?: ComposableFunctionArgs<UseAddressesParamsInput>) => Promise<boolean>;
}
