import {
  AgnosticAttribute,
  AgnosticBreadcrumb,
  AgnosticMediaGalleryItem,
  AgnosticPrice,
  ProductGetters as ProductGettersBase,
} from '@vue-storefront/core';
import {
  Category,
  Product,
} from '@vue-storefront/magento-api';

import categoryGetters from './categoryGetters';
import { htmlDecode } from '../../helpers/htmlDecoder';
import reviewGetters from './reviewGetters';

type ProductVariantFilters = any;

export const getName = (product: Product): string => {
  if (!product) {
    return '';
  }

  return htmlDecode(product.name);
};

export const getSlug = (product: Product, category?: Category): string => {
  const rewrites = product.url_rewrites;
  let url = `/p/${product.sku}`;
  if (!rewrites || rewrites.length === 0) {
    return url;
  }

  url = `/${rewrites[0].url}`;
  for (const rewrite of rewrites) {
    if (category && category.uid) {
      url = `/${rewrite.url}`;
      break;
    }
  }

  return url;
};

export const getPrice = (product: Product): AgnosticPrice => {
  let regular = 0;
  let special = null;

  if (product?.price_range) {
    regular = product.price_range.minimum_price.regular_price.value;
    const final = product.price_range.minimum_price.final_price.value;

    if (final < regular) {
      special = final;
    }
  }

  return {
    regular,
    special,
  };
};

export const getGallery = (product: Product): AgnosticMediaGalleryItem[] => {
  const images = [];

  if (!product?.media_gallery && !product?.configurable_product_options_selection?.media_gallery) {
    return images;
  }

  const selectedGallery = product.configurable_product_options_selection?.media_gallery
    ? product.configurable_product_options_selection.media_gallery
    : product.media_gallery;

  for (let i = 0; i < selectedGallery.length; i += 1) {
    const galleryItem = selectedGallery[i];
    images.push({
      small: galleryItem.url,
      normal: galleryItem.url,
      big: galleryItem.url,
    });
  }

  return images;
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

export const getFiltered = (products: Product[], _filters: ProductVariantFilters | any = {}): Product[] => products;

export const getAttributes = (
  products: Product,
  _filterByAttributeName?: string[],
): Record<string, AgnosticAttribute | string> => {
  if (!products || !products?.configurable_options) {
    return {};
  }

  const attributes = {};
  const configurableOptions = products.configurable_options;

  for (const option of configurableOptions) {
    attributes[option.attribute_code] = {
      name: option.attribute_code,
      label: option.label,
      value: option.values.map((value) => {
        const obj = {};
        obj[value.value_index] = value.label;
        return obj;
      }),
    } as AgnosticAttribute;
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

export const getCategory = (product: Product, currentUrlPath: string): Category | null => {
  if (!product?.categories || product?.categories.length === 0) {
    return null;
  }

  const categories = currentUrlPath.split('/');
  categories.pop();

  if (categories.length === 0) {
    return null;
  }

  const categoryPath = categories.join('/');

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

export const getFormattedPrice = (price: number) => {
  if (price === null) {
    return null;
  }

  // TODO get correct data from api
  const locale = 'en';
  const country = 'en';
  const currency = 'USD';

  return new Intl.NumberFormat(`${locale}-${country}`, {
    style: 'currency',
    currency,
  }).format(price);
};

export const getBreadcrumbs = (product: Product, category?: Category): AgnosticBreadcrumb[] => {
  let breadcrumbs = [];

  if (!product) {
    return breadcrumbs;
  }

  if (category) {
    breadcrumbs = categoryGetters.getBreadcrumbs(category) as AgnosticBreadcrumb[];
  }

  breadcrumbs.push({
    text: getName(product),
    route: {
      path: getSlug(product),
    },
  });

  return breadcrumbs;
};

export const { getTotalReviews } = reviewGetters;

export const { getAverageRating } = reviewGetters;

export const getProductRelatedProduct = (product: Product): Product[] => product?.related_products?.filter((p) => p.name && p.uid) || [];

export const getProductUpsellProduct = (product: Product): Product[] => product?.upsell_products?.filter((p) => p.name && p.uid) || [];

export const getSwatchData = (swatchData: Product['configurable_options'][0]['values'][0]['swatch_data']): string | undefined => swatchData?.value

export interface ProductGetters extends ProductGettersBase<Product, ProductVariantFilters>{
  getCategory(product: Product, currentUrlPath: string): Category | null;
  getProductRelatedProduct(product: Product): Product[];
  getProductSku(product: Product): string;
  getProductThumbnailImage(product: Product): string;
  getProductUpsellProduct(product: Product): Product[];
  getShortDescription(product: Product): string;
  getSlug(product: Product, category?: Category): string;
  getTypeId(product: Product): string;
  getSwatchData(swatchData: Product['configurable_options'][0]['values'][0]['swatch_data']): string | undefined;
}

const productGetters: ProductGetters = {
  getAttributes,
  getAverageRating,
  getBreadcrumbs,
  getCategory,
  getCategoryIds,
  getCoverImage,
  getDescription,
  getFiltered,
  getFormattedPrice,
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
};

export default productGetters;
