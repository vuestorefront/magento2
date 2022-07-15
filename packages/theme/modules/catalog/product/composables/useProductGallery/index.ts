import { computed, Ref } from '@nuxtjs/composition-api';
import { getGallery as getProductGallery } from '~/modules/catalog/product/getters/productGetters';
import { useImage } from '~/composables';
import type { Product } from '~/modules/catalog/product/types';
import type { UseProductGalleryInterface } from '~/modules/catalog/product/composables/useProductGallery/useProductGallery';

/**
 * The `useProductGallery()` composable allows building product's gallery data structure.
 *
 * See the {@link UseProductGalleryInterface} page for more information.
 */
export function useProductGallery(product: Ref<Product>, imgPlaceholder = ''): UseProductGalleryInterface {
  const { getMagentoImage, imageSizes } = useImage();
  const productGallery = computed(() => getProductGallery(product.value).map((img) => ({
    mobile: { url: getMagentoImage(img.small) },
    desktop: { url: getMagentoImage(img.normal) },
    big: { url: getMagentoImage(img.big) },
    alt: product.value.name,
    placeholder: imgPlaceholder,
  })));

  return {
    productGallery,
    imageSizes,
  };
}

export default useProductGallery;
export * from './useProductGallery';
