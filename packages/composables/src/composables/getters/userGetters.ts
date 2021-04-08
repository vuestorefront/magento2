/* istanbul ignore file */
import { UserGetters } from '@vue-storefront/core';
import { User } from '../../types';

export const getUserFirstName = (user: User): string => (user ? user.firstname : '');
export const getUserLastName = (user: User): string => (user ? user.lastname : '');
export const getUserEmail = (user: User): string => (user ? user.email : '');
export const getUserFullName = (user: User): string => (user ? `${user.firstName} ${user.lastName}` : '');

const userGetters: UserGetters<User> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getEmailAddress: getUserEmail,
  getFullName: getUserFullName,
};

export default userGetters;
