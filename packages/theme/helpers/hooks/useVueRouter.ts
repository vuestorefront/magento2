/* istanbul ignore file */
import { reactive, watch } from '@vue/composition-api';
import { getInstance } from '~/helpers/hooks/getInstance';

export const useVueRouter = () => {
  const vm = getInstance();
  const state = reactive<{ route: any }>({ route: vm.$route });

  const defineRoute = (r: any) => { state.route = r; };

  watch(() => vm.$route, defineRoute);

  return {
    ...state,
    router: vm.$router,
  };
};
