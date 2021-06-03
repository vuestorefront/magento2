import { getCurrentInstance } from '@vue/composition-api';

export const getInstance = () => {
  const vm = getCurrentInstance();

  if (vm) return vm.$root;

  throw new ReferenceError('[vue-hooks] Not found vue instance.');
};
