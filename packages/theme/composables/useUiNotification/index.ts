import { computed, reactive, useContext } from '@nuxtjs/composition-api';
import type {
  UiNotification,
  UseUiNotificationInterface,
} from './useUiNotification';

interface Notifications {
  notifications: UiNotification[];
}

const state = reactive<Notifications>({
  notifications: [],
});
const maxVisibleNotifications = 3;
const timeToLive = 3000;

/**
 * Allows managing and showing notifications to the user.
 *
 * See the {@link UseUiNotificationInterface} for a list of methods and values available in this composable.
 */
export function useUiNotification(): UseUiNotificationInterface {
  const { app } = useContext();
  // @ts-ignore
  const cookieMessage = app.$vsf.$magento.config.state.getMessage<UiNotification>();

  const send = (notification: UiNotification) => {
    const id = Symbol('id');

    const dismiss = () => {
      const index = state.notifications.findIndex((n) => n.id === id);

      if (index !== -1) state.notifications.splice(index, 1);

      // @ts-ignore
      app.$vsf.$magento.config.state.removeMessage();
    };

    const newNotification = {
      ...notification,
      id,
      dismiss,
    };

    if (!state.notifications.some((stateNotification) => stateNotification.message === notification.message)) {
      state.notifications.push(newNotification);
    }

    if (state.notifications.length > maxVisibleNotifications) {
      state.notifications.shift();
    }

    if (!notification.persist) {
      setTimeout(dismiss, timeToLive);
    }
  };

  if (cookieMessage) {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    send(cookieMessage);
    // @ts-ignore
    app.$vsf.$magento.config.state.removeMessage();
  }

  return {
    send,
    notifications: computed(() => state.notifications),
  };
}

export default useUiNotification;
export * from './useUiNotification';
