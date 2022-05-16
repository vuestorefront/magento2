/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

import { DirectiveOptions } from 'vue';

type ElementWithClickOutsideListener = HTMLElement & { _outsideClickHandler: (e: MouseEvent) => void };
export const clickOutside : DirectiveOptions = {
  bind(el: ElementWithClickOutsideListener, binding) {
    const closeHandler = binding.value;

    el._outsideClickHandler = (event: MouseEvent) => {
      if (!el.contains(event.target as Node)) {
        event.stopPropagation();
        closeHandler(event, el);
      }
    };

    document.addEventListener('mousedown', el._outsideClickHandler);
    document.addEventListener('touchstart', el._outsideClickHandler);
  },
  unbind(el: ElementWithClickOutsideListener) {
    document.removeEventListener('mousedown', el._outsideClickHandler);
    document.removeEventListener('touchstart', el._outsideClickHandler);
    el._outsideClickHandler = null;
  },
};
