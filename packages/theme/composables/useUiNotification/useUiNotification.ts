import type { ComputedRef } from '@nuxtjs/composition-api';

export type UiNotificationType = 'secondary' | 'info' | 'success' | 'warning' | 'danger';

export interface UiNotification {
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

/**
 * Data and methods returned from the {@link useUiNotification|useUiNotification()} composable
 */
export interface UseUiNotificationInterface {
  /**
   * Displays the notification in the UI
   */
  send(notification: UiNotification): void;

  /**
   * Contains notifications added using the `send` method
   */
  notifications: ComputedRef<UiNotification[]>;
}
