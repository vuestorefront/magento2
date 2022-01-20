import { Product, productGetters, useCart } from '@vue-storefront/magento';
import { useRouter, useContext } from '@nuxtjs/composition-api';

export const useAddToCart = () => {
  const {
    addItem: addItemToCartBase,
    isInCart,
  } = useCart();
  const router = useRouter();
  const { app } = useContext();
  const addItemToCart = async (params: { product: Product, quantity: number }) => {
    const { product, quantity } = params;
    // eslint-disable-next-line no-underscore-dangle
    // @ts-ignore
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
        const path = `/p/${productGetters.getProductSku(product)}${
          productGetters.getSlug(product, product.categories[0])
        }`;
        await router.push(String(app.localePath(path)));
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
