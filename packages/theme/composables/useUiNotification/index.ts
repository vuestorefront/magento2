import { computed, reactive, useContext } from '@nuxtjs/composition-api';

type UiNotificationType = 'secondary' | 'info' | 'success' | 'warning' | 'danger';

export interface UiNotification {
  message: string;
  title?: string;
  action?: { text: string; onClick: (...args: any) => void };
  type: UiNotificationType;
  icon: string;
  persist?: boolean;
  id: symbol;
  dismiss?: () => void;
}
interface Notifications {
  notifications: Array<UiNotification>;
}

const state = reactive<Notifications>({
  notifications: [],
});
const maxVisibleNotifications = 3;
const timeToLive = 3000;

const useUiNotification = () => {
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
};

export default useUiNotification;
