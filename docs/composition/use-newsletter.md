# useNewsletter

The `useNewsletter` composable can be used to subscribe a both guests and registered customers to your newsletter. 

## API

`useNewsletter` returns the following properties:
- `updateSubscription` - updates subscription status of an email
- `loading` - loading state of the `updateSubscription` method
- `error` - error object

## Example

```js
import { useNewsletter } from '~/composables';
const { updateSubscription, loading, error } = useNewsletter();

const subscriptionStatus = await updateSubscription({ 
  email: 'email@example.com'
});
```

## Interfaces

```js

export enum SubscriptionStatusesEnum {
  NotActive = 'NOT_ACTIVE',
  Subscribed = 'SUBSCRIBED',
  Unconfirmed = 'UNCONFIRMED',
  Unsubscribed = 'UNSUBSCRIBED',
}

/**
 * Errors that occured in the {@link useNewsletter|useNewsletter()} composable
 */
export interface UseNewsletterErrors {
  /**
   * Contains error if `updateSubscription` method failed, otherwise is `null`
   */
  updateSubscription: Error | null;
}


/**
 * The params object accepted by the `updateSubscription` method in the {@link useNewsletter|useNewsletter()} composable
 */
export type UseNewsletterUpdateSubscriptionParams = ComposableFunctionArgs<{
  email: string;
}>;

/**
 * Data and methods returned from the {@link useNewsletter|useNewsletter()} composable
 */
export interface UseNewsletterInterface {
  /**
   * Updates subscription status of an email in the newsletter
   */
  updateSubscription(params: UseNewsletterUpdateSubscriptionParams): Promise<SubscriptionStatusesEnum>;

  /**
   * Contains errors from the composable methods
   */
  error: DeepReadonly<Ref<UseNewsletterErrors>>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;
}
```