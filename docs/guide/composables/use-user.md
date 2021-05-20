# useUser

## Features
`useUser` composable can be used to:
* manage user authentication
* manage authentication data like email address, login or password.
* If you want to fetch/save other user data you should use the following composables:
  * `useUserBilling`
  * `useUserShipping`
  * `useUserOrders`

## API
```typescript
interface UseUser<USER, UPDATE_USER_PARAMS> {
  user: ComputedProperty<USER>;
  setUser: (user: USER) => void;
  updateUser: (params: {
    user: UPDATE_USER_PARAMS;
  }) => Promise<void>;
  register: (params?: {
    user: UseUserRegisterParams;
  }) => Promise<void>;
  login: (params?: {
    user: UseUserLoginParams;
  }) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (params: {
    current: string;
    new: string;
  }) => Promise<void>;
  load: () => Promise<void>;
  isAuthenticated: Ref<boolean>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUserErrors>;
}

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  gender?: MagentoCustomerGender,
  taxvat?: string;
  prefix?: string
  suffix?: string
};

export type RegisterUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
```

* `user` - reactive object containing information about current user.
* `setUser` - function for setting user session.
* `updateUser` - function for updating user data. When invoked, it submits data to the API and populates user property with updated information. This method accepts a single params object.
* `register` - function for creating a new user. When invoked, it submits new user data to the API and saves them. This method accepts a single params object.
* `login` - function for log in a user based on a username and password. This method accepts a single params object.
* `logout` - function for logout a user.
* `changePassword` - function for changing user password. This method accepts a single params object.
* `load` - fetch user information `isAuthenticated`.
* `isAuthenticated` - checks if user is authenticated or not.
* `loading` - reactive object containing information about loading state of user.
* `error` - reactive object containing the error message, if some properties failed for any reason.

## Getters
```typescript
interface UserGetters<USER> {
    getFirstName: (customer: USER) => string;
    getLastName: (customer: USER) => string;
    getFullName: (customer: USER) => string;
    getEmailAddress: (customer: USER) => string;
}
```
* `getFirstName` - returns user first name.
* `getLastName` - returns user last name.
* `getFullName` - returns full user name.
* `getEmailAddress` - returns user email address.

## Example
```javascript
import { onSSR } from '@vue-storefront/core';
import {
  useUser
} from '@vue-storefront/magento';

export default {
  setup () {
    const { user, isAuthenticated, load: loadUser, loading } = useUser();

    onSSR(async () => {
      await loadUser();
    });

    return {
      loading,
      isAuthenticated,
      firstName: userGetters.getFirstName(user.value),
      email: userGetters.getEmailAddress(user.value)
    }
  }
}
```
