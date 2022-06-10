import { unescape } from 'lodash-es';
import DOMPurify from 'isomorphic-dompurify';
import type { Plugin } from '@nuxt/types';

declare module 'vue/types/vue' {
  interface Vue {
    $dompurify(html: string): string;
  }
}

const plugin : Plugin = (_, inject) => {
  inject('dompurify', (html: string): string => unescape(DOMPurify.sanitize(html)));
};

export default plugin;
