import type { Ref, ComputedRef } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';

/**
 * Errors that occured in the `useUser` composable
 */
export interface UseUserErrors {
  updateUser: Error | null;
  register: Error | null;
  login: Error | null;
  logout: Error | null;
  changePassword: Error | null;
  load: Error | null;
}

export interface User {
  id: string
  email: string
  firstname: string
  password: string
  is_subscribed: boolean
  middlename? : string
  prefix?: string
  suffix?: string
  taxvat?: string
}

/**
 * Parameters accepted by the `updateUser` method in the `useUser` composable
 */
export type UseUserUpdateUserParams = ComposableFunctionArgs<{
  user: User;
}>;

/**
 * Parameters accepted by the `register` method in the `useUser` composable
 */
export type UseUserRegisterParams = ComposableFunctionArgs<{
  user: any; // TODO: Neither `Customer`, nor `CustomerCreateInput` match expected data
}>;

/**
 * Parameters accepted by the `login` method in the `useUser` composable
 */
export type UseUserLoginParams = ComposableFunctionArgs<{
  user: any; // TODO: Neither `Customer`, nor `CustomerCreateInput` match expected data
}>;

/**
 * Parameters accepted by the `logout` method in the `useUser` composable
 */
export type UseUserLogoutParams = ComposableFunctionArgs<{}>;

/**
 * Parameters accepted by the `changePassword` method in the `useUser` composable
 */
export type UseUserChangePasswordParams = ComposableFunctionArgs<{
  current: string;
  new: string;
}>;

/**
 * Parameters accepted by the `load` method in the `useUser` composable
 */
export type UseUserLoadParams = ComposableFunctionArgs<{}>;

/**
 * Represents the data returned from and functions available in the `useUser()` composable.
 */
export interface UseUserInterface {
  /**
   * Overrides the `user` property with the data passed as a parameter
   */
  setUser(newUser: User): void;

  /**
   * Updates the current customer and saves the details returned from the API in the `user` property
   */
  updateUser(params: UseUserUpdateUserParams): Promise<void>;

  /**
   * Registers a new customer and saves details returned from the API in the `user` property
   */
  register(params: UseUserRegisterParams): Promise<void>;

  /**
   * Logs in the customer based on provided username and password and saves the details returned from the API in the `user` property
   */
  login(params: UseUserLoginParams): Promise<void>;

  /**
   * Logs out the current customer
   */
  logout(params: UseUserLogoutParams): Promise<void>;

  /**
   * Changes password of the current customer and saves the details returned from the API in the `user` property
   */
  changePassword(params: UseUserChangePasswordParams): Promise<void>;

  /**
   * Fetches the information about the current customer and saves results from the API in the `user` property
   */
  load(params?: UseUserLoadParams): Promise<User>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods
   */
  error: Readonly<Ref<UseUserErrors>>;

  /**
   * Main data object populated by the `load()` method and updated by other methods in this composable
   */
  user: ComputedRef<User | null>;

  /**
   * Indicates whether the customer is authenticated or not
   */
  isAuthenticated: ComputedRef<boolean>;
}
