import { computed, reactive, useContext } from '@nuxtjs/composition-api';
import cookieNames from '~/enums/cookieNameEnum';

interface UiNotification {
  message: string;
  title?: string;
  action?: { text: string; onClick: (...args: any) => void };
  type: 'danger' | 'success' | 'info';
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
  const cookieMessage: UiNotification = app.$cookies.get(cookieNames.messageCookieName);

  const send = (notification: UiNotification) => {
    const id = Symbol('id');

    const dismiss = () => {
      const index = state.notifications.findIndex((n) => n.id === id);

      if (index !== -1) state.notifications.splice(index, 1);

      app.$cookies.remove(cookieNames.messageCookieName);
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
    send(cookieMessage);
  }

  return {
    send,
    notifications: computed(() => state.notifications),
  };
};

export default useUiNotification;
