/* istanbul ignore file */
import { UserGetters as BaseUserGetters } from '@vue-storefront/core';
import { Customer } from '@vue-storefront/magento-api';

export const getFirstName = (user: Customer): string => (user ? user.firstname : '');

export const getLastName = (user: Customer): string => (user ? user.lastname : '');

export const getEmailAddress = (user: Customer): string => (user ? user.email : '');

export const getRemoteShoppingAssistance = (user: Customer): boolean => (user ? user.allow_remote_shopping_assistance : false);

export const getFullName = (user: Customer): string => (user ? `${user.firstname} ${user.lastname}` : '');

export interface UserGetters extends BaseUserGetters<Customer>{
  getRemoteShoppingAssistance(user: Customer): boolean;
}

const userGetters: UserGetters = {
  getFirstName,
  getLastName,
  getEmailAddress,
  getFullName,
  getRemoteShoppingAssistance,
};

export default userGetters;
