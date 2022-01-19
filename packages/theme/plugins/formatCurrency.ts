import cookieNames from '~/enums/cookieNameEnum';

declare module 'vue/types/vue' {
  interface Vue {
    $fc(value: number | string): string;
    $fc(value: number | string, options?: Intl.NumberFormatOptions): string;
    $fc(value: number | string, locale?: string, options?: Intl.NumberFormatOptions): string;
  }
}

export default ({ app }, inject) => {
  inject('fc', (value: number | string, locale: string = '', options = {}): string => {
    if (typeof value === 'string') {
      // eslint-disable-next-line no-param-reassign
      value = Number(value);
    }
    // eslint-disable-next-line no-param-reassign
    locale = locale || app.$cookies.get(cookieNames.localeCookieName);
    const currency: string = app.$cookies.get(cookieNames.currencyCookieName);

    return new Intl.NumberFormat(locale, { style: 'currency', currency, ...options }).format(value);
  });
};
