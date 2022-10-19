import type { Price, MediaGalleryItem } from '~/modules/catalog/types';
import type { Product, ProductAttribute } from '~/modules/catalog/product/types';
import { Breadcrumb } from '~/modules/catalog/types';

import type {
  BundleProduct,
  CategoryInterface,
  GroupedProduct,
  ProductInterface,
  CategoryTree,
} from '~/modules/GraphQL/types';

import { htmlDecode } from '~/helpers/htmlDecoder';
import { getTotalReviews, getAverageRating } from '~/modules/review/getters/reviewGetters';

export interface ProductGetters {
  getName: (product: ProductInterface) => string;
  getSlug(product: ProductInterface, category?: CategoryInterface): string;
  getPrice: (product: ProductInterface) => Price;
  getGallery: (product: ProductInterface, maxGallerySize: number) => MediaGalleryItem[];
  getCoverImage: (product: ProductInterface) => string;
  getAttributes: (products: ProductInterface[] | ProductInterface, filters?: Array<string>) => Record<string, ProductAttribute | string>;
  getDescription: (product: ProductInterface) => string;
  getCategoryIds: (product: ProductInterface) => string[];
  getId: (product: ProductInterface) => string;
  getTotalReviews: (product: ProductInterface) => number;
  getAverageRating: (product: ProductInterface) => number;
  getBreadcrumbs?: (product: ProductInterface, category?: CategoryInterface) => Breadcrumb[];
  getCategory(product: Product, currentUrlPath: string): CategoryTree | null;
  getProductRelatedProduct(product: ProductInterface): Product[];
  getProductSku(product: ProductInterface): string;
  getProductThumbnailImage(product: ProductInterface): string;
  getProductUpsellProduct(product: ProductInterface): ProductInterface[];
  getShortDescription(product: ProductInterface): string;
  getTypeId(product: ProductInterface): string;
  getSwatchData(swatchData: Product['configurable_options'][0]['values'][0]['swatch_data']): string | undefined;
  getGroupedProducts(product: GroupedProduct): GroupedProduct['items'] | undefined;
  getBundleProducts(product: BundleProduct): BundleProduct['items'] | undefined;
  [getterName: string]: any;
}

export const getName = (product: ProductInterface): string => {
  if (!product) {
    return '';
  }

  return htmlDecode(product.name);
};

export const getSlug = (product: ProductInterface, category?: CategoryTree | CategoryInterface): string => {
  const rewrites = product?.url_rewrites;
  let url = product?.sku ? `/p/${product.sku}` : '';
  if (!rewrites || rewrites.length === 0) {
    return url;
  }

  url = `/${rewrites[0].url}`;
  // eslint-disable-next-line no-restricted-syntax
  for (const rewrite of rewrites) {
    if (category && category.uid) {
      url = `/${rewrite.url}`;
      break;
    }
  }

  return url;
};

export const getPrice = (product: ProductInterface): Price => {
  let regular = 0;
  let special = null;
  let maximum = null;
  let final = null;
  if (product?.price_range) {
    regular = product.price_range.minimum_price.regular_price.value;
    final = product.price_range.minimum_price.final_price.value;
    maximum = product.price_range.maximum_price.final_price.value;

    if (final < regular) {
      special = final;
    }
  }

  return {
    regular,
    special,
    maximum,
    final,
  };
};

export const getGallery = (product: Product, maxGallerySize = 4): MediaGalleryItem[] => {
  const images = [];

  if (!product?.media_gallery?.length && !product?.configurable_product_options_selection?.media_gallery?.length) {
    return images;
  }

  const selectedGallery = product.configurable_product_options_selection?.media_gallery.length
    ? product.configurable_product_options_selection.media_gallery
    : product.media_gallery;

  // eslint-disable-next-line no-restricted-syntax
  for (const galleryItem of selectedGallery) {
    images.push({
      small: galleryItem.url,
      normal: galleryItem.url,
      big: galleryItem.url,
    });
  }

  return images.slice(0, maxGallerySize);
};

export const getCoverImage = (product: Product): string => {
  if (!product || !product.image) {
    return null;
  }

  return product.image.url;
};

export const getProductThumbnailImage = (product: Product): string => {
  if (!product || !product.thumbnail) {
    return null;
  }

  return product.thumbnail.url;
};

export const getAttributes = (
  products: Product,
  _filterByAttributeName?: string[],
): Record<string, ProductAttribute | string> => {
  if (!products || !products?.configurable_options) {
    return {};
  }

  const attributes = {};
  const configurableOptions = products.configurable_options;

  // eslint-disable-next-line no-restricted-syntax
  for (const option of configurableOptions) {
    attributes[option.attribute_code] = {
      code: option.attribute_code,
      label: option.label,
      value: option.values.map((value) => {
        const obj = {};
        obj[value.value_index] = value.label;
        return obj;
      }),
    } as ProductAttribute;
  }
  return attributes;
};

export const getDescription = (product: Product): string => {
  if (!product || !product?.description) {
    return '';
  }

  return product.description.html;
};

export const getShortDescription = (product: Product): string => {
  if (!product || !product.short_description) {
    return '';
  }
  return product.short_description.html;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategoryIds = (product: Product): string[] => {
  const categoryIds = [];

  if (!product?.categories) {
    return categoryIds;
  }

  return product.categories.map((category) => category.uid);
};

export const getCategory = (product: any, currentUrlPath: string): CategoryTree | null => {
  if (!product?.categories || product?.categories.length === 0) {
    return null;
  }

  const categories = currentUrlPath.split('/');
  categories.pop();

  if (categories.length === 0) {
    return null;
  }

  const categoryPath = categories.join('/');

  // eslint-disable-next-line no-restricted-syntax
  for (const category of product.categories) {
    if (`/${category.url_path}` === categoryPath) {
      return category;
    }
  }

  return null;
};

export const getId = (product: Product): string => product.uid;

export const getProductSku = (product: Product): string => product.sku;

// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
export const getTypeId = (product: Product): string => product.__typename;

const getCategoryBreadcrumbs = (category: CategoryInterface): Breadcrumb[] => {
  let breadcrumbs = [];

  if (!category) {
    return [];
  }

  if (Array.isArray(category?.breadcrumbs)) {
    breadcrumbs = category.breadcrumbs.map((breadcrumb) => ({
      text: breadcrumb.category_name,
      link: `/${breadcrumb.category_url_path}${category.url_suffix || ''}`,
    } as Breadcrumb));
  }

  breadcrumbs.push({
    text: category.name,
    link: `/${category.url_path}${category.url_suffix || ''}`,
  } as Breadcrumb);

  return breadcrumbs;
};

export const getBreadcrumbs = (product: ProductInterface, category?: CategoryInterface): Breadcrumb[] => {
  let breadcrumbs = [];

  if (!product) {
    return breadcrumbs;
  }

  if (category) {
    breadcrumbs = getCategoryBreadcrumbs(category) as Breadcrumb[];
  }

  breadcrumbs.push({
    text: getName(product),
    link: `/${product?.url_rewrites?.[0]?.url ?? product.url_key}`,
  });

  return breadcrumbs;
};

export { getTotalReviews, getAverageRating } from '~/modules/review/getters/reviewGetters';

export const getProductRelatedProduct = (product: any): Product[] => product?.related_products || [];

export const getProductUpsellProduct = (product: any): Product[] => product?.upsell_products || [];

export const getSwatchData = (swatchData: Product['configurable_options'][0]['values'][0]['swatch_data']): string | undefined => swatchData?.value;

const sortProduct = (a, b) => a.position - b.position;

// eslint-disable-next-line no-underscore-dangle
export const getGroupedProducts = (product: GroupedProduct & { __typename: string }): GroupedProduct['items'] | undefined => product.__typename === 'GroupedProduct' && product?.items?.sort(sortProduct);

// eslint-disable-next-line no-underscore-dangle
export const getBundleProducts = (product: BundleProduct & { __typename: string }): BundleProduct['items'] | undefined => product.__typename === 'BundleProduct' && product?.items?.sort(sortProduct);

const productGetters: ProductGetters = {
  getAttributes,
  getAverageRating,
  getBreadcrumbs,
  getCategory,
  getCategoryIds,
  getCoverImage,
  getDescription,
  getGallery,
  getId,
  getName,
  getPrice,
  getProductRelatedProduct,
  getProductSku,
  getProductThumbnailImage,
  getProductUpsellProduct,
  getShortDescription,
  getSlug,
  getTotalReviews,
  getTypeId,
  getSwatchData,
  getGroupedProducts,
  getBundleProducts,
};

export default productGetters;
