import type { ComponentInstance } from '@nuxtjs/composition-api';

/**
 * Template refs can also be applied to components, not only HTML elements,
 * so this type uses Vue's ComponentInstance interface rather than HTMLElement.
 *
 * ComponentInstance["$el"] is `Element` by default. Element doesn't have `.focus()``,
 * which would cause TypeScript errors if you use `myTemplateRef.$el.focus()`.
 * For that reason, it's extended to the more specific `HTMLElement`` here
 *
 * * @template TElement The root element of the component. Can be used to pass a more specific element, like HTMLInputElement
 */
export type ComponentTemplateRef<TElement extends HTMLElement = HTMLElement> = ComponentInstance & { $el: TElement };
