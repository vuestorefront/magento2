import { getInstance } from './getInstance';

export const useI18n = () => {
  const vm = getInstance();

  return vm.proxy.$i18n;
};
