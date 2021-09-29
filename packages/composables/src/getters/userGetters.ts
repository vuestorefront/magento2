/* istanbul ignore file */
import { UserGetters as BaseUserGetters } from '@vue-storefront/core';
import { User } from '../types';

export const getFirstName = (user: User): string => (user ? user.firstname : '');

export const getLastName = (user: User): string => (user ? user.lastname : '');

export const getEmailAddress = (user: User): string => (user ? user.email : '');

export const getRemoteShoppingAssistance = (user: User): boolean => (user ? user.allow_remote_shopping_assistance : false);

export const getFullName = (user: User): string => (user ? `${user.firstname} ${user.lastname}` : '');

export interface UserGetters extends BaseUserGetters<User>{
  getRemoteShoppingAssistance(user: User): boolean;
}

const userGetters: UserGetters = {
  getFirstName,
  getLastName,
  getEmailAddress,
  getFullName,
  getRemoteShoppingAssistance,
};

export default userGetters;
