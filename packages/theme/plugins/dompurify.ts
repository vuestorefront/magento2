import _unescape from 'lodash.unescape';
import DOMPurify from 'isomorphic-dompurify';

export default (_, inject) => {
  inject('dompurify', (html: string): string => _unescape(DOMPurify.sanitize(html)));
};
