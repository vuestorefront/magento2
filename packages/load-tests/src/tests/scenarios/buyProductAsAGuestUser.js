// Creator: k6 Browser Recorder 0.6.2
import { check, sleep, group } from 'k6';
import http from 'k6/http';
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js';
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

  const vars = {};
  setDefaultCookies(BASE_URL);

  group(`Buy product as a guest user - page ${BASE_URL}`, () => {
    group('Visit the homepage', () => {
      res = http.get(
        `${BASE_URL}/default`,
        {
          headers,
        },
      );
      sleep(0.8);

      res = http.post(
        `${BASE_URL}/api/magento/customQuery`,
        '[{"query":"\\n  query storeConfig {\\n    storeConfig {\\n        store_code,\\n        default_title,\\n        store_name,\\n        default_display_currency_code,\\n        locale,\\n        header_logo_src,\\n        logo_width,\\n        logo_height,\\n        logo_alt\\n    }\\n  }\\n"}]',
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/customQuery`,
        '[{"query":"\\n  query getStoresAndCurrencies {\\n      availableStores {\\n        store_code\\n      }\\n    currency {\\n      available_currency_codes\\n    }\\n  }\\n"}]',
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/customQuery`,
        '[{"query":"\\n  query getStoresAndCurrencies {\\n      availableStores {\\n        store_code\\n      }\\n    currency {\\n      available_currency_codes\\n    }\\n  }\\n"}]',
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(2.7);

      res = http.post(
        `${BASE_URL}/api/magento/customQuery`,
        '[{"query":"\\n  query categoryList {\\n    categories {\\n      items {\\n        ...CategoryFields\\n        children {\\n          ...CategoryFields\\n          children {\\n            ...CategoryFields\\n            children {\\n              ...CategoryFields\\n            }\\n          }\\n        }\\n      }\\n    }\\n  }\\n  \\n  fragment CategoryFields on CategoryTree {\\n    is_anchor\\n    name\\n    position\\n    product_count\\n    uid\\n    url_path\\n    url_suffix\\n    include_in_menu\\n  }\\n\\n"}]',
        {
          headers,
        },
      );
      executeCommonChecks(res);
    });

    group('Select the a category', () => {
      res = http.post(
        `${BASE_URL}/api/magento/route`,
        '["/women.html",null]',
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/customQuery`,
        '[{"query":"\\n  query categoryList {\\n    categories {\\n      items {\\n        ...CategoryFields\\n        children {\\n          ...CategoryFields\\n          children {\\n            ...CategoryFields\\n            children {\\n              ...CategoryFields\\n            }\\n          }\\n        }\\n      }\\n    }\\n  }\\n  \\n  fragment CategoryFields on CategoryTree {\\n    is_anchor\\n    name\\n    position\\n    product_count\\n    uid\\n    url_path\\n    url_suffix\\n    include_in_menu\\n  }\\n\\n"}]',
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/customQuery`,
        '[{"query":"\\n  query getCategoryContentData($filters: CategoryFilterInput) {\\n    categoryList(filters: $filters) {\\n      uid\\n      display_mode\\n      landing_page\\n      cms_block {\\n        identifier\\n        content\\n      }\\n    }\\n  }\\n","queryVariables":{"filters":{"category_uid":{"eq":"MjA="}}}}]',
        {
          headers,
        },
      );
      executeCommonChecks(res);
      [vars.uid1] = jsonpath.query(res.json(), '$.data.categoryList[0].uid');

      res = http.post(
        `${BASE_URL}/api/magento/customQuery`,
        `[{"query":"\\n  query getFacetData($search: String = \\"\\", $filter: ProductAttributeFilterInput, $pageSize: Int = 10, $currentPage: Int = 1, $sort: ProductAttributeSortInput) {\\n    products(search: $search, filter: $filter, pageSize: $pageSize, currentPage: $currentPage, sort: $sort) {\\n      items {\\n        __typename\\n        uid\\n        sku\\n        name\\n        stock_status\\n        only_x_left_in_stock\\n        thumbnail {\\n          url\\n          position\\n          disabled\\n          label\\n        }\\n        url_key\\n        url_rewrites {\\n          url\\n        }\\n        price_range {\\n          maximum_price {\\n            final_price {\\n              currency\\n              value\\n            }\\n            regular_price {\\n              currency\\n              value\\n            }\\n          }\\n          minimum_price {\\n            final_price {\\n              currency\\n              value\\n            }\\n            regular_price {\\n              currency\\n              value\\n            }\\n          }\\n        }\\n      }\\n      page_info {\\n        current_page\\n        page_size\\n        total_pages\\n      }\\n      total_count\\n    }\\n  }\\n","queryVariables":{"pageSize":10,"search":"","filter":{"category_uid":{"in":["${vars.uid1}"]}},"sort":{},"currentPage":1}}]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(0.5);

      res = http.post(
        `${BASE_URL}/api/magento/customQuery`,
        `[{"query":"\\n  query getProductFiltersByCategory($categoryIdFilter: FilterEqualTypeInput!) {\\n    products(filter: { category_uid: $categoryIdFilter }) {\\n      aggregations {\\n        label\\n        count\\n        attribute_code\\n        options {\\n          count\\n          label\\n          value\\n          __typename\\n        }\\n        position\\n        __typename\\n      }\\n      __typename\\n    }\\n  }\\n","queryVariables":{"categoryIdFilter":{"eq":"${vars.uid1}"}}}]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(2.1);
    });

    group('configure the product', () => {
      res = http.post(
        `${BASE_URL}/api/magento/productDetail`,
        '[{"filter":{"sku":{"eq":"WSH11"}},"configurations":[]},{"productDetail":"productDetail"}]',
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/customQuery`,
        '[{"query":"\\n  query getProductPriceBySku(\\n    $filter: ProductAttributeFilterInput,\\n    $configurations: [ID!]\\n  ) {\\n    products(filter: $filter) {\\n      items {\\n        price_range {\\n          ...PriceRangeFields\\n        }\\n\\n        ... on ConfigurableProduct {\\n          price_range {\\n            maximum_price {\\n              final_price {\\n                currency\\n                value\\n              }\\n              regular_price {\\n                currency\\n                value\\n              }\\n            }\\n            minimum_price {\\n              final_price {\\n                currency\\n                value\\n              }\\n              regular_price {\\n                currency\\n                value\\n              }\\n            }\\n          }\\n\\n          configurable_product_options_selection(configurableOptionValueUids: $configurations) {\\n            options_available_for_selection {\\n              attribute_code\\n              option_value_uids\\n            }\\n            media_gallery {\\n              disabled\\n              label\\n              position\\n              url\\n            }\\n            variant {\\n              uid\\n              sku\\n              name\\n              price_range {\\n                ...PriceRangeFields\\n              }\\n            }\\n          }\\n        }\\n\\n        ... on BundleProduct {\\n          items {\\n            position\\n            required\\n            sku\\n            title\\n            type\\n            uid\\n            options {\\n              can_change_quantity\\n              is_default\\n              position\\n              uid\\n              quantity\\n              product {\\n                uid\\n                sku\\n                name\\n                price_range {\\n                   ...PriceRangeFields\\n                }\\n              }\\n            }\\n          }\\n        }\\n\\n        ... on GroupedProduct {\\n          items {\\n            position\\n            qty\\n            product {\\n              uid\\n              sku\\n              name\\n              stock_status\\n              only_x_left_in_stock\\n              price_range {\\n                maximum_price {\\n                  final_price {\\n                    currency\\n                    value\\n                  }\\n                  regular_price {\\n                    currency\\n                    value\\n                  }\\n                }\\n                minimum_price {\\n                  final_price {\\n                    currency\\n                    value\\n                  }\\n                  regular_price {\\n                    currency\\n                    value\\n                  }\\n                }\\n              }\\n              thumbnail {\\n                url\\n                position\\n                disabled\\n                label\\n              }\\n            }\\n          }\\n        }\\n\\n      }\\n    }\\n  }\\n  \\n  fragment PriceRangeFields on PriceRange {\\n    maximum_price {\\n      final_price {\\n        currency\\n        value\\n      }\\n      regular_price {\\n        currency\\n        value\\n      }\\n    }\\n    minimum_price {\\n      final_price {\\n        currency\\n        value\\n      }\\n      regular_price {\\n        currency\\n        value\\n      }\\n    }\\n  }\\n\\n","queryVariables":{"filter":{"sku":{"eq":"WSH11"}},"configurations":[]}}]',
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/upsellProducts`,
        '[{"filter":{"sku":{"eq":"WSH11"}}},null]',
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/relatedProduct`,
        '[{"filter":{"sku":{"eq":"WSH11"}}},null]',
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/productReviewRatingsMetadata`,
        '[null]',
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(1.1);

      res = http.post(
        `${BASE_URL}/api/magento/customQuery`,
        '[{"query":"\\n  query getProductPriceBySku(\\n    $filter: ProductAttributeFilterInput,\\n    $configurations: [ID!]\\n  ) {\\n    products(filter: $filter) {\\n      items {\\n        price_range {\\n          ...PriceRangeFields\\n        }\\n\\n        ... on ConfigurableProduct {\\n          price_range {\\n            maximum_price {\\n              final_price {\\n                currency\\n                value\\n              }\\n              regular_price {\\n                currency\\n                value\\n              }\\n            }\\n            minimum_price {\\n              final_price {\\n                currency\\n                value\\n              }\\n              regular_price {\\n                currency\\n                value\\n              }\\n            }\\n          }\\n\\n          configurable_product_options_selection(configurableOptionValueUids: $configurations) {\\n            options_available_for_selection {\\n              attribute_code\\n              option_value_uids\\n            }\\n            media_gallery {\\n              disabled\\n              label\\n              position\\n              url\\n            }\\n            variant {\\n              uid\\n              sku\\n              name\\n              price_range {\\n                ...PriceRangeFields\\n              }\\n            }\\n          }\\n        }\\n\\n        ... on BundleProduct {\\n          items {\\n            position\\n            required\\n            sku\\n            title\\n            type\\n            uid\\n            options {\\n              can_change_quantity\\n              is_default\\n              position\\n              uid\\n              quantity\\n              product {\\n                uid\\n                sku\\n                name\\n                price_range {\\n                   ...PriceRangeFields\\n                }\\n              }\\n            }\\n          }\\n        }\\n\\n        ... on GroupedProduct {\\n          items {\\n            position\\n            qty\\n            product {\\n              uid\\n              sku\\n              name\\n              stock_status\\n              only_x_left_in_stock\\n              price_range {\\n                maximum_price {\\n                  final_price {\\n                    currency\\n                    value\\n                  }\\n                  regular_price {\\n                    currency\\n                    value\\n                  }\\n                }\\n                minimum_price {\\n                  final_price {\\n                    currency\\n                    value\\n                  }\\n                  regular_price {\\n                    currency\\n                    value\\n                  }\\n                }\\n              }\\n              thumbnail {\\n                url\\n                position\\n                disabled\\n                label\\n              }\\n            }\\n          }\\n        }\\n\\n      }\\n    }\\n  }\\n  \\n  fragment PriceRangeFields on PriceRange {\\n    maximum_price {\\n      final_price {\\n        currency\\n        value\\n      }\\n      regular_price {\\n        currency\\n        value\\n      }\\n    }\\n    minimum_price {\\n      final_price {\\n        currency\\n        value\\n      }\\n      regular_price {\\n        currency\\n        value\\n      }\\n    }\\n  }\\n\\n","queryVariables":{"filter":{"sku":{"eq":"WSH11"}},"configurations":["Y29uZmlndXJhYmxlLzkzLzU4"]}}]',
        {
          headers,
        },
      );
      executeCommonChecks(res);

      [vars.index01] = jsonpath.query(
        res.json(),
        '$.data.products.items[0].configurable_product_options_selection.options_available_for_selection[1].option_value_uids[0]',
      );

      [vars.index11] = jsonpath.query(
        res.json(),
        '$.data.products.items[0].configurable_product_options_selection.options_available_for_selection[0].option_value_uids[1]',
      );

      sleep(1.6);

      res = http.post(
        `${BASE_URL}/api/magento/customQuery`,
        `[{"query":"\\n  query getProductPriceBySku(\\n    $filter: ProductAttributeFilterInput,\\n    $configurations: [ID!]\\n  ) {\\n    products(filter: $filter) {\\n      items {\\n        price_range {\\n          ...PriceRangeFields\\n        }\\n\\n        ... on ConfigurableProduct {\\n          price_range {\\n            maximum_price {\\n              final_price {\\n                currency\\n                value\\n              }\\n              regular_price {\\n                currency\\n                value\\n              }\\n            }\\n            minimum_price {\\n              final_price {\\n                currency\\n                value\\n              }\\n              regular_price {\\n                currency\\n                value\\n              }\\n            }\\n          }\\n\\n          configurable_product_options_selection(configurableOptionValueUids: $configurations) {\\n            options_available_for_selection {\\n              attribute_code\\n              option_value_uids\\n            }\\n            media_gallery {\\n              disabled\\n              label\\n              position\\n              url\\n            }\\n            variant {\\n              uid\\n              sku\\n              name\\n              price_range {\\n                ...PriceRangeFields\\n              }\\n            }\\n          }\\n        }\\n\\n        ... on BundleProduct {\\n          items {\\n            position\\n            required\\n            sku\\n            title\\n            type\\n            uid\\n            options {\\n              can_change_quantity\\n              is_default\\n              position\\n              uid\\n              quantity\\n              product {\\n                uid\\n                sku\\n                name\\n                price_range {\\n                   ...PriceRangeFields\\n                }\\n              }\\n            }\\n          }\\n        }\\n\\n        ... on GroupedProduct {\\n          items {\\n            position\\n            qty\\n            product {\\n              uid\\n              sku\\n              name\\n              stock_status\\n              only_x_left_in_stock\\n              price_range {\\n                maximum_price {\\n                  final_price {\\n                    currency\\n                    value\\n                  }\\n                  regular_price {\\n                    currency\\n                    value\\n                  }\\n                }\\n                minimum_price {\\n                  final_price {\\n                    currency\\n                    value\\n                  }\\n                  regular_price {\\n                    currency\\n                    value\\n                  }\\n                }\\n              }\\n              thumbnail {\\n                url\\n                position\\n                disabled\\n                label\\n              }\\n            }\\n          }\\n        }\\n\\n      }\\n    }\\n  }\\n  \\n  fragment PriceRangeFields on PriceRange {\\n    maximum_price {\\n      final_price {\\n        currency\\n        value\\n      }\\n      regular_price {\\n        currency\\n        value\\n      }\\n    }\\n    minimum_price {\\n      final_price {\\n        currency\\n        value\\n      }\\n      regular_price {\\n        currency\\n        value\\n      }\\n    }\\n  }\\n\\n","queryVariables":{"filter":{"sku":{"eq":"WSH11"}},"configurations":["${vars.index01}","${vars.index11}"]}}]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(0.5);
    });

    group('Add product to the cart', () => {
      res = http.post(
        `${BASE_URL}/api/magento/createEmptyCart`,
        '[]',
        {
          headers,
        },
      );
      executeCommonChecks(res);

      [vars.cart_id] = jsonpath.query(
        res.json(),
        '$.data.createEmptyCart',
      );

      res = http.post(
        `${BASE_URL}/api/magento/cart`,
        `["${vars.cart_id}"]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/addProductsToCart`,
        `[{"cartId":"${vars.cart_id}","cartItems":[{"quantity":1,"sku":"WSH11","selected_options":["${vars.index01}","${vars.index11}"]}]},null]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(3);
    });

    group('Go through the checkout', () => {
      res = http.post(
        `${BASE_URL}/api/magento/cart`,
        `["${vars.cart_id}"]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(5.3);

      res = http.post(
        `${BASE_URL}/api/magento/setGuestEmailOnCart`,
        `[{"email":"john.loadtest@gmail.com","cart_id":"${vars.cart_id}"},null]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/cart`,
        `["${vars.cart_id}"]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/cart`,
        `["${vars.cart_id}"]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/countries`,
        '[]',
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(2.2);

      res = http.post(
        `${BASE_URL}/api/magento/country`,
        '["PL",null]',
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(3.9);

      res = http.post(
        `${BASE_URL}/api/magento/setShippingAddressesOnCart`,
        `[{"cart_id":"${vars.cart_id}","shipping_addresses":[{"address":{"firstname":"john","lastname":"LoadTest","street":["Load Test 11","11"],"city":"Load Test","region":"PL-10","country_code":"PL","postcode":"11-111","telephone":"123123123","save_in_address_book":false}}]}]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(1.6);

      res = http.post(
        `${BASE_URL}/api/magento/setShippingMethodsOnCart`,
        `[{"cart_id":"${vars.cart_id}","shipping_methods":[{"carrier_code":"flatrate","method_code":"flatrate"}]},null]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(1.3);

      res = http.post(
        `${BASE_URL}/api/magento/cart`,
        `["${vars.cart_id}"]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/cart`,
        `["${vars.cart_id}"]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/countries`,
        '[]',
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(1.7);

      res = http.post(
        `${BASE_URL}/api/magento/country`,
        '["PL",null]',
        {
          headers,
        },
      );

      res = http.post(
        `${BASE_URL}/api/magento/country`,
        '["PL",null]',
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(1.4);

      res = http.post(
        `${BASE_URL}/api/magento/setBillingAddressOnCart`,
        `[{"cart_id":"${vars.cart_id}","billing_address":{"address":{"firstname":"john","lastname":"LoadTest","street":["Load Test 11","11"],"city":"Load Test","region":"PL-10","country_code":"PL","postcode":"11-111","telephone":"123123123","save_in_address_book":false},"same_as_shipping":true}},null]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/setShippingMethodsOnCart`,
        `[{"cart_id":"${vars.cart_id}","shipping_methods":[{"carrier_code":"flatrate","method_code":"flatrate"}]},null]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(0.5);

      res = http.post(
        `${BASE_URL}/api/magento/cart`,
        `["${vars.cart_id}"]`,
        {
          headers,
        },
      );

      res = http.post(
        `${BASE_URL}/api/magento/cart`,
        `["${vars.cart_id}"]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);

      res = http.post(
        `${BASE_URL}/api/magento/getAvailablePaymentMethods`,
        `[{"cartId":"${vars.cart_id}"},null]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(1.2);

      res = http.post(
        `${BASE_URL}/api/magento/setPaymentMethodOnCart`,
        `[{"cart_id":"${vars.cart_id}","payment_method":{"code":"checkmo"}},null]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);
      sleep(1.5);
    });

    group('Place the order', () => {
      res = http.post(
        `${BASE_URL}/api/magento/placeOrder`,
        `[{"cart_id":"${vars.cart_id}"},null]`,
        {
          headers,
        },
      );
      executeCommonChecks(res);
    });
  });
}
