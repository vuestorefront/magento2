# useUiNotification composable

`useUiNotification` composable allows managing and showing notifications to the user.

## API
`useUiNotification` composable returns the following properties:

- `send` - function that displays the notification in the UI.
- `notifications` - object that contains notifications added using the `send` method.


## Interfaces

```ts
type UiNotificationType = 'secondary' | 'info' | 'success' | 'warning' | 'danger';

interface UiNotification {
  message: string;
  title?: string;
  action?: {
    text: string;
    onClick(...args: any): void;
  };
  type: UiNotificationType;
  icon: string;
  persist?: boolean;
  id: symbol;
  dismiss?: () => void;
}

interface UseUiNotificationInterface {
  send(notification: UiNotification): void;
  notifications: ComputedRef<UiNotification[]>;
}
```

## Example

Handle product removal from cart and show notification:

```ts
import { useUiNotification, useCart } from '~/composables';
import cartGetters from '~/modules/checkout/getters/cartGetters';

setup() {
  const { send } = useUiNotification();
  const { removeItem } = useCart();

  const actionRemoveItem = async (product: CartItemInterface) => {
    await removeItem({ product });

    sendNotification({
      id: Symbol('product_removed'),
      message: i18n.t('{0} has been successfully removed from your cart', {
        0: cartGetters.getItemName(
          product,
        ),
      }) as string,
      type: 'success',
      icon: 'check',
      persist: false,
      title: 'Product removed',
    });
  };
}
```