import path from 'node:path';
import url from 'node:url';

export function getRoutes(themeDir = path.dirname(url.fileURLToPath(import.meta.url))) {
  return [
    {
      name: 'home',
      path: '/',
      component: path.resolve(themeDir, 'pages/Home.vue'),
    },
    {
      name: 'page',
      path: '/:slug+',
      component: path.resolve(themeDir, 'pages/Page.vue'),
    },
  ];
}
