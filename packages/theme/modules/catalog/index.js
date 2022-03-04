import path from 'node:path';

export default function CatalogModule() {
  this.extendRoutes((routes) => {
    routes.unshift({
      name: 'category',
      path: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
      component: path.resolve(__dirname, 'pages/default.vue'),
    });
  });
}
