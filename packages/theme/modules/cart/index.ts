import path from 'node:path';
import url from 'node:url';
import type { Module } from '@nuxt/types';
import type { NuxtRouteConfig } from '@nuxt/types/config/router';

const nuxtModule : Module = function cartModule() {
  const moduleDir = path.dirname(url.fileURLToPath(import.meta.url));

  this.extendRoutes((routes: NuxtRouteConfig[]) => {
    routes.unshift(
      {
        name: 'cart',
        path: '/cart',
        component: path.resolve(moduleDir, 'pages/Cart.vue'),
      },
    );
  });
};

export default nuxtModule;
