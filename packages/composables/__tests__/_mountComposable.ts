import { shallowMount } from '@vue/test-utils';
import { defineComponent } from '@vue/composition-api';

const mountComposable = (composableFn) => {
  const component = defineComponent({
    setup() {
      return composableFn();
    },
    template: '<div>my component</div>',
  });

  return shallowMount(component);
};

export default mountComposable;
