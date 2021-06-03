import {
  AgnosticAttribute,
  AgnosticBreadcrumb,
  AgnosticMediaGalleryItem,
  AgnosticPrice,
  ProductGetters,
} from '@vue-storefront/core';
import {
  Category,
  Product,
} from '@vue-storefront/magento-api';

import categoryGetters from './categoryGetters';
import { htmlDecode } from '../../helpers/htmlDecoder';

type ProductVariantFilters = any;

export const getProductName = (product: Product): string => {
  if (!product) {
    return '';
  }

  return htmlDecode(product.name);
};

export const getProductSlug = (product: Product, category?: Category): string => {
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

export const getProductPrice = (product: Product): AgnosticPrice => {
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

export const getProductGallery = (product: Product): AgnosticMediaGalleryItem[] => {
  const images = [];

  if (!product?.media_gallery) {
    return images;
  }

  for (let i = 0; i < product.media_gallery.length; i += 1) {
    const galleryItem = product.media_gallery[i];
    images.push({
      small: galleryItem.url,
      normal: galleryItem.url,
      big: galleryItem.url,
    });
  }

  return images;
};

export const getProductCoverImage = (product: Product): string => {
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

export const getProductFiltered = (products: Product[], _filters: ProductVariantFilters | any = {}): Product[] => products;

export const getProductAttributes = (
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

export const getProductDescription = (product: Product): string => {
  if (!product || !product?.description) {
    return '';
  }

  return product.description.html;
};

export const getProductShortDescription = (product: Product): string => {
  if (!product || !product.short_description) {
    return '';
  }
  return product.short_description.html;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCategoryIds = (product: Product): string[] => {
  const categoryIds = [];

  if (!product?.categories) {
    return categoryIds;
  }

  return product.categories.map((category) => category.uid);
};

export const getProductCategory = (product: Product, currentUrlPath: string): Category | null => {
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

export const getProductId = (product: Product): string => product.uid;

export const getProductSku = (product: Product): string => product.sku;

// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
export const getProductTypeId = (product: Product): string => product.__typename;

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

export const getProductBreadcrumbs = (product: Product, category?: Category): AgnosticBreadcrumb[] => {
  let breadcrumbs = [];

  if (!product) {
    return breadcrumbs;
  }

  if (category) {
    breadcrumbs = categoryGetters.getBreadcrumbs(category) as AgnosticBreadcrumb[];
  }

  breadcrumbs.push({
    text: getProductName(product),
    route: {
      path: getProductSlug(product),
    },
  });

  return breadcrumbs;
};

export const getProductTotalReviews = (): number => 0;

export const getProductAverageRating = (): number => 0;

export const getProductRelatedProduct = (product: Product) => product?.related_products?.filter((p) => p.name && p.uid) || [];

export const getProductUpsellProduct = (product: Product) => product?.upsell_products?.filter((p) => p.name && p.uid) || [];

const productGetters: ProductGetters<Product, ProductVariantFilters> = {
  getAttributes: getProductAttributes,
  getAverageRating: getProductAverageRating,
  getBreadcrumbs: getProductBreadcrumbs,
  getCategory: getProductCategory,
  getCategoryIds: getProductCategoryIds,
  getCoverImage: getProductCoverImage,
  getDescription: getProductDescription,
  getFiltered: getProductFiltered,
  getFormattedPrice,
  getGallery: getProductGallery,
  getId: getProductId,
  getName: getProductName,
  getPrice: getProductPrice,
  getProductRelatedProduct,
  getProductUpsellProduct,
  getProductSku,
  getProductThumbnailImage,
  getShortDescription: getProductShortDescription,
  getSlug: getProductSlug,
  getTotalReviews: getProductTotalReviews,
  getTypeId: getProductTypeId,
};

export default productGetters;
