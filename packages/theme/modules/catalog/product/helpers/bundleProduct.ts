import productGetters from '~/modules/catalog/product/getters/productGetters';
import type { BundleProduct } from '~/modules/GraphQL/types';
// eslint-disable-next-line unicorn/prefer-object-from-entries
export const bundleProductInitialSelector = (bundles: BundleProduct['items']) => (Array.isArray(bundles) ? bundles.reduce((acc, curr) => {
  const defaultValue = curr.options.find((o) => o.is_default);
  const price = productGetters.getPrice(defaultValue.product);

  if (defaultValue) {
    acc[curr.uid] = {
      uid: defaultValue.uid,
      quantity: defaultValue.quantity || 1,
      price: price.special < price.regular && price.special !== null ? price.special : price.regular,
    };
  }

  return acc;
}, {}) : {});
