import cookieNames from '~/enums/cookieNameEnum';
import formatCurrency from '~/helpers/formatCurrency';

declare module 'vue/types/vue' {
  interface Vue {
    $fc(value: number | string): string;
    $fc(value: number | string, options?: Intl.NumberFormatOptions): string;
    $fc(value: number | string, locale?: string, options?: Intl.NumberFormatOptions): string;
  }
}

export default ({ app }, inject) => {
  inject('fc', (value: number | string, locale?: string, options = {}): string => {
    // eslint-disable-next-line no-param-reassign
    locale = locale || app.$cookies.get(cookieNames.localeCookieName);
    // eslint-disable-next-line no-param-reassign
    options = { currency: app.$cookies.get(cookieNames.currencyCookieName), ...options };

    return formatCurrency(value, locale, options);
  });
};
