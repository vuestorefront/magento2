import { useRouter, useContext } from '@nuxtjs/composition-api';
import type { Product } from '~/modules/catalog/product/types';
import productGetters from '~/modules/catalog/product/getters/productGetters';
import useCart from '~/modules/checkout/composables/useCart';

export const useAddToCart = () => {
  const {
    addItem: addItemToCartBase,
    isInCart,
  } = useCart();
  const router = useRouter();
  const { app } = useContext();
  const addItemToCart = async (params: { product: Product, quantity: number }) => {
    const { product, quantity } = params;
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    const productType = product.__typename;

    switch (productType) {
      case 'SimpleProduct':
        await addItemToCartBase({
          product,
          quantity,
        });
        break;
      case 'BundleProduct':
      case 'ConfigurableProduct':
      case 'GroupedProduct':
        const sku = productGetters.getProductSku(product);
        const slug = productGetters.getSlug(product).replace(/^\//, ''); // remove leading slash from getSlug

        const path = app.localeRoute({
          name: 'product',
          params: {
            id: sku,
            slug,
          },
        });

        await router.push(path);
        break;
      default:
        throw new Error(`Product Type ${productType} not supported in add to cart yet`);
    }
  };

  return {
    addItemToCart,
    isInCart,
  };
};
