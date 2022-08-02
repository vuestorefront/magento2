import path from 'node:path';
import url from 'node:url';
import type { Module } from '@nuxt/types';
import type { NuxtRouteConfig } from '@nuxt/types/config/router';

const nuxtModule : Module = function categoryModule() {
  const themeDir = path.dirname(url.fileURLToPath(import.meta.url));

  this.extendRoutes((routes: NuxtRouteConfig[]) => {
    routes.unshift({
      name: 'page',
      path: '/:slug+',
      component: path.resolve(themeDir, 'pages/page.vue'),
    });
  });
};

export default nuxtModule;
