import { defineStore } from 'pinia';
import type { Customer } from '~/modules/GraphQL/types';

interface CustomerState {
  user: Customer | null,
  isLoggedIn: boolean,
}

export const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    setIsLoggedIn(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn;
    },
  },
});
