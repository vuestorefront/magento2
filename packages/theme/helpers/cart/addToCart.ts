import { Product, productGetters, useCart } from '@vue-storefront/magento';
import { useRouter } from '@nuxtjs/composition-api';

export const useAddToCart = () => {
  const {
    addItem: addItemToCartBase,
    isInCart,
  } = useCart();
  const router = useRouter();

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
        await router.push(`/p/${productGetters.getProductSku(product)}${
          productGetters.getSlug(product, product.categories[0])
        }`);
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
