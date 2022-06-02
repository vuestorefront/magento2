import path from 'node:path';
import url from 'node:url';
import type { Module } from '@nuxt/types';
import type { NuxtRouteConfig } from '@nuxt/types/config/router';

const nuxtModule : Module = function categoryModule() {
  const themeDir = path.dirname(url.fileURLToPath(import.meta.url));

  this.extendRoutes((routes: NuxtRouteConfig[]) => {
    routes.unshift({
      name: 'category',
      path: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
      component: path.resolve(themeDir, 'pages/category.vue'),
    }, {
      name: 'product',
      path: '/p/:id/:slug/',
      component: path.resolve(themeDir, 'pages/product.vue'),
    });
  });
};

export default nuxtModule;
