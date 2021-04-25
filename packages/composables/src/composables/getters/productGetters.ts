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

type ProductVariantFilters = any;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductName = (product: Product): string => {
  if (!product) {
    return '';
  }

  return product.name;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductSlug = (product: Product, category?: Category): string => {
  const rewrites = product.url_rewrites;
  let url = `/p/${product.sku}`;
  if (!rewrites || rewrites.length === 0) {
    return url;
  }

  url = `/${rewrites[0].url}`;
  loopOuter:
  for (let i = 0; i < rewrites.length; i += 1) {
    const rewrite = rewrites[i];
    if (category && category.id && rewrite.parameters) {
      for (let j = 0; j < rewrite.parameters.length; j += 1) {
        const parameter = rewrite.parameters[j];
        // eslint-disable-next-line max-depth
        if (parameter.name === 'category' && parseInt(parameter.value, 10) === category.id) {
          url = `/${rewrite.url}`;
          break loopOuter;
        }
      }
    }
  }

  return url;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCoverImage = (product: Product): string => {
  if (!product || !product.image) {
    return null;
  }

  return product.image.url;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products: Product[], filters: ProductVariantFilters | any = {}): Product[] => products;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAttributes = (products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  if (!products || !products?.configurable_options) {
    return {};
  }

  const attributes = {};
  const configurableOptions = products.configurable_options;

  for (let i = 0; i < configurableOptions.length; i += 1) {
    const option = configurableOptions[i];
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

  return product.categories.map((category) => category.id);
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

export const getProductId = (product: Product): string => product.id;

export const getProductSku = (product: Product): string => product.sku;

export const getProductTypeId = (product: Product): string => product.type_id;

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
    breadcrumbs = categoryGetters.getBreadCrumbs(category) as AgnosticBreadcrumb[];
  }

  breadcrumbs.push({
    text: getProductName(product),
    route: {
      path: getProductSlug(product),
    },
  });

  return breadcrumbs;
};

export const getProductWishlistState = (product: Product): boolean => product?.isOnWishlist;

export const getProductTotalReviews = (): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAverageRating = (): number => 0;

export const getProductRelatedProduct = (product: Product) => product?.upsell_products;

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
  getProductSku,
  getShortDescription: getProductShortDescription,
  getSlug: getProductSlug,
  getTotalReviews: getProductTotalReviews,
  getTypeId: getProductTypeId,
  getWishlistState: getProductWishlistState,
};

export default productGetters;
