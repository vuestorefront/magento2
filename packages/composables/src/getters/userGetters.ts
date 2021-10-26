/* istanbul ignore file */
import { UserGetters as BaseUserGetters } from '@absolute-web/vsf-core';
import { Customer } from '@absolute-web/magento-api';

export const getFirstName = (user: Customer): string => (user ? user.firstname : '');

export const getLastName = (user: Customer): string => (user ? user.lastname : '');

export const getEmailAddress = (user: Customer): string => (user ? user.email : '');

export const getFullName = (user: Customer): string => (user ? `${user.firstname} ${user.lastname}` : '');

const userGetters: BaseUserGetters<Customer> = {
  getFirstName,
  getLastName,
  getEmailAddress,
  getFullName,
};

export default userGetters;
