import { getCurrentInstance } from 'vue-demi';

export const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.$root as any;
};
