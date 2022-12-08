import type { Ref, DeepReadonly } from '@nuxtjs/composition-api';
import type { CustomerAddress } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '~/composables/types';
import { Customer } from '~/modules/GraphQL/types';
import { CustomQuery, CustomHeaders } from '~/types/core';

/**
 * Errors that occured in the {@link UseUserAddressErrors|UseUserAddressErrors()} composable
 */
export interface UseUserAddressErrors {
  /**
   * Contains error if `addAddress` method failed, otherwise is `null`
   */
  addAddress: Error | null;

  /**
   * Contains error if `deleteAddress` method failed, otherwise is `null`
   */
  deleteAddress: Error | null;

  /**
   * Contains error if `updateAddress` method failed, otherwise is `null`
   */
  updateAddress: Error | null;

  /**
   * Contains error if `load` method failed, otherwise is `null`
   */
  load: Error | null;

  /**
   * Contains error if `setDefaultAddress` method failed, otherwise is `null`
   */
  setDefaultAddress: Error | null;
}

/**
 * The params object accepted by the `addAddress` method in the {@link useUserAddress|useUserAddress()} composable
 */
export type UseUserAddressAddAddressParams = ComposableFunctionArgs<{
  address: CustomerAddress;
}>;

/**
 * The params object accepted by the `updateAddress` method in the {@link useUserAddress|useUserAddress()} composable
 */
export type UseUserAddressUpdateAddressParams = ComposableFunctionArgs<{
  address: CustomerAddress;
}>;

/**
 * The params object accepted by the `setDefaultAddress` method in the {@link useUserAddress|useUserAddress()} composable
 */
export type UseUserAddressSetDefaultAddressParams = ComposableFunctionArgs<{
  address: CustomerAddress;
}>;

/**
 * Data and methods returned from the {@link useUserAddress|useUserAddress()} composable
 */
export interface UseUserAddressInterface {
  /**
   * Adds address to the profile of the current user
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#createCustomerAddress} API endpoint
   * and accepts the custom queries named `createCustomerAddress`.
   */
  addAddress(params: UseUserAddressAddAddressParams): Promise<CustomerAddress>;

  /**
   * Deletes address from the profile of the current user
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#deleteCustomerAddress} API endpoint
   * and accepts the custom queries named `deleteCustomerAddress`.
   */
  deleteAddress(address: CustomerAddress, customQuery: CustomQuery, customHeaders: CustomHeaders): Promise<boolean | {}>;

  /**
   * Updates an existing address from the profile of the current user
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#updateCustomerAddress} API endpoint
   * and accepts the custom queries named `updateCustomerAddress`.
   */
  updateAddress(params: UseUserAddressUpdateAddressParams): Promise<CustomerAddress>;

  /**
   * Loads addresses from the profile of the current user
   */
  load(force?: boolean): Promise<Customer>; // TODO: Should accept custom queries

  /**
   * Sets an existing address as the default for the current user
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#updateCustomerAddress} API endpoint
   * and accepts the custom queries named `updateCustomerAddress`.
   */
  setDefaultAddress(params: UseUserAddressSetDefaultAddressParams): Promise<CustomerAddress>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: DeepReadonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods
   */
  error: DeepReadonly<Ref<UseUserAddressErrors>>;
}
