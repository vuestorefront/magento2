import path from 'node:path';

export default function VueStorefrontContextShimModule() {
  this.addPlugin(path.resolve(__dirname, './plugins/context.js'));
}
