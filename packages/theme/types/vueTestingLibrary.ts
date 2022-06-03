import type { ComponentInstance } from '@nuxtjs/composition-api';

export type HTMLElementWithVue = HTMLElement & { __vue__: ComponentInstance };
