# Vue Storefront Next for Magento 2

* [Introduction](#introduction)
* [Getting Started](#getting-started)
    - [Installation](#installation)
        -  [With Vue Storefront CLI (recommended)](#with-vue-storefront-cli-recommended)
        - [Manual installation](#manual-installation)   
* [API Client](#api-client)
    - [Configuration](#configuration)
    - [Overriding and extending API Client methods](#overriding-and-extending-api-client-methods)
    - [Methods](#methods)
* [Composable](#composables)
    - [ `useCart()` ](#usecart)
    - [ `useCategory()` ](#usecategory)
    - [ `useCheckout()` ](#usecheckout)
    - [ `useConfig()` ](#useconfig)
    - [ `useLocale()` ](#uselocale)
    - [ `usePage()` ](#usepage)
    - [ `useProduct()` ](#useproduct)
    - [ `useRouter()` ](#userouter)
    - [ `useUser()` ](#useuser)
    - [ `useUserOrder()` ](#useuserorder)
    - [ `useWishlist()` ](#usewishlist)

## Introduction

This is a documentation for Vue Storefront integration with Magento 2.

This integration is currently a **work in progress** and not ready for production usage.

## Getting Started

* [Installation](#installation)
    - [With Vue Storefront CLI (recommended)](#with-vue-storefront-cli-recommended)
    - [Manual installation](#manual-installation)

---

### Installation

#### With Vue Storefront CLI (recommended)

This is the easiest and fastest way of bootstrapping new Vue Storefront project. With Vue Storefront CLI you can generate preconfigured, working boilerplate shop in one minute!

During the installation process you will be asked questions about:

* eCommerce platform you want to use
* CMS platform
* Whether you want or doesn't want to generate a working UI layer based on Storefront UI

Based on provided answers Vue Storefront CLI will generate a project already integrated with the services that you have chosen.

#### Manual installation

First, install the packages:

```shell script
npm install --save @vue-storefront/magento @vue-storefront/magento-api 
# OR

yarn add @vue-storefront/magento @vue-storefront/magento-api

``` 
Once packages are installed you need to invoke the `setup method that will configure your Commercetools integration before using any other method from the integration. You can read how to configure it [here](#api-client).

```javascript
import { setup } from '@vue-storefront/magento-api'

setup({
  // configuration of your eCommerce integration
})
```

In the next chapters, you will learn in-depth about Commercetools API Client and Composition API functions.

## API Client

* [Configuration](#configuration)
* [Methods](#methods)

---

API Client is a data layer of your eCommerce integration. It provides a friendly abstraction layer over network calls to your eCommerce platform.

It expresses each network request as a declarative method like getProduct or getCategory. By having this additional layer we can hide implementation details of how we get the data which gives you freedom of introducing major changes in this layer without influencing other parts of the app.

API Client by itself is a Vanilla JavaScript application and it doesn't require any frontend framework to run. It's usually not used directly in the UI and is responsible only for providing data to Composition Functions.

### Configuration

```javascript
import { setup } from '@vue-storefront/magento-api';

export default async ({ app }) => {
  const config = {
    api: 'https://your-magento-instance.tld/graphql'
    tax: {
      displayCartSubtotalIncludingTax: true
    },
    websites: {
      base: {
        code: 'base',
        defaultStoreGroup: 'main_website_store',
        storeGroups: {
          // eslint-disable-next-line @typescript-eslint/camelcase,camelcase
          main_website_store: {
            code: 'main_website_store',
            defaultStore: 'default',
            stores: {
              default: {
                code: 'default'
              },
              de: {
                code: 'de'
              },
              fr: {
                code: 'fr'
              }
            }
          }
        }
      }
    },
    defaultStore: 'default'
  };

  await setup(config);
};
```

`setup` accepts the following config:

```typescript
interface Config<T = any> {
  client?: ApolloClient<T>;
  api: string;
  customOptions?: ApolloClientOptions<any>;
  currency: string;
  websites: Record<string, Website>;
  defaultStore: string;
  storage: Storage;
  state: any;
  tax: {
    displayCartSubtotalIncludingTax: boolean;
  };
}

interface Storage {
  set: (
    name: string,
    value: any,
  ) => void;
  get: (name: string) => any;
  remove: (name: string) => any;
  removeAll: () => void;
}

type Website = {
  code: string;
  defaultStoreGroup: string;
  storeGroups: Record<string, StoreGroup>;
}

type StoreGroup = {
  code: string;
  defaultStore: string;
  stores: Record<string, Store>;
  website?: Website;
}

type Store = {
  code: string;
  storeGroup?: StoreGroup;
}
```

### Methods

You can find detailed information about all API Client methods here

## Composables

* [ `useBilling()` ](#usebilling)
* [ `useCart()` ](#usecart)
* [ `useCategory()` ](#usecategory)
* [ `useCheckout()` ](#usecheckout)
* [ `useConfig()` ](#useconfig)
* [ `useFacet()` ](#usefacet)
* [ `useMakeOrder()` ](#usemakeorder)
* [ `usePage()` ](#usepage)
* [ `useProduct()` ](#useproduct)
* [ `useRouter()` ](#userouter)
* [ `useShipping()` ](#useshipping)
* [ `useShippingProvider()` ](#useshippingprovider)
* [ `useUser()` ](#useuser)
* [ `useUserBilling()` ](#useuserbilling)
* [ `useUserOrders()` ](#useuserorders)
* [ `useUserShipping()` ](#useusershipping)
* [ `useWishlist()` ](#usewishlist)

### useBilling
`useUserBilling` composable can be used to:

* fetch existing billing addresses,
* submit new billing addresses,
* modify and delete existing billing addresses.

### API

``` typescript
interface UseBilling<BILLING, BILLING_PARAMS> {
  error: ComputedProperty<UseBillingErrors>;
  loading: ComputedProperty<boolean>;
  billing: ComputedProperty<BILLING>;
  load(): Promise<void>;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  save: (params: { params: BILLING_PARAMS; billingDetails: BILLING; customQuery?: CustomQuery }) => Promise<void>;
}
```

* `load` - loads the users billing addresses
* `save` - saves new address
* `error` - reactive object containing the error message, if some properties failed for any reason.
* `loading` - reactive object containing information about loading state of `load` and `save`
* `billing` - reactive data object containing response from the backend.

### Getters

```typescript
interface UserBillingGetters<USER_BILLING, USER_BILLING_ITEM> {
    getAddresses: (billing: USER_BILLING, criteria?: Record<string, any>) => USER_BILLING_ITEM[];
    getDefault: (billing: USER_BILLING) => USER_BILLING_ITEM;
    getTotal: (billing: USER_BILLING) => number;
    getPostCode: (address: USER_BILLING_ITEM) => string;
    getStreetName: (address: USER_BILLING_ITEM) => string;
    getStreetNumber: (address: USER_BILLING_ITEM) => string | number;
    getCity: (address: USER_BILLING_ITEM) => string;
    getFirstName: (address: USER_BILLING_ITEM) => string;
    getLastName: (address: USER_BILLING_ITEM) => string;
    getCountry: (address: USER_BILLING_ITEM) => string;
    getPhone: (address: USER_BILLING_ITEM) => string;
    getEmail: (address: USER_BILLING_ITEM) => string;
    getProvince: (address: USER_BILLING_ITEM) => string;
    getCompanyName: (address: USER_BILLING_ITEM) => string;
    getTaxNumber: (address: USER_BILLING_ITEM) => string;
    getId: (address: USER_BILLING_ITEM) => string;
    getApartmentNumber: (address: USER_BILLING_ITEM) => string | number;
    isDefault: (address: USER_BILLING_ITEM) => boolean;
}
```
* `getAddresses` - returns list of billing addresses.
* `getDefault` - returns a default billing address.
* `getTotal` - returns total number of billing addresses user has.
* `getId` - returns id from an individual address.
* `getPostCode` - returns post code from an individual address.
* `getStreetName` - returns street name from an individual address.
* `getStreetNumber` - returns street number from an individual address.
* `getCity` - returns city name from an individual address.
* `getFirstName` - returns first name from an individual address.
* `getLastName` - returns last name from an individual address.
* `getCountry` - returns country name from an individual address.
* `getPhone` - return phone number from an individual address.
* `getEmail` - returns e-mail address from an individual address.
* `getProvince` - returns province (state) from an individual address.
* `getCompanyName` - returns company name from an individual address.
* `getTaxNumber` - returns tax number from an individual address.
* `getApartmentNumber` - returns apartment number from an individual address.
* `isDefault` - return information if address is current default.

### Example

````javascript
import { onSSR } from '@vue-storefront/core';
import { useUserBilling, userBillingGetters } from '@vue-storefront/magento';

export default {
  setup() {
    const {
      billing,
      load,
      addAddress,
      deleteAddress,
      updateAddress
    } = useUserBilling();

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await load();
    });

    return {
      billing: computed(() => userBillingGetters.getAddresses(billing.value)),
      userBillingGetters
    };
  }
};
````

### useCart

`useCart` composable can be used to:
* load cart information,
* add, update and remove items in the cart,
* applying and removing coupons,
* checking if product is already added to the cart.

### API 

``` typescript
interface UseCart<CART, CART_ITEM, PRODUCT, COUPON> {
    cart: ComputedProperty<CART>;
    setCart(cart: CART): void;
    addItem(params: {
        product: PRODUCT;
        quantity: number;
        customQuery?: CustomQuery;
    }): Promise<void>;
    isOnCart: ({ product: PRODUCT }: {
        product: any;
    }) => boolean;
    removeItem(params: {
        product: CART_ITEM;
        customQuery?: CustomQuery;
    }): Promise<void>;
    updateItemQty(params: {
        product: CART_ITEM;
        quantity?: number;
        customQuery?: CustomQuery;
    }): Promise<void>;
    clear(): Promise<void>;
    applyCoupon(params: {
        couponCode: string;
        customQuery?: CustomQuery;
    }): Promise<void>;
    removeCoupon(params: {
        coupon: COUPON;
        customQuery?: CustomQuery;
    }): Promise<void>;
    load(): Promise<void>;
    load(params: {
        customQuery?: CustomQuery;
    }): Promise<void>;
    error: ComputedProperty<UseCartErrors>;
    loading: ComputedProperty<boolean>;
}
```

* `cart` - Returns the Items in the Cart as a `computed` property
* `setCart` - set new Cart
* `addItem` - Function that takes in a `product` and its `quantaty` and adds it to the cart
* `isOnCart` - Function that takes in a `product` and returns `true` or `false`
* `removeItem` - Function that takes in a `product` and removes it from the `cart`
* `updateItemQty` - Function that takes in a `product` and its new `quantaty` and updates it accordingly
* `clear` - Function that clears cart
* `applyCoupon` - Function that takes in a `coupon` and applies it to the cart
* `removeCoupon` - Function that removes all applied coupons
* `load` - Function that loads the current `cart`
* `loading` - a reactive object containing information about loading state of the cart.
* `error` - reactive object containing the error message, if some properties failed for any reason.

### Getters

````typescript
interface CartGetters<CART, CART_ITEM> {
    getItems: (cart: CART) => CART_ITEM[];
    getItemName: (cartItem: CART_ITEM) => string;
    getItemImage: (cartItem: CART_ITEM) => string;
    getItemPrice: (cartItem: CART_ITEM) => AgnosticPrice;
    getItemQty: (cartItem: CART_ITEM) => number;
    getItemAttributes: (cartItem: CART_ITEM, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
    getItemSku: (cartItem: CART_ITEM) => string;
    getTotals: (cart: CART) => AgnosticTotals;
    getShippingPrice: (cart: CART) => number;
    getTotalItems: (cart: CART) => number;
    getFormattedPrice: (price: number) => string;
    getCoupons: (cart: CART) => AgnosticCoupon[];
    getDiscounts: (cart: CART) => AgnosticDiscount[];
    [getterName: string]: (element: any, options?: any) => unknown;
}
````

* `getTotals` - returns cart totals.
* `getShippingPrice` - returns current shipping price.
* `getItems` - returns all items from cart.
* `getItemName` - returns product name.
* `getItemImage` - returns product image.
* `getItemPrice` - returns product price.
* `getItemQty` - returns product quantity.
* `getItemAttributes` - returns product attribute.
* `getItemSku` - returns product SKU.
* `getTotalItems` - returns products amount.
* `getFormattedPrice` - returns product price with currency sign.
* `getCoupons` - returns applied coupons.
* `getDiscounts` - returns all discounts.

#### Example

```javascript
import { useCart, cartGetters } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { cart, removeItem, updateItemQty, load } = useCart();

    onSSR(async () => {
      await loadCart();
    })

    return {
      removeItem,
      updateItemQty,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      totalItems: computed(() => cartGetters.getTotalItems(cart.value))
    }
  }
}
```

### useCategory

`useCategory` composable is responsible for fetching a list of categories. A common usage scenario for this composable is navigation.

### API

``` typescript
interface UseCategory<CATEGORY, CATEGORY_SEARCH_PARAMS> {
    categories: ComputedProperty<CATEGORY[]>;
    search(params: ComposableFunctionArgs<CATEGORY_SEARCH_PARAMS>): Promise<void>;
    loading: ComputedProperty<boolean>;
    error: ComputedProperty<UseCategoryErrors>;
}
```

* `categories` - a main data object that contains an array of categories fetched by `search` method.
* `search` - Function that takes `categorySearchParams` as input and fill the `categories
* `loading` - Returns the current state of `search` as `computed` property
* `error` - reactive object containing the error message, if search failed for any reason.

### Getters
````typescript
interface CategoryGetters<CATEGORY> {
    getTree: (category: CATEGORY) => AgnosticCategoryTree | null;
    getBreadcrumbs?: (category: CATEGORY) => AgnosticBreadcrumb[];
    [getterName: string]: any;
}
````
### Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { useCategory } from '@vue-storefront/magento';

export default {
  setup () {
    const { categories, search, loading } = useCategory('category-id');

    onSSR(async () => {
      await search({});
    });

    return {
      categories,
      loading
    }
  }
}
```

### useCheckout

`useCheckout` composition API function is responsible, as its name suggests, for interactions with the checkout in your eCommerce. This function returns following values:

> This composable however needs to be implemented

### useConfig

useConfig` composition API function is responsible, as its name suggests, for interactions with the configuration in your eCommerce. This function returns following values:

### API
```typescript
interface UseConfig<Config> {
  config: ComputedRef<Config>;
  loadConfig: () => Promise<void>;
  loading: ComputedRef<boolean>;
}
```

* `config` - Returns the loaded `config` as `computed` property
* `loadConfig` - Function to load the `config`
* `loading` - Return state of `loadConfig` Function as `computed` property

### Example
```javascript
import { onSSR } from '@vue-storefront/core';
import { useConfig } from '@vue-storefront/magento';

export default {
  setup() {
    const {
      config,
      loadConfig,
      loading
    } = useConfig();

    onSSR(async () => {
      await loadConfig();
    })

    return {
      config,
      loading
    };
  }
};
```
### useFacet
`useFacet` composition function can be used to fetch data related to:
* products,
* categories,
* breadcrumbs.

What makes it powerful is the ability to accept multiple filters, allowing to narrow down the results to a specific category, search term, etc.

For more information about faceting, please refer to this page.

### API
````typescript
interface UseFacet<SEARCH_DATA> {
    result: ComputedProperty<FacetSearchResult<SEARCH_DATA>>;
    loading: ComputedProperty<boolean>;
    search: (params?: AgnosticFacetSearchParams) => Promise<void>;
    error: ComputedProperty<UseFacetErrors>;
}
````

* `search` - function for searching and classifying records, allowing users to browse the catalog data. It accepts a single object as a parameter
* `result` - reactive data object containing the response from the backend.
* `loading` - reactive object containing information about the loading state of search.
* `error - reactive object containing the error message, if search failed for any reason.

### Getters
````typescript
interface FacetsGetters<SEARCH_DATA, RESULTS, CRITERIA = any> {
    getAll: (searchData: FacetSearchResult<SEARCH_DATA>, criteria?: CRITERIA) => AgnosticFacet[];
    getGrouped: (searchData: FacetSearchResult<SEARCH_DATA>, criteria?: CRITERIA) => AgnosticGroupedFacet[];
    getCategoryTree: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticCategoryTree;
    getSortOptions: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticSort;
    getProducts: (searchData: FacetSearchResult<SEARCH_DATA>) => RESULTS;
    getPagination: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticPagination;
    getBreadcrumbs: (searchData: FacetSearchResult<SEARCH_DATA>) => AgnosticBreadcrumb[];
    [getterName: string]: (element: any, options?: any) => unknown;
}
````

* `getAll` - returns all available facets.
* `getGrouped` - returns grouped facets by facet name.
* `getCategoryTree` - return the tree of nested categories.
* `getSortOptions` - returns available and currently selected sorting options.
* `getProducts` - returns products matching current filters.
* `getPagination` - returns pagination information.
* `getBreadcrumbs` - returns breadcrumbs information.

### Example
```javascript
import { useFacet, facetGetters } from '@vue-storefront/magento';

export default {
  setup (props, context) {
    const {
      result,
      search,
      loading
    } = useFacet();

    onSSR(async () => {
      await search({
        categorySlug: 'clothing',
        sort: 'latest',
        itemsPerPage: 10,
        term: 'some search query'
      });
    });

    return {
      products: computed(() => facetGetters.getProducts(result.value)),
      categoryTree: computed(() => facetGetters.getCategoryTree(result.value)),
      breadcrumbs: computed(() => facetGetters.getBreadcrumbs(result.value)),
      sortBy: computed(() => facetGetters.getSortOptions(result.value)),
      facets: computed(() => facetGetters.getGrouped(result.value, ['color', 'size'])),
      pagination: computed(() => facetGetters.getPagination(result.value)),
      loading
    };
  }
}
```

### useMakeOrder
`useMakeOrder` composable is responsible for making an order

### API
````typescript
interface UseMakeOrder<ORDER> {
  order: Ref<ORDER>;
  make(params: { customQuery?: CustomQuery }): Promise<void>;
  error: ComputedProperty<UseMakeOrderErrors>;
  loading: ComputedProperty<boolean>;
}
````

* `make` - function for making an order. This method accepts a single optional params object. 
* `order` - a main data object that contains a made order.
* `loading` - a reactive object containing information about loading state of your make method.
* `error` - a reactive object containing the error message, if load or save failed for any reason.

### Getters
````typescript
interface UserOrderGetters<ORDER, ORDER_ITEM> {
    getDate: (order: ORDER) => string;
    getId: (order: ORDER) => string;
    getStatus: (order: ORDER) => string;
    getPrice: (order: ORDER) => number;
    getItems: (order: ORDER) => ORDER_ITEM[];
    getItemSku: (item: ORDER_ITEM) => string;
    getItemName: (item: ORDER_ITEM) => string;
    getItemQty: (item: ORDER_ITEM) => number;
    getItemPrice: (item: ORDER_ITEM) => number;
    getFormattedPrice: (price: number) => string;
    [getterName: string]: (element: any, options?: any) => unknown;
}
````

> To be implemented

### Example
````javascript
import { useMakeOrder } from '@vue-storefront/magento';
export default {
  setup () {
    const { make, order } = useMakeOrder();
    return {
      make,
      order
    };
  }
}
````

### usePage

`usePage` composition API function is responsible, as its name suggests, for interactions with the cms pages in your eCommerce. This function returns following values:

### API
```typescript
interface UsePage<PAGE> {
  page: ComputedProperty<PAGE>;
  loadPage: (identifier: string) => Promise<void>;
  loading: ComputedProperty<boolean>;
}
```

* `loadPage` - Function that takes an `identifier` and loads the `page`
* `page` - Returns the `page` data
* `loading` - indicates the State of `loadPage`

### Example 
```javascript
import {
  usePage
} from '@vue-storefront/magento';
import {
  onSSR
} from '@vue-storefront/core';

export default {
  setup(props) {
    const {
      page,
      loadPage,
      loading
    } = usePage('cmsPage');

    onSSR(async () => {
      await loadPage(props.identifier);
    });

    return {
      page,
      loading
    };
  }
}
```

### useProduct

`useProduct` composable is responsible for fetching a list of products.

### API

```typescript
interface UseProduct<PRODUCTS, PRODUCT_SEARCH_PARAMS> {
  products: ComputedProperty<PRODUCTS>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseProductErrors>;
  search(params: ComposableFunctionArgs<PRODUCT_SEARCH_PARAMS>): Promise<void>;
  [x: string]: any;
}
```

* `products` - Returns `products` as a `computed` property
* `search` - Function that takes in `perPage` , `page` , `sort` , `term` , `filters` and an `array of String` as optional params and gets the `products` accordingly
* `loading` - Returns the `loading` state of `search`
* `error` - reactive object containing the error message, if search failed for any reason.

### Getters

```typescript
interface ProductGetters<PRODUCT, PRODUCT_FILTER> {
    getName: (product: PRODUCT) => string;
    getSlug: (product: PRODUCT) => string;
    getPrice: (product: PRODUCT) => AgnosticPrice;
    getGallery: (product: PRODUCT) => AgnosticMediaGalleryItem[];
    getCoverImage: (product: PRODUCT) => string;
    getFiltered: (products: PRODUCT[], filters?: PRODUCT_FILTER) => PRODUCT[];
    getAttributes: (products: PRODUCT[] | PRODUCT, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
    getDescription: (product: PRODUCT) => string;
    getCategoryIds: (product: PRODUCT) => string[];
    getId: (product: PRODUCT) => string;
    getFormattedPrice: (price: number) => string;
    getTotalReviews: (product: PRODUCT) => number;
    getAverageRating: (product: PRODUCT) => number;
    getBreadcrumbs?: (product: PRODUCT) => AgnosticBreadcrumb[];
    [getterName: string]: any;
}
```
* `getName` - returns product name.
* `getSlug` - returns product slug.
* `getPrice` - returns product price.
* `getGallery` - returns product gallery.
* `getCoverImage` - returns cover image of product.
* `getFiltered` - returns filtered product.
* `getAttributes` - returns product attributes.
* `getDescription` - returns product description.
* `getCategoryIds` - returns all product categories.
* `getId` - returns product ID.
* `getFormattedPrice` - returns product price with currency sign.
* `getTotalReviews` - returns total number of reviews product has.
* `getAverageRating` - returns average rating from all reviews.

### Example

```javascript
import { useProduct, productGetters } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { products, search, loading, error } = useProduct('<UNIQUE_ID>');

    onSSR(async () => {
      await search({ slug: 'super-t-shirt' })
    })

    return {
      loading,
      error,
      product: computed(() => productGetters.getFiltered(products.value, { master: true, attributes: context.root.$route.query })[0]),
      option: computed(() => productGetters.getAttributes(products.value, ['color', 'size'])),
      configuration: computed(() => productGetters.getCategoryIds(product.value))
    }
  }
}
```

### useRouter

`useRouter` composition API function is responsible, as its name suggests, for interactions with the routes in your eCommerce. This function returns following values:

### API 
```typescript
interface UseRouter {
  search: (url: string) => Promise<void>; 
  route: Readonly<Ref<Readonly<Page>>>; 
  loading: Readonly<Ref<Readonly<boolean>>>;
}
```

* `search` - Function that takes in a `url` and fills the `route` property
* `route` - Returns the current Page
* `loading` - Returns state of `search`

### Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { useRouter } from '@vue-storefront/magento';
import { computed } from '@vue/composition-api';

export default {
  setup(props, context) {
    const {
      path
    } = context.root.$route;
    const {
      loading,
      search,
      route
    } = useRouter('router:' + path);
    onSSR(async () => {
      await search(path);
      if (route.value.data.urlResolver === null) {
        context.root.$nuxt.error({
          statusCode: 404,
          message: 'Page not found'
        });
      }
    });

    const routeType = computed(() => {
      if (loading.value || route.value.data.urlResolver === null) {
        return {};
      }
      return route.value.data.urlResolver;
    });

    return {
      loading,
      routeType
    };
  }
};
```

### useShipping
`useShipping` composable can be used for:
* Loading shipping address for the current cart.
* Saving shipping address for the current cart.

> WIP

### API
```typescript
interface UseShipping<SHIPPING, SHIPPING_PARAMS> {
  error: ComputedProperty<UseShippingErrors>;
  loading: ComputedProperty<boolean>;
  shipping: ComputedProperty<SHIPPING>;
  load(): Promise<void>;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  save: (params: { params: SHIPPING_PARAMS; shippingDetails: SHIPPING; customQuery?: CustomQuery }) => Promise<void>;
}
```
* `load` - function for fetching shipping address. When invoked, it requests data from the API and populates shipping property. This method accepts a single optional params object.
* `save` - function for saving shipping address. This method accepts a single saveParams object.
* `shipping` - a main data object that contains a shipping address.
* `loading` - a reactive object containing information about loading state of your load or save method.
* `error` - a reactive object containing the error message, if load or save failed for any reason.

### Example 
````javascript
import { useShipping } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const { load, shipping } = useShipping();

    onSSR(async () => {
      await load();
    });

    return {
      shipping
    };
  }
}
````

### useShippingProvider
`useShippingProvider` composable can be used for:
* Loading shipping methods for the current cart.
* Selecting shipping method for the current cart.

> WIP

### API
```typescript
interface UseShippingProvider<STATE, SHIPPING_METHOD> {
  error: ComputedProperty<UseShippingErrors>;
  loading: ComputedProperty<boolean>;
  state: ComputedProperty<STATE>;
  setState(state: STATE): void;
  load(): Promise<void>;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  save(params: { shippingMethod: SHIPPING_METHOD, customQuery?: CustomQuery }): Promise<void>;
}
```
* `load` - function for fetching shipping method. When invoked, it requests data from the API and populates the response key inside the state property. This method accepts a single optional params object.
* `save` - function for selecting shipping method. This method accepts a single saveParams object.
* `state` - function for selecting shipping method. This method accepts a single saveParams object.
* `loading` - a reactive object containing information about loading state of your load or save method.
* `error` - a reactive object containing the error message, if load or save failed for any reason.

### Example
````javascript
import { useShippingProvider } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';

export default {
  setup () {
    const { load, state } = useShippingProvider();

    onSSR(async () => {
      await load();
    });

    return {
      selectedShippingMethod: computed(() => state.value && state.value.response)
    };
  }
}
````

### useUser

`useUser` composable can be used to:
* manage user authentication
* manage authentication data like email address, login or password.
* If you want to fetch/save other user data you should use the following composables:

* `useUserBilling`
* `useUserShipping`
* `useUserOrders` 
 

```typescript
interface UseUser<USER, UPDATE_USER_PARAMS> {
  user: ComputedProperty<USER>;
  setUser: (user: USER) => void;
  updateUser: (params: {
    user: UPDATE_USER_PARAMS;
  }) => Promise<void>;
  register: (params: {
    user: UseUserRegisterParams;
  }) => Promise<void>;
  login: (params: {
    user: UseUserLoginParams;
  }) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (params: {
    current: string;
    new: string;
  }) => Promise<void>;
  load: () => Promise<void>;
  isAuthenticated: Ref<boolean>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUserErrors>;
}
```

* `user` - reactive object containing information about current user.
* `updateUser` - function for updating user data. When invoked, it submits data to the API and populates user property with updated information. This method accepts a single params object.
* `register` - function for creating a new user. When invoked, it submits new user data to the API and saves them. This method accepts a single params object.
* `login` - function for log in a user based on a username and password. This method accepts a single params object.
* `logout` - function for logout a user.
* `changePassword` - function for changing user password. This method accepts a single params object.
* `isAuthenticated` - checks if user is authenticated or not.
* `loading` - reactive object containing information about loading state of user.
* `error` - reactive object containing the error message, if some properties failed for any reason.

### Getters
````typescript
interface UserGetters<USER> {
    getFirstName: (customer: USER) => string;
    getLastName: (customer: USER) => string;
    getFullName: (customer: USER) => string;
    getEmailAddress: (customer: USER) => string;
    [getterName: string]: (element: any, options?: any) => unknown;
}
````
* `getFirstName` - returns user first name.
* `getLastName` - returns user last name.
* `getFullName` - returns full user name.
* `getEmailAddress` - returns user email address.

### Example
```javascript
import {
  useUser
} from '@vue-storefront/magento';

export default {
  setup () {
    const { user, register, login, loading } = useUser();

    return {
      register,
      login,
      loading,
      firstName: userGetters.getFirstName(user.value),
      email: userGetters.getEmailAddress(user.value)
    }
  }
}
```
### useUserBilling
`useUserBilling` composable can be used to:
* fetch existing billing addresses,
* submit new billing addresses,
* modify and delete existing billing addresses.

````typescript
interface UseUserBilling<USER_BILLING, USER_BILLING_ITEM> {
    billing: ComputedProperty<USER_BILLING>;
    addAddress: (params: {
        address: USER_BILLING_ITEM;
    }) => Promise<void>;
    deleteAddress: (params: {
        address: USER_BILLING_ITEM;
    }) => Promise<void>;
    updateAddress: (params: {
        address: USER_BILLING_ITEM;
    }) => Promise<void>;
    load: () => Promise<void>;
    setDefaultAddress: (params: {
        address: USER_BILLING_ITEM;
    }) => Promise<void>;
    loading: ComputedProperty<boolean>;
    error: ComputedProperty<UseUserBillingErrors>;
}
````

* `load` - function for fetching user addresses. When invoked, it requests data from the API and populates billing property.
* `addAddress`- function for posting new billing address. This method accepts a single params object.
* `deleteAddress` - function for deleting existing billing address. This method accepts a single params object.
* `updateAddress` - function for updating existing billing address. This method accepts a single params object.
* `setDefaultAddress` - function for settings an existing billing address as default. This method accepts a single params object.
* `billing` - reactive data object containing response from the backend.
* `loading` - reactive object containing information about loading state of load, addAddress, deleteAddress, updateAddress and setDefaultAddress methods.
* `error` - reactive object containing the error message, if some properties failed for any reason.

### Getter
````typescript
interface UserBillingGetters<USER_BILLING, USER_BILLING_ITEM> {
    getAddresses: (billing: USER_BILLING, criteria?: Record<string, any>) => USER_BILLING_ITEM[];
    getDefault: (billing: USER_BILLING) => USER_BILLING_ITEM;
    getTotal: (billing: USER_BILLING) => number;
    getPostCode: (address: USER_BILLING_ITEM) => string;
    getStreetName: (address: USER_BILLING_ITEM) => string;
    getStreetNumber: (address: USER_BILLING_ITEM) => string | number;
    getCity: (address: USER_BILLING_ITEM) => string;
    getFirstName: (address: USER_BILLING_ITEM) => string;
    getLastName: (address: USER_BILLING_ITEM) => string;
    getCountry: (address: USER_BILLING_ITEM) => string;
    getPhone: (address: USER_BILLING_ITEM) => string;
    getEmail: (address: USER_BILLING_ITEM) => string;
    getProvince: (address: USER_BILLING_ITEM) => string;
    getCompanyName: (address: USER_BILLING_ITEM) => string;
    getTaxNumber: (address: USER_BILLING_ITEM) => string;
    getId: (address: USER_BILLING_ITEM) => string;
    getApartmentNumber: (address: USER_BILLING_ITEM) => string | number;
    isDefault: (address: USER_BILLING_ITEM) => boolean;
}
````

* `getAddresses` - returns list of billing addresses.
* `getDefault` - returns a default billing address.
* `getTotal` - returns total number of billing addresses user has.
* `getId` - returns id from an individual address.
* `getPostCode` - returns post code from an individual address.
* `getStreetName` - returns street name from an individual address.
* `getStreetNumber` - returns street number from an individual address.
* `getCity` - returns city name from an individual address.
* `getFirstName` - returns first name from an individual address.
* `getLastName` - returns last name from an individual address.
* `getCountry` - returns country name from an individual address.
* `getPhone` - return phone number from an individual address.
* `getEmail` - returns e-mail address from an individual address.
* `getProvince` - returns province (state) from an individual address.
* `getCompanyName` - returns company name from an individual address.
* `getTaxNumber` - returns tax number from an individual address.
* `getApartmentNumber` - returns apartment number from an individual address.
* `isDefault` - return information if address is current default.

### Example
```javascript
import { onSSR } from '@vue-storefront/core';
import { useUserBilling, userBillingGetters } from '@vue-storefront/magento';

export default {
  setup() {
    const {
      billing,
      load,
      addAddress,
      deleteAddress,
      updateAddress
    } = useUserBilling();

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await load();
    });

    return {
      billing: computed(() => userBillingGetters.getAddresses(billing.value)),
      userBillingGetters
    };
  }
};
```

### useUserOrder

`useUserOrders` composable is responsible, as it's name suggests for interactions with user's order history from your eCommerce.

```typescript
interface UseUserOrder<ORDERS, ORDER_SEARCH_PARAMS> {
  orders: ComputedProperty<ORDERS>;
  search(params: ComposableFunctionArgs<ORDER_SEARCH_PARAMS>): Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUserOrderErrors>;
}
```

* `orders` - a main data object that contains an array of orders fetched by searchOrders method.
* `totalOrder` - Returns the total `number` of `orders` for the current User 
* `error` - reactive object containing the error message, if some properties failed for any reason.
* `loading` - a reactive object containing information about loading state of your searchOrders method.

```javascript
import { onSSR } from '@vue-storefront/core';
import { useUserOrder } from '@vue-storefront/magento';
import { computed } from '@vue/composition-api';

export default {
  setup() {
    const {
      orders,
      searchOrders
    } = useUserOrders();

    onSSR(async () => {
      await searchOrder();
    });

    return {
      orders: computed(() => orders ? orders.value : [])
    }
  }
}
```

### useWishlist

`useWishlist` composable is responsible, for integrating with wishlist from Commercetools. It allows to:
* fetch products from wishlist
* add products to wishlist
* remove products from wishlist
* check if product is on wishlist

```typescript
 interface UseWishlist<WISHLIST, WISHLIST_ITEM, PRODUCT> {
  wishlist: ComputedProperty<WISHLIST>;
  loading: ComputedProperty<boolean>;
  addItem(params: {
    product: PRODUCT;
    customQuery?: CustomQuery;
  }): Promise<void>;
  removeItem(params: {
    product: WISHLIST_ITEM;
    customQuery?: CustomQuery;
  }): Promise<void>;
  load(): Promise<void>;
  load(params: {
    customQuery?: CustomQuery;
  }): Promise<void>;
  clear(): Promise<void>;
  setWishlist: (wishlist: WISHLIST) => void;
  isOnWishlist({ product: PRODUCT }: {
    product: any;
  }): boolean;
  error: ComputedProperty<UseWishlistErrors>;
}
```

* `wishlist` - a main data object.
* `load` - function used to retrieve wishlist products. When invoked, it requests data from the API and populates wishlist property. This method accepts a single params object.
* `addItem` - function used to add new product to wishlist. When invoked, it submits data to the API and populates wishlist property with updated information. This method accepts a single params object.
* `removeItem` - function that removes products from the wishlist. It submits data to the API and populates updated wishlist property. This method accepts a single params object.
* `clear` - function that removes all products from the wishlist and populates clear wishlist property.
* `isOnWishlist` - function that checks if product is on the wishlist. It returns boolean value. This method accepts a single params object.
* `loading` - function that checks if product is on the wishlist. It returns boolean value. This method accepts a single params object.
* `error` - reactive object containing the error message, if some properties failed for any reason.

### Getters
> WIP

````typescript
interface WishlistGetters<WISHLIST, WISHLIST_ITEM> {
    getItems: (wishlist: WISHLIST) => WISHLIST_ITEM[];
    getItemName: (wishlistItem: WISHLIST_ITEM) => string;
    getItemImage: (wishlistItem: WISHLIST_ITEM) => string;
    getItemPrice: (wishlistItem: WISHLIST_ITEM) => AgnosticPrice;
    getItemAttributes: (wishlistItem: WISHLIST_ITEM, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
    getItemSku: (wishlistItem: WISHLIST_ITEM) => string;
    getTotals: (wishlist: WISHLIST) => AgnosticTotals;
    getTotalItems: (wishlist: WISHLIST) => number;
    getFormattedPrice: (price: number) => string;
    [getterName: string]: (element: any, options?: any) => unknown;
}
````
* `getItems` - returns list of products on wishlist
* `getItemName` - returns product's name from wishlist.
* `getItemImage` - returns product's image from wishlist.
* `getItemPrice` - returns product's price from wishlist.
* `getItemQty` - returns quantity of product which is on wishlist.
* `getItemAttributes` - returns product variant attribute chosen by its name.
* `getItemSku` - returns product's SKU code.
* `getTotals` - returns price of products.
* `getTotalItems` - returns amount of all items that are currently on wishlist.
* `getFormattedPrice` - returns price in formatted manner taking into account local specifics.

### Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { useWishlist, wishlistGetters } from '@vue-storefront/magento';
export default {
  setup() {
    const { load: loadWishlist } = useWishlist();

    const wishlistItems = computed(() => wishlistGetters.getItems());

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await loadWishlist();
    });

    return {
      loadWishlist,
      wishlistItems
    };
  }
};
```
