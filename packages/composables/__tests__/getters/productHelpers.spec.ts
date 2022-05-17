import {
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
  getGroupedProducts,
  getBundleProducts,
} from '../../src/getters/productGetters';

const product = {
  options_container: null,
  meta_description: null,
  meta_keyword: null,
  meta_title: null,
  description: {
    html: '<p>The sporty Joust Duffle Bag can\'t be beat - not in the gym, not on the luggage carousel, not anywhere. Big enough to haul a basketball or soccer ball and some sneakers with plenty of room to spare, it\'s ideal for athletes with places to go.<p>\n<ul>\n<li>Dual top handles.</li>\n<li>Adjustable shoulder strap.</li>\n<li>Full-length zipper.</li>\n<li>L 29" x W 13" x H 11".</li>\n</ul>',
    __typename: 'ComplexTextValue',
  },
  short_description: { html: '', __typename: 'ComplexTextValue' },
  uid: 'MQ==',
  __typename: 'SimpleProduct',
  sku: '24-MB01',
  name: 'Joust Duffle Bag',
  stock_status: 'IN_STOCK',
  only_x_left_in_stock: null,
  rating_summary: 50,
  thumbnail: {
    url: 'https://m2.caravelx.com/media/catalog/product/cache/746ba992681b73af7e339699b3e0caf7/m/b/mb01-blue-0.jpg',
    position: null,
    disabled: null,
    label: 'Joust Duffle Bag',
    __typename: 'ProductImage',
  },
  price_range: {
    maximum_price: {
      final_price: {
        currency: 'USD',
        value: 34,
        __typename: 'Money',
      },
      regular_price: { currency: 'USD', value: 34, __typename: 'Money' },
      __typename: 'ProductPrice',
    },
    minimum_price: {
      final_price: {
        currency: 'USD',
        value: 34,
        __typename: 'Money',
      },
      regular_price: { currency: 'USD', value: 34, __typename: 'Money' },
      __typename: 'ProductPrice',
    },
    __typename: 'PriceRange',
  },
  url_key: 'joust-duffle-bag',
  url_rewrites: [{
    url: 'joust-duffle-bag.html',
    __typename: 'UrlRewrite',
  }, {
    url: 'gear/joust-duffle-bag.html',
    __typename: 'UrlRewrite',
  }, { url: 'gear/bags/joust-duffle-bag.html', __typename: 'UrlRewrite' }],
  categories: [{
    uid: 'Mw==',
    name: 'Gear',
    url_suffix: '.html',
    url_path: 'gear',
    breadcrumbs: null,
    __typename: 'CategoryTree',
  }, {
    uid: 'NA==',
    name: 'Bags',
    url_suffix: '.html',
    url_path: 'gear/bags',
    breadcrumbs: [{
      category_name: 'Gear',
      category_url_path: 'gear',
      __typename: 'Breadcrumb',
    }],
    __typename: 'CategoryTree',
  }],
  review_count: 2,
  reviews: {
    items: [{
      average_rating: 60,
      ratings_breakdown: [{
        name: 'Rating',
        value: '3',
        __typename: 'ProductReviewRating',
      }],
      __typename: 'ProductReview',
    }, {
      average_rating: 40,
      ratings_breakdown: [{
        name: 'Rating',
        value: '2',
        __typename: 'ProductReviewRating',
      }],
      __typename: 'ProductReview',
    }],
    __typename: 'ProductReviews',
  },
  small_image: {
    url: 'https://m2.caravelx.com/media/catalog/product/cache/746ba992681b73af7e339699b3e0caf7/m/b/mb01-blue-0.jpg',
    position: null,
    disabled: null,
    label: 'Joust Duffle Bag',
    __typename: 'ProductImage',
  },
  image: {
    url: 'https://m2.caravelx.com/media/catalog/product/cache/746ba992681b73af7e339699b3e0caf7/m/b/mb01-blue-0.jpg',
    position: null,
    disabled: null,
    label: 'Joust Duffle Bag',
    __typename: 'ProductImage',
  },
  media_gallery: [{
    url: 'https://m2.caravelx.com/media/catalog/product/cache/746ba992681b73af7e339699b3e0caf7/m/b/mb01-blue-0.jpg',
    position: 1,
    disabled: false,
    label: 'Image',
    __typename: 'ProductImage',
  }],
} as any;

describe('[magento-getters] product getters', () => {
  it('returns default values', () => {
    expect(getName(null)).toBe('');
    expect(getSlug(null)).toBe('');
    expect(getGallery(null)).toEqual([]);
    expect(getFiltered(null)).toEqual([]);
  });

  it('returns name', () => {
    expect(getName(product)).toBe('Joust Duffle Bag');
  });

  it('returns slug', () => {
    expect(getSlug(product)).toBe('/joust-duffle-bag.html');
  });

  it('returns price', () => {
    expect(getPrice(product)).toEqual({ regular: 34, special: null });
  });

  it('returns gallery', () => {
    expect(getGallery(product)).toEqual([
      {
        small: 'https://m2.caravelx.com/media/catalog/product/cache/746ba992681b73af7e339699b3e0caf7/m/b/mb01-blue-0.jpg',
        normal: 'https://m2.caravelx.com/media/catalog/product/cache/746ba992681b73af7e339699b3e0caf7/m/b/mb01-blue-0.jpg',
        big: 'https://m2.caravelx.com/media/catalog/product/cache/746ba992681b73af7e339699b3e0caf7/m/b/mb01-blue-0.jpg',
      },
    ]);
  });

  it('returns cover image', () => {
    expect(getCoverImage({ images: [] } as any)).toEqual(null);
    expect(getCoverImage(product)).toEqual('https://m2.caravelx.com/media/catalog/product/cache/746ba992681b73af7e339699b3e0caf7/m/b/mb01-blue-0.jpg');
  });

  it('returns product categories', () => {
    expect(getCategoryIds(product)).toEqual([
      'Mw==',
      'NA==',
    ]);
  });

  it('returns product ID', () => {
    expect(getId(product)).toEqual('MQ==');
  });

  it('returns empty array if there is no product', () => {
    expect(getAttributes(null)).toEqual({});
  });
});
