import { Plugin } from '@nuxt/types';
import formatCurrency from '~/helpers/formatCurrency';

interface FormatCurrency {
  $fc(value: number | string): string;
  $fc(value: number | string, options?: Intl.NumberFormatOptions): string;
  $fc(value: number | string, locale?: string, options?: Intl.NumberFormatOptions): string;
}

declare module 'vue/types/vue' {
  interface Vue extends FormatCurrency {
  }
}

declare module '@nuxt/types' {
  interface Context extends FormatCurrency {
  }
}

const plugin : Plugin = (context, inject) => {
  inject('fc', (value: number | string, locale?: string, options = {}): string => {
    // eslint-disable-next-line no-param-reassign
    locale = (locale || context.i18n?.localeProperties?.iso || '').replace('_', '-');
    // eslint-disable-next-line no-param-reassign
    options = { currency: context.app.$vsf.$magento.config.state.getCurrency() || context.i18n?.localeProperties?.defaultCurrency, ...options };
    return formatCurrency(value, locale, options);
  });
};

export default plugin;
