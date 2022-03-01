import _unescape from 'lodash.unescape';
import xss from 'xss';

declare module 'vue/types/vue' {
  interface Vue {
    $xss(html: string): string;
  }
}

export default function xssPlugin(_, inject) {
  inject('xss', (html: string): string => _unescape(xss(html)));
}
