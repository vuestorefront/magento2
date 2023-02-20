# usePaymentProvider

`usePaymentProvider` composable can be used to load available payment methods for the current cart and select a payment method.


:::read-more
Learn more about [Payment Providers](https://docs.vuestorefront.io/v2/integrate/payment.html) in Vue Storefront.
:::

## Examples 

### Loading Available Payment Methods

```js
import usePaymentProvider from '~/modules/checkout/composables/usePaymentProvider';

const { load, error, loading } = usePaymentProvider();

// returns an array of available payment methods for the cart
const paymentMethods = await load();
```

### Setting a Payment Method

```js
import usePaymentProvider from '~/modules/checkout/composables/usePaymentProvider';

const { load, save, error, loading } = usePaymentProvider();

// returns an array of available payment methods for the cart
const paymentMethods = await load();

// saves the first payment method as the payment method for the current cart
const selectedPaymentMethods = await save({ 
  paymentMethod: paymentMethods[0] 
});
```

## Selecting a Payment Method
## Interfaces

```js
export type PaymentMethodParams = ComposableFunctionArgs<{
  cart_id: string;
  payment_method: PaymentMethodInput;
}>;

/**
 * The {@link usePaymentProvider} error object. The properties values' are the
 * errors thrown by its methods.
 */
export interface UsePaymentProviderErrors {
  /** Error when loading payment methods fails, otherwise is `null`. */
  load: Error | null;

  /** Error when saving payment method fails, otherwise is `null`. */
  save: Error | null;
}

/** The params received by {@link usePaymentProvider}'s `save` method. */
export type UsePaymentProviderSaveParams = ComposableFunctionArgs<{
  paymentMethod: PaymentMethodInput;
}>;

/**
 * Data and methods returned from the {@link usePaymentProvider} composable.
 */
export interface UsePaymentProviderInterface {
  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods.
   *
   * @see {@link UsePaymentProviderErrors} documentation for more details.
   */
  error: Readonly<Ref<UsePaymentProviderErrors>>;

  /** Loads the available payment methods for current cart. */
  load(customQuery?: CustomQuery, customHeaders?: CustomHeaders): Promise<AvailablePaymentMethod[] | null>;

  /**
   * Saves the payment method for current cart. It returns the updated available
   * payment methods for current cart, so you can update the UI.
   */
  save(params: UsePaymentProviderSaveParams): Promise<AvailablePaymentMethod[] | null>;
}

export interface PaymentMethodInput {
  braintree?: InputMaybe<BraintreeInput>;
  braintree_cc_vault?: InputMaybe<BraintreeCcVaultInput>;
  /** Payment method code */
  code: Scalars['String'];
  /** Required input for PayPal Hosted pro payments */
  hosted_pro?: InputMaybe<HostedProInput>;
  klarna?: InputMaybe<KlarnaInput>;
  /** Required input for Payflow Express Checkout payments */
  payflow_express?: InputMaybe<PayflowExpressInput>;
  /** Required input for PayPal Payflow Link and Payments Advanced payments */
  payflow_link?: InputMaybe<PayflowLinkInput>;
  /** Required input type for PayPal Payflow Pro and Payment Pro payments */
  payflowpro?: InputMaybe<PayflowProInput>;
  /** Required input type for PayPal Payflow Pro vault payments */
  payflowpro_cc_vault?: InputMaybe<VaultTokenInput>;
  /** Required input for Express Checkout and Payments Standard payments */
  paypal_express?: InputMaybe<PaypalExpressInput>;
  /** Purchase order number */
  purchase_order_number?: InputMaybe<Scalars['String']>;
}
```