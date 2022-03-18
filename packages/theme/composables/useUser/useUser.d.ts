import { ComposableFunctionArgs } from '@vue-storefront/core';
import { Ref } from '@nuxtjs/composition-api';

export interface UseUserErrors {
  updateUser: Error;
  register: Error;
  login: Error;
  logout: Error;
  changePassword: Error;
  load: Error;
}

export interface Customer {
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

export type UseUser = {
  user: Ref<Customer>
  loading: Ref<boolean>
  isAuthenticated: Ref<boolean>
  error: Ref<UseUserErrors>
  setUser: (newUser: Customer) => void
  updateUser: (
    params: ComposableFunctionArgs<{
      user: Customer
    }>
  ) => Promise<void>
  register: (
    params: ComposableFunctionArgs<{
      user: Customer
    }>
  ) => Promise<void>
  login: (
    params: ComposableFunctionArgs<{
      user: Customer
    }>
  ) => Promise<void>
  logout: (
    params: ComposableFunctionArgs<{}>
  ) => Promise<void>
  changePassword: (
    params: ComposableFunctionArgs<{
      current: string,
      new: string
    }>
  ) => Promise<void>
  load: (
    params?: ComposableFunctionArgs<{}>
  ) => Promise<Customer>
};
