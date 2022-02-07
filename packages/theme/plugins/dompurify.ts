import _unescape from 'lodash.unescape';
import DOMPurify from 'isomorphic-dompurify';

declare module 'vue/types/vue' {
  interface Vue {
    $dompurify(html: string): string;
  }
}

export default (_, inject) => {
  inject('dompurify', (html: string): string => _unescape(DOMPurify.sanitize(html)));
};
