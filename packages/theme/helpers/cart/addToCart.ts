import { useRouter, useContext } from '@nuxtjs/composition-api';
import type { Product } from '~/modules/catalog/product/types';
import useCart from '~/modules/checkout/composables/useCart';
import { useProduct } from '~/modules/catalog/product/composables/useProduct';

export const useAddToCart = () => {
  const {
    addItem: addItemToCartBase,
    isInCart,
  } = useCart();
  const router = useRouter();
  const { app } = useContext();
  const { getProductPath } = useProduct();
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
        const path = app.localeRoute(getProductPath(product));

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
