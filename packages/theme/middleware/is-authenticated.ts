import { Middleware } from '@nuxt/types';

const middleware : Middleware = (context) => {
  if (!context.app.$vsf.$magento.config.state.getCustomerToken()) {
    context.redirect('/');
  }
};
export default middleware;
