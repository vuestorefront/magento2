// Creator: k6 Browser Recorder 0.6.2 (+ handmade cleanups)
import { sleep, group } from 'k6';
import http from 'k6/http';

import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js';

/**
 * @type {import('k6/options').Options}
 */
export const options = {
  vus: 10,
  duration: '5m',
  ext: {
    loadimpact: {
      name: 'Search products',
      note: 'Guest user browsing through a product',
      // eslint-disable-next-line unicorn/numeric-separators-style
      projectID: 3591701,
    },
  },
};

const { BASE_URL } = __ENV;

if (BASE_URL === undefined) {
  throw new Error('BASE_URL is not set');
}

export default function main() {
  let response;

  const vars = {};

  group(`page_1 - ${BASE_URL}/default`, () => {
    response = http.get(`${BASE_URL}/default`);
    sleep(0.5);

    response = http.post(
      `${BASE_URL}/api/magento/customQuery`,
      `[{"query":"
  query storeConfig {
    storeConfig {
        store_code,
        default_title,
        store_name,
        default_display_currency_code,
        locale,
        header_logo_src,
        logo_width,
        logo_height,
        logo_alt
    }
  }
"}]`,
    );

    response = http.post(
      `${BASE_URL}/api/magento/customQuery`,
      `[{"query":"
  query getStoresAndCurrencies {
      availableStores {
        store_code
      }
    currency {
      available_currency_codes
    }
  }
"}]`,
    );
    sleep(2.6);

    response = http.post(
      `${BASE_URL}/api/magento/route`,
      '["/women/tops-women/jackets-women.html",null]',
    );

    [vars.uid1] = jsonpath.query(response.json(), '$.data.route.uid');

    response = http.post(
      `${BASE_URL}/api/magento/customQuery`,
      `[{"query":"
  query categoryList {
    categories {
      items {
        ...CategoryFields
        children {
          ...CategoryFields
          children {
            ...CategoryFields
            children {
              ...CategoryFields
            }
          }
        }
      }
    }
  }

  fragment CategoryFields on CategoryTree {
    is_anchor
    name
    position
    product_count
    uid
    url_path
    url_suffix
    include_in_menu
  }

"}]`,
    );

    response = http.post(
      `${BASE_URL}/api/magento/customQuery`,
      `[{"query":"
  query getCategoryContentData($filters: CategoryFilterInput) {
    categoryList(filters: $filters) {
      uid
      display_mode
      landing_page
      cms_block {
        identifier
        content
      }
    }
  }
","queryVariables":{"filters":{"category_uid":{"eq":"${vars.uid1}"}}}}]`,
    );

    response = http.post(
      `${BASE_URL}/api/magento/customQuery`,
      `[{"query":"
  query getFacetData($search: String = \\"\\", $filter: ProductAttributeFilterInput, $pageSize: Int = 10, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {
    products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {
      items {
        __typename
        uid
        sku
        name
        stock_status
        only_x_left_in_stock
        thumbnail {
          url
          position
          disabled
          label
        }
        url_key
        url_rewrites {
          url
        }
        price_range {
          maximum_price {
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
          minimum_price {
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
  }
","queryVariables":{"pageSize":10,"search":"","filter":{"category_uid":{"in":["${vars.uid1}"]}},"sort":{},"currentPage":1}}]`,
    );
    sleep(0.5);

    response = http.post(
      `${BASE_URL}/api/magento/customQuery`,
      `[{"query":"
  query getProductFiltersByCategory($categoryIdFilter: FilterEqualTypeInput!) {
    products(filter: { category_uid: $categoryIdFilter }) {
      aggregations {
        label
        count
        attribute_code
        options {
          count
          label
          value
          __typename
        }
        position
        __typename
      }
      __typename
    }
  }
","queryVariables":{"categoryIdFilter":{"eq":"${vars.uid1}"}}}]`,
    );
    sleep(1.8);

    response = http.post(
      `${BASE_URL}/api/magento/productDetail`,
      '[{"filter":{"sku":{"eq":"WJ12"}},"configurations":[]},{"productDetail":"productDetail"}]',
    );

    response = http.post(
      `${BASE_URL}/api/magento/customQuery`,
      `[{"query":"
  query getProductPriceBySku($sku: String) {
    products(filter: {sku: {eq: $sku}}) {
      items {
        price_range {
          ...PriceRangeFields
        }

        ... on BundleProduct {
          items {
            position
            required
            sku
            title
            type
            uid
            options {
              can_change_quantity
              is_default
              position
              uid
              quantity
              product {
                uid
                sku
                name
                price_range {
                  maximum_price {
                    final_price {
                      currency
                      value
                    }
                    regular_price {
                      currency
                      value
                    }
                  }
                  minimum_price {
                    final_price {
                      currency
                      value
                    }
                    regular_price {
                      currency
                      value
                    }
                  }
                }
              }
            }
          }
        }

        ... on GroupedProduct {
          items {
            position
            qty
            product {
              uid
              sku
              name
              stock_status
              only_x_left_in_stock
              price_range {
                maximum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
                position
                disabled
                label
              }
            }
          }
        }

      }
    }
  }

  fragment PriceRangeFields on PriceRange {
    maximum_price {
      final_price {
        currency
        value
      }
      regular_price {
        currency
        value
      }
    }
    minimum_price {
      final_price {
        currency
        value
      }
      regular_price {
        currency
        value
      }
    }
  }

","queryVariables":{"sku":"WJ12"}}]`,
    );

    response = http.post(
      `${BASE_URL}/api/magento/upsellProduct`,
      '[{"filter":{"sku":{"eq":"WJ12"}}},null]',
    );

    response = http.post(
      `${BASE_URL}/api/magento/relatedProduct`,
      '[{"filter":{"sku":{"eq":"WJ12"}}},null]',
    );

    response = http.post(
      `${BASE_URL}/api/magento/productReviewRatingsMetadata`,
      '[null]',
    );
    sleep(2.3);

    response = http.post(
      `${BASE_URL}/api/magento/productReview`,
      '[{"filter":{"sku":{"eq":"WJ12"}}},null]',
    );

    response = http.post(
      `${BASE_URL}/api/magento/productReviewRatingsMetadata`,
      '[null]',
    );
  });
}
