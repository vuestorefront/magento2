// eslint-disable-next-line import/no-extraneous-dependencies
import { BundleProduct } from '@vue-storefront/magento-api';
import { productGetters } from '@vue-storefront/magento';

// eslint-disable-next-line unicorn/prefer-object-from-entries
export const bundleProductInitialSelector = (bundles: BundleProduct['items']) => (Array.isArray(bundles) ? bundles.reduce((acc, curr) => {
  const defaultValue = curr.options.find((o) => o.is_default);

  if (defaultValue) {
    acc[curr.uid] = {
      uid: defaultValue.uid,
      quantity: defaultValue.quantity || 1,
      price: productGetters.getPrice(defaultValue.product).regular,
    };
  }

  return acc;
}, {}) : {});
