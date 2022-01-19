import cookieNames from '~/enums/cookieNameEnum';

declare module 'vue/types/vue' {
  interface Vue {
    $fc(value: number): string;
    $fc(value: number, options?: Intl.NumberFormatOptions): string;
    $fc(value: number, locale?: string, options?: Intl.NumberFormatOptions): string;
  }
}

export default ({ app }, inject) => {
  inject('fc', (value: number, locale: string = '', options = {}): string => {
    const localeToUse: string = locale || app.$cookies.get(cookieNames.localeCookieName);
    const currency: string = app.$cookies.get(cookieNames.currencyCookieName);

    return new Intl.NumberFormat(localeToUse, { style: 'currency', currency, ...options }).format(value);
  });
};
