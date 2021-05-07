/* istanbul ignore file */
import { Route } from 'vue-router';
import { reactive, watch } from '@vue/composition-api';
import { getInstance } from '~/helpers/hooks/getInstance';

export const useVueRouter = () => {
  const vm = getInstance();
  const state = reactive<{ route: Route }>({ route: vm.$route });

  const defineRoute = (r: Route) => { state.route = r; };

  watch(() => vm.$route, defineRoute);

  return {
    ...state,
    router: vm.$router,
  };
};
