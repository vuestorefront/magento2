import cartGettersMock from '~/tests/unit/mocks/cartGetters';

export const useCartViewMock = (cartViewData = {}) => ({
  showRemoveItemModal: jest.fn(),
  removeItemAndSendNotification: jest.fn(),
  delayedUpdateItemQty: jest.fn(),
  goToCheckout: jest.fn(),
  getAttributes: jest.fn((product) => product.configurable_options || []),
  getBundles: jest.fn((product) => product.bundle_options?.map((b) => b.values).flat() || []),
  isInStock: jest.fn((product) => product.product.stock_status === 'IN_STOCK'),
  getMagentoImage: jest.fn(() => ''),
  getProductPath: jest.fn(() => ''),
  loading: false,
  isAuthenticated: false,
  products: [
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
        original_sku: '24-WG083',
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
        original_sku: '24-WG081',
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
    {
      uid: 'MjYwNw==',
      product: {
        0: {},
        uid: 'NDY=',
        __typename: 'BundleProduct',
        sku: '24-WG080',
        name: 'Sprite Yoga Companion Kit',
        stock_status: 'IN_STOCK',
        only_x_left_in_stock: null,
        rating_summary: 0,
        thumbnail: {
          url: 'https://magento2demo.frodigo.com/media/catalog/product/cache/6008460c710ac4e87d1a4c53dc478d67/l/u/luma-yoga-kit-2.jpg', position: null, disabled: null, label: 'Sprite Yoga Companion Kit', __typename: 'ProductImage',
        },
        url_key: 'sprite-yoga-companion-kit',
        url_rewrites: [{ url: 'sprite-yoga-companion-kit.html', __typename: 'UrlRewrite' }, { url: 'gear/sprite-yoga-companion-kit.html', __typename: 'UrlRewrite' }, { url: 'gear/fitness-equipment/sprite-yoga-companion-kit.html', __typename: 'UrlRewrite' }],
        price_range: { maximum_price: { final_price: { currency: 'USD', value: 77, __typename: 'Money' }, regular_price: { currency: 'USD', value: 77, __typename: 'Money' }, __typename: 'ProductPrice' }, minimum_price: { final_price: { currency: 'USD', value: 61, __typename: 'Money' }, regular_price: { currency: 'USD', value: 61, __typename: 'Money' }, __typename: 'ProductPrice' }, __typename: 'PriceRange' },
        categories: [{
          uid: 'Mw==', name: 'Gear', url_suffix: '.html', url_path: 'gear', breadcrumbs: null, __typename: 'CategoryTree',
        }, {
          uid: 'NQ==', name: 'Fitness Equipment', url_suffix: '.html', url_path: 'gear/fitness-equipment', breadcrumbs: [{ category_name: 'Gear', category_url_path: 'gear', __typename: 'Breadcrumb' }], __typename: 'CategoryTree',
        }],
        review_count: 0,
        reviews: { items: [], __typename: 'ProductReviews' },
        original_sku: '24-WG080',
      },
      prices: {
        __typename: 'CartItemPrices',
        row_total: {
          value: 70,
          __typename: 'Money',
        },
        row_total_including_tax: {
          value: 70,
          __typename: 'Money',
        },
        total_item_discount: {
          value: 0,
          __typename: 'Money',
        },
      },
      quantity: 1,
      bundle_options: [{
        uid: 'YnVuZGxlLzE=',
        label: 'Sprite Stasis Ball',
        type: 'radio',
        values: [{
          id: 3, label: 'Sprite Stasis Ball 75 cm', price: 32, quantity: 1, __typename: 'SelectedBundleOptionValue',
        }],
        __typename: 'SelectedBundleOption',
      }, {
        uid: 'YnVuZGxlLzI=',
        label: 'Sprite Foam Yoga Brick',
        type: 'radio',
        values: [{
          id: 4, label: 'Sprite Foam Yoga Brick', price: 5, quantity: 1, __typename: 'SelectedBundleOptionValue',
        }],
        __typename: 'SelectedBundleOption',
      }, {
        uid: 'YnVuZGxlLzM=',
        label: 'Sprite Yoga Strap',
        type: 'radio',
        values: [{
          id: 5, label: 'Sprite Yoga Strap 6 foot', price: 14, quantity: 1, __typename: 'SelectedBundleOptionValue',
        }],
        __typename: 'SelectedBundleOption',
      }, {
        uid: 'YnVuZGxlLzQ=',
        label: 'Sprite Foam Roller',
        type: 'radio',
        values: [{
          id: 8, label: 'Sprite Foam Roller', price: 19, quantity: 1, __typename: 'SelectedBundleOptionValue',
        }],
        __typename: 'SelectedBundleOption',
      }],
      __typename: 'BundleCartItem',
    }],
  isRemoveModalVisible: false,
  itemToRemove: null,
  totals: {
    total: 107,
    subtotal: 107,
    special: 107,
  },
  totalItems: 2,
  imageSizes: {
    productCard: {
      width: 216,
      height: 268,
    },
    productCardHorizontal: {
      width: 140,
      height: 200,
    },
    checkout: {
      imageWidth: 100,
      imageHeight: 100,
    },
    productGallery: {
      thumbWidth: 160,
      thumbHeight: 160,
      imageWidth: 1080,
      imageHeight: 1340,
    },
    cart: {
      imageWidth: 170,
      imageHeight: 170,
    },
  },
  discount: null,
  cartGetters: cartGettersMock({
    getItemImage: jest.fn(),
    getItemName: jest.fn(),
    getItemPrice: jest.fn(() => ({ regular: 10, special: 10 })),
    productHasSpecialPrice: jest.fn(() => false),
    getItemQty: jest.fn(() => 1),
  }),
  ...cartViewData,
});
