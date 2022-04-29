import type { Ref, DeepReadonly } from '@nuxtjs/composition-api';
import type { User } from '~/modules/customer/composables/useUser/useUser';
import type { CustomerAddress } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '~/composables/types';

/**
 * Errors that occured in the `useUserAddress` composable
 */
export interface UseUserAddressErrors {
  addAddress: Error | null;
  deleteAddress: Error | null;
  updateAddress: Error | null;
  load: Error | null;
  setDefaultAddress: Error | null;
}

/**
 * Parameters accepted by the `addAddress` method in the `useUserAddress` composable
 */
export type UseUserAddressAddAddressParams = ComposableFunctionArgs<{
  address: CustomerAddress;
}>;

/**
 * Parameters accepted by the `updateAddress` method in the `useUserAddress` composable
 */
export type UseUserAddressUpdateAddressParams = ComposableFunctionArgs<{
  address: CustomerAddress;
}>;

/**
 * Parameters accepted by the `setDefaultAddress` method in the `useUserAddress` composable
 */
export type UseUserAddressSetDefaultAddressParams = ComposableFunctionArgs<{
  address: CustomerAddress;
}>;

/**
 * Represents the data returned from and functions available in the `useUserAddress()` composable.
 */
export interface UseUserAddressInterface {
  /**
   * Adds address to the profile of the current user
   */
  addAddress(params: UseUserAddressAddAddressParams): Promise<CustomerAddress>;

  /**
   * Deletes address from the profile of the current user
   */
  deleteAddress(address: CustomerAddress): Promise<boolean | {}>; // TODO: Should accept custom queries

  /**
   * Updates an existing address from the profile of the current user
   */
  updateAddress(params: UseUserAddressUpdateAddressParams): Promise<CustomerAddress>;

  /**
   * Loads addresses from the profile of the current user
   */
  load(force?: boolean): Promise<User>; // TODO: Should accept custom queries

  /**
   * Sets an existing address as the default for the current user
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
