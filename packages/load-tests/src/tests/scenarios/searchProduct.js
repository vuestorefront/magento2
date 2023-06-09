// Creator: k6 Browser Recorder 0.6.2

import { check, sleep, group } from 'k6';
import http from 'k6/http';
import { setDefaultCookies } from './utils/setDefaultCookies.js';

export const options = {
  vus: 200,
  duration: '5m',
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(80)<250'], // 80% of requests should be below 250ms
  },
};

const { BASE_URL } = __ENV;

if (BASE_URL === undefined) {
  throw new Error('BASE_URL is not set');
}

const headers = {
  accept: 'application/json, text/plain, */*',
  'content-type': 'application/json',
  'upgrade-insecure-requests': '1',
  'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
};

const executeCommonChecks = (res) => {
  check(res, {
    'is status 200': (r) => r.status === 200,
    'has no errors': (r) => !r.json().errors,
  });
};

export default function main() {
  let res;
  setDefaultCookies(BASE_URL);

  group(
    `Search Product - page ${BASE_URL}`,
    () => {
      group('Visit the homepage', () => {
        res = http.get(
          `${BASE_URL}/default`,
          { headers },
        );
        check(res, {
          'is status 200': (r) => r.status === 200,
        });

        res = http.post(
          `${BASE_URL}/api/magento/customQuery`,
          '[{"query":"\\n  query storeConfig {\\n    storeConfig {\\n        store_code,\\n        default_title,\\n        store_name,\\n        default_display_currency_code,\\n        locale,\\n        header_logo_src,\\n        logo_width,\\n        logo_height,\\n        logo_alt\\n    }\\n  }\\n"}]',
          { headers },
        );
        executeCommonChecks(res);

        res = http.post(
          `${BASE_URL}/api/magento/customQuery`,
          '[{"query":"\\n  query getStoresAndCurrencies {\\n      availableStores {\\n        store_code\\n      }\\n    currency {\\n      available_currency_codes\\n    }\\n  }\\n"}]',
          { headers },
        );
        executeCommonChecks(res);

        res = http.post(
          `${BASE_URL}/api/magento/customQuery`,
          '[{"query":"\\n  query getStoresAndCurrencies {\\n      availableStores {\\n        store_code\\n      }\\n    currency {\\n      available_currency_codes\\n    }\\n  }\\n"}]',
          { headers },
        );
        executeCommonChecks(res);
        sleep(4.1);
      });

      group('Search for a product', () => {
        res = http.post(
          `${BASE_URL}/api/magento/products`,
          '[{"pageSize":12,"search":"erika"},{"products":"products"}]',
          { headers },
        );
        executeCommonChecks(res);
        sleep(1.9);
      });

      group('Visit the found product', () => {
        res = http.post(
          `${BASE_URL}/api/magento/productDetail`,
          '[{"filter":{"sku":{"eq":"WSH12"}},"configurations":[]},{"productDetail":"productDetail"}]',
          { headers },
        );
        executeCommonChecks(res);

        res = http.post(
          `${BASE_URL}/api/magento/customQuery`,
          '[{"query":"\\n  query getProductPriceBySku(\\n    $filter: ProductAttributeFilterInput,\\n    $configurations: [ID!]\\n  ) {\\n    products(filter: $filter) {\\n      items {\\n        price_range {\\n          ...PriceRangeFields\\n        }\\n\\n        ... on ConfigurableProduct {\\n          price_range {\\n            maximum_price {\\n              final_price {\\n                currency\\n                value\\n              }\\n              regular_price {\\n                currency\\n                value\\n              }\\n            }\\n            minimum_price {\\n              final_price {\\n                currency\\n                value\\n              }\\n              regular_price {\\n                currency\\n                value\\n              }\\n            }\\n          }\\n\\n          configurable_product_options_selection(configurableOptionValueUids: $configurations) {\\n            options_available_for_selection {\\n              attribute_code\\n              option_value_uids\\n            }\\n            media_gallery {\\n              disabled\\n              label\\n              position\\n              url\\n            }\\n            variant {\\n              uid\\n              sku\\n              name\\n              price_range {\\n                ...PriceRangeFields\\n              }\\n            }\\n          }\\n        }\\n\\n        ... on BundleProduct {\\n          items {\\n            position\\n            required\\n            sku\\n            title\\n            type\\n            uid\\n            options {\\n              can_change_quantity\\n              is_default\\n              position\\n              uid\\n              quantity\\n              product {\\n                uid\\n                sku\\n                name\\n                price_range {\\n                   ...PriceRangeFields\\n                }\\n              }\\n            }\\n          }\\n        }\\n\\n        ... on GroupedProduct {\\n          items {\\n            position\\n            qty\\n            product {\\n              uid\\n              sku\\n              name\\n              stock_status\\n              only_x_left_in_stock\\n              price_range {\\n                maximum_price {\\n                  final_price {\\n                    currency\\n                    value\\n                  }\\n                  regular_price {\\n                    currency\\n                    value\\n                  }\\n                }\\n                minimum_price {\\n                  final_price {\\n                    currency\\n                    value\\n                  }\\n                  regular_price {\\n                    currency\\n                    value\\n                  }\\n                }\\n              }\\n              thumbnail {\\n                url\\n                position\\n                disabled\\n                label\\n              }\\n            }\\n          }\\n        }\\n\\n      }\\n    }\\n  }\\n  \\n  fragment PriceRangeFields on PriceRange {\\n    maximum_price {\\n      final_price {\\n        currency\\n        value\\n      }\\n      regular_price {\\n        currency\\n        value\\n      }\\n    }\\n    minimum_price {\\n      final_price {\\n        currency\\n        value\\n      }\\n      regular_price {\\n        currency\\n        value\\n      }\\n    }\\n  }\\n\\n","queryVariables":{"filter":{"sku":{"eq":"WSH12"}},"configurations":[]}}]',
          { headers },
        );
        executeCommonChecks(res);

        res = http.post(
          `${BASE_URL}/api/magento/relatedProduct`,
          '[{"filter":{"sku":{"eq":"WSH12"}}},null]',
          { headers },
        );
        executeCommonChecks(res);

        res = http.post(
          `${BASE_URL}/api/magento/upsellProducts`,
          '[{"filter":{"sku":{"eq":"WSH12"}}},null]',
          { headers },
        );
        executeCommonChecks(res);

        res = http.post(
          `${BASE_URL}/api/magento/productReviewRatingsMetadata`,
          '[null]',
          { headers },
        );
        executeCommonChecks(res);
      });
    },
  );
}
