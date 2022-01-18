export const useEmptyCartMock = (cartData = {}) => ({
  load: jest.fn(),
  loading: {
    value: false,
  },
  removeItem: jest.fn(),
  updateItemQty: jest.fn(),
  cart: {
    value: {},
  },
  ...cartData,
});

export const useCartMock = (cartData = {}) => ({
  load: jest.fn(),
  loading: {
    value: false,
  },
  removeItem: jest.fn(),
  updateItemQty: jest.fn(),
  cart: {
    value: {
      items: [
        {
          __typename: 'Product1',
          uid: 'NDUw',
          product: {
            __typename: 'Product1',
            uid: 'MTAzNA==',
            sku: 'Product1',
            name: 'Product1',
            stock_status: 'OUT_OF_STOCK',
            only_x_left_in_stock: null,
            rating_summary: 0,
            thumbnail: {
              __typename: 'ProductImage',
              url: 'https://xxx.jpg',
              position: null,
              disabled: null,
              label: 'Product1',
            },
            url_key: 'product-1',
            url_rewrites: [
              {
                __typename: 'UrlRewrite',
                url: 'product-1.html',
              },
            ],
            price_range: {
              __typename: 'PriceRange',
              maximum_price: {
                __typename: 'ProductPrice',
                final_price: {
                  __typename: 'Money',
                  currency: 'USD',
                  value: 27,
                },
                regular_price: {
                  __typename: 'Money',
                  currency: 'USD',
                  value: 27,
                },
              },
              minimum_price: {
                __typename: 'ProductPrice',
                final_price: {
                  __typename: 'Money',
                  currency: 'USD',
                  value: 27,
                },
                regular_price: {
                  __typename: 'Money',
                  currency: 'USD',
                  value: 27,
                },
              },
            },
            categories: [
              {
                __typename: 'CategoryTree',
                uid: 'MTM=',
                name: 'Bottoms',
                url_suffix: '.html',
                url_path: 'men/bottoms-men',
                breadcrumbs: [
                  {
                    __typename: 'Breadcrumb',
                    category_name: 'Men',
                    category_url_path: 'men',
                  },
                ],
              },
              {
                __typename: 'CategoryTree',
                uid: 'MTk=',
                name: 'Shorts',
                url_suffix: '.html',
                url_path: 'men/bottoms-men/shorts-men',
                breadcrumbs: [
                  {
                    __typename: 'Breadcrumb',
                    category_name: 'Men',
                    category_url_path: 'men',
                  },
                  {
                    __typename: 'Breadcrumb',
                    category_name: 'Bottoms',
                    category_url_path: 'men/bottoms-men',
                  },
                ],
              },
              {
                __typename: 'CategoryTree',
                uid: 'MzE=',
                name: 'Men Sale',
                url_suffix: '.html',
                url_path: 'promotions/men-sale',
                breadcrumbs: null,
              },
            ],
            review_count: 0,
            reviews: {
              __typename: 'ProductReviews',
              items: [],
            },
          },
          prices: {
            __typename: 'CartItemPrices',
            row_total: {
              __typename: 'Money',
              value: 27,
            },
            row_total_including_tax: {
              __typename: 'Money',
              value: 27,
            },
            total_item_discount: {
              __typename: 'Money',
              value: 0,
            },
          },
          quantity: 1,
          configurable_options: [
            {
              __typename: 'SelectedConfigurableOption',
              configurable_product_option_uid: 'Y29uZmlndXJhYmxlLzEwMzQvOTM=',
              option_label: 'Color',
              configurable_product_option_value_uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
              value_label: 'Black',
            },
            {
              __typename: 'SelectedConfigurableOption',
              configurable_product_option_uid: 'Y29uZmlndXJhYmxlLzEwMzQvMTQ0',
              option_label: 'Size',
              configurable_product_option_value_uid: 'Y29uZmlndXJhYmxlLzE0NC8xNzc=',
              value_label: '34',
            },
          ],
        },
        {
          __typename: 'Product2',
          uid: 'NDUw2',
          product: {
            __typename: 'Product2',
            uid: 'MTAzNA==',
            sku: 'Product2',
            name: 'Product2',
            stock_status: 'IN_STOCK',
            only_x_left_in_stock: null,
            rating_summary: 0,
            thumbnail: {
              __typename: 'ProductImage',
              url: 'https://xxx.jpg',
              position: null,
              disabled: null,
              label: 'Product2',
            },
            url_key: 'product-2',
            url_rewrites: [
              {
                __typename: 'UrlRewrite',
                url: 'product-2.html',
              },
            ],
            price_range: {
              __typename: 'PriceRange',
              maximum_price: {
                __typename: 'ProductPrice',
                final_price: {
                  __typename: 'Money',
                  currency: 'USD',
                  value: 10,
                },
                regular_price: {
                  __typename: 'Money',
                  currency: 'USD',
                  value: 10,
                },
              },
              minimum_price: {
                __typename: 'ProductPrice',
                final_price: {
                  __typename: 'Money',
                  currency: 'USD',
                  value: 10,
                },
                regular_price: {
                  __typename: 'Money',
                  currency: 'USD',
                  value: 10,
                },
              },
            },
            categories: [
              {
                __typename: 'CategoryTree',
                uid: 'MTM=',
                name: 'Bottoms',
                url_suffix: '.html',
                url_path: 'men/bottoms-men',
                breadcrumbs: [
                  {
                    __typename: 'Breadcrumb',
                    category_name: 'Men',
                    category_url_path: 'men',
                  },
                ],
              },
              {
                __typename: 'CategoryTree',
                uid: 'MTk=',
                name: 'Shorts',
                url_suffix: '.html',
                url_path: 'men/bottoms-men/shorts-men',
                breadcrumbs: [
                  {
                    __typename: 'Breadcrumb',
                    category_name: 'Men',
                    category_url_path: 'men',
                  },
                  {
                    __typename: 'Breadcrumb',
                    category_name: 'Bottoms',
                    category_url_path: 'men/bottoms-men',
                  },
                ],
              },
              {
                __typename: 'CategoryTree',
                uid: 'MzE=',
                name: 'Men Sale',
                url_suffix: '.html',
                url_path: 'promotions/men-sale',
                breadcrumbs: null,
              },
            ],
            review_count: 0,
            reviews: {
              __typename: 'ProductReviews',
              items: [],
            },
          },
          prices: {
            __typename: 'CartItemPrices',
            row_total: {
              __typename: 'Money',
              value: 10,
            },
            row_total_including_tax: {
              __typename: 'Money',
              value: 10,
            },
            total_item_discount: {
              __typename: 'Money',
              value: 0,
            },
          },
          quantity: 1,
          configurable_options: [
            {
              __typename: 'SelectedConfigurableOption',
              configurable_product_option_uid: 'Y29uZmlndXJhYmxlLzEwMzQvOTM=',
              option_label: 'Color',
              configurable_product_option_value_uid: 'Y29uZmlndXJhYmxlLzkzLzQ5',
              value_label: 'Black',
            },
            {
              __typename: 'SelectedConfigurableOption',
              configurable_product_option_uid: 'Y29uZmlndXJhYmxlLzEwMzQvMTQ0',
              option_label: 'Size',
              configurable_product_option_value_uid: 'Y29uZmlndXJhYmxlLzE0NC8xNzc=',
              value_label: '34',
            },
          ],
        },
      ],
      total_quantity: 2,
    },
  },
  ...cartData,
});
