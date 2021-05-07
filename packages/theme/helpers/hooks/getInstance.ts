import { getCurrentInstance } from '@vue/composition-api';

export const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.$root as any;
};
