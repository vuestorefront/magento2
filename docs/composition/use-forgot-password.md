# useForgotPassword

The `useForgotPassword` composable is used to request a password reset email or to set a new password for a user.


```js
const { request, setNew, loading, result, error } = useForgotPassword();
```

## Usage
Resetting a user's password takes two steps:

1. Sending a password reset email to the user's email address with a token (ex: `https://<MAGENTOSITE>/customer/account/createPassword/?token=<TOKEN>`)
2. Setting a new password for the user using the token received in the email

:::read-more
Learn more about Magento's password reset functionality in the [Magento documentation](https://developer.adobe.com/commerce/webapi/graphql/schema/customer/mutations/request-password-reset-email/).
:::

The `useForgotPassword` composable provides two methods to perform these operations, `request` and `setNew`.

`request` will send a reset password email to the user if the email address matches a user in your database. The email will contain a link to a page where the user can set a new password. Typically, this link will contain a token that can be used to set a new password for the user.

```js
const { request } = useForgotPassword();
await request({ email: ''}); // will send a password reset email to the user
```

Then, the user will receive an email with a link to a page where they can set a new password. The link will contain a token that can be used to set a new password for the user. This token can be used with the `setNew` method.

```js
const { setNew } = useForgotPassword();
const email = ref(''); // get user input from the form
const newPassword = ref(''); // get user input from the form
const { params } = useRoute(); 
const token = params.token; // get the token from the URL

await setNew({ email, newPassword, tokenValue: token }); // will set a new password for the user
```


## Types

```js
/** Represents the result of a password change or reset operation */
export interface UseForgotPasswordResults {
  resetPasswordResult: boolean,
  setNewPasswordResult: boolean
}

/** Errors returned by the {@link useForgotPassword} composable */
export interface UseForgotPasswordErrors {
  request: Error;
  setNew: Error;
}

/** Params used to request a password reset email */
export interface UseForgotPasswordResetParams {
  email: string;
  recaptchaToken?: string;
}

/** Params used to set a new password to a user */
export interface UseForgotPasswordSetNewParams {
  tokenValue: string;
  newPassword: string;
  email: string;
  recaptchaToken?: string;
}

/**
 * Data and methods returned from the {@link useForgotPassword} composable
 */
export interface UseForgotPasswordInterface {
  /** Returns the result of the reset operation */
  result: Readonly<Ref<UseForgotPasswordResults>>;
  /** Returns the loading state */
  loading: Readonly<Ref<boolean>>;
  /** Returns possible errors */
  error: Readonly<Ref<UseForgotPasswordErrors>>;
  /** Sets the new password fot the user */
  setNew (params: ComposableFunctionArgs<UseForgotPasswordSetNewParams>): Promise<void>;
  /** Requests a new password reset email to be sent to user */
  request(params: ComposableFunctionArgs<UseForgotPasswordResetParams>): Promise<void>;
}
```