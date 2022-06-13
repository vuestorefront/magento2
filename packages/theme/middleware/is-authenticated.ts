import { Middleware } from '@nuxt/types';

const middleware : Middleware = (context) => {
  if (!context.app.$vsf.$magento.config.state.getCustomerToken()) {
    const homepage = context.localeRoute({ name: 'home' });
    context.redirect(homepage);
  }
};
export default middleware;
