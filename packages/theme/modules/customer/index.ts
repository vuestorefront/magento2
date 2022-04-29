import path from 'node:path';
import url from 'node:url';
import { Module } from '@nuxt/types';

const nuxtModule : Module = function customerModule() {
  this.extendRoutes((routes) => {
    const component = path.resolve(
      path.dirname(url.fileURLToPath(import.meta.url)),
      'pages/MyAccount.vue',
    );

    routes.unshift({
      name: 'my-account',
      path: '/my-account/:pageName?',
      component,
    });
  });
};

export default nuxtModule;
