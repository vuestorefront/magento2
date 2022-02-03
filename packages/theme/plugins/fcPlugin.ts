import cookieNames from '~/enums/cookieNameEnum';
import formatCurrency from '~/helpers/formatCurrency';

declare module 'vue/types/vue' {
  interface Vue {
    $fc(value: number | string): string;
    $fc(value: number | string, options?: Intl.NumberFormatOptions): string;
    $fc(value: number | string, locale?: string, options?: Intl.NumberFormatOptions): string;
  }
}

export default ({ i18n, app }, inject) => {
  inject('fc', (value: number | string, locale?: string, options = {}): string => {
    // eslint-disable-next-line no-param-reassign
    locale = locale || i18n?.localeProperties?.iso.replace('_', '-');
    // eslint-disable-next-line no-param-reassign
    options = { currency: app.$cookies.get(cookieNames.currencyCookieName) || i18n?.localeProperties?.defaultCurrency, ...options };
    return formatCurrency(value, locale, options);
  });
};
