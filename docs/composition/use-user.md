# useUser composable

`useUser` composable allows loading and manipulating data of the current user.

## API
`useUser` composable returns the following properties:

- `setUser` - function that overrides the `user` property with the data passed as a parameter.
- `updateUser` - function that updates the current customer and saves the details returned from the API in the `user` property.
- `register` - function that registers a new customer and saves details returned from the API in the `user` property.
- `login` - function that logs in the customer based on provided username and password and saves the details returned from the API in the `user` property.
- `logout` - function that logs out the current customer.
- `changePassword` - function that changes password of the current customer and saves the details returned from the API in the `user` property.
- `load` - function that fetches the information about the current customer and saves results from the API in the `user` property.
- `user` - main data object populated by the `load()` method and updated by other methods in this composable.
- `isAuthenticated` - ref that contains information whether the user is authenticated.
- `error` - ref that contains an errors from the composable methods.
- `loading` - ref that contains information whether any of the composable methods is loading.

## Interfaces

```ts
/**
 * Almost every method is extending this type
 */
type ComposableFunctionArgs<T> = T & {
  customQuery?: CustomQuery;
  customHeaders?: CustomHeaders;
};

interface UseUserErrors {
  updateUser: Error | null;
  register: Error | null;
  login: Error | null;
  logout: Error | null;
  changePassword: Error | null;
  load: Error | null;
}

type UseUserUpdateUserParams = ComposableFunctionArgs<{
  user: ChangeCustomerPasswordMutation['changeCustomerPassword'] & { email?: string, password?: string }
}>;

type UseUserRegisterParams = ComposableFunctionArgs<{
  user: CustomerCreateInput;
}>;

type UseUserLoginParams = ComposableFunctionArgs<{
  user: GenerateCustomerTokenMutationVariables & { recaptchaToken?: string }
}>;

type UseUserChangePasswordParams = ComposableFunctionArgs<{
  current: string;
  new: string;
}>;

type UseUserLogoutParams = ComposableFunctionArgs<{}>;
type UseUserLoadParams = ComposableFunctionArgs<{}>;

interface UseUserInterface {
  setUser(newUser: Customer): void;
  updateUser(params: UseUserUpdateUserParams): Promise<void>;
  register(params: UseUserRegisterParams): Promise<void>;
  login(params: UseUserLoginParams): Promise<void>;
  logout(params: UseUserLogoutParams): Promise<void>;
  changePassword(params: UseUserChangePasswordParams): Promise<void>;
  load(params?: UseUserLoadParams): Promise<Customer>;
  loading: Readonly<Ref<boolean>>;
  error: Readonly<Ref<UseUserErrors>>;
  user: ComputedRef<Customer | null>;
  isAuthenticated: ComputedRef<boolean>;
}
```

## userGetters

`userGetters` is a set of helper functions that can be used to get data from the user object. They receive user object as a parameter and return the data from it.

- `getFirstName` - returns user's first name.
- `getLastName` - returns user's last name.
- `getEmailAddress` - returns user's email address.
- `getFullName` - returns user's full name.


## userGetters usage

```ts
import userGetters from '~/modules/catalog/product/getters/userGetters';

const firstName = userGetters.getFirstName(user);
const lastName = userGetters.getLastName(user);
const emailAddress = userGetters.getEmailAddress(user);
```

## Example

Load user data on page load and register a new user on form submit.

```ts
import { useUser } from '~/composables';

setup() {
  const {
    load,
    register,
    user,
    isAuthenticated,
  } = useUser();

  useFetch(async () => {
    if (user.value === null) {
      await load();
    }
  });

  const handleFormSubmit = async () => {
    if (!isAuthenticated.value) {
      await register({ user: form.value });
    }
  };

  console.log(user.value);
}
```