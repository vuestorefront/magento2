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
* [Composables](#composables)
    - [ `useCart()` ](#usecart)
    - [ `useCategory()` ](#usecategory)
    - [ `useCheckout()` ](#usecheckout)
    - [ `useConfig()` ](#useconfig)
    - [ `useLocale()` ](#uselocale)
    - [ `usePage()` ](#usepage)
    - [ `useProduct()` ](#useproduct)
    - [ `useRouter()` ](#userouter)
    - [ `useUser()` ](#useuser)
    - [ `useUserOrders()` ](#useuserorders)
    - [ `useWishlist()` ](#usewishlist)
* [Getters](#getters)
    - [Cardgetters](#cardgetters)
    - [Categorygetters](#categorygetters)
    - [Checkoutgetters](#checkoutgetters)
    - [Ordergetters](#ordergetters)
    - [Productgetters](#productgetters)
    - [Usergetters](#usergetters)
    - [Wishlistgetters](#wishlistgetters)

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
* [Overriding and extending API Client methods](#overriding-and-extending-api-client-methods)
* [Methods](#methods)

---

API Client is a data layer of your eCommerce integration. It provides a friendly abstraction layer over network calls to your eCommerce platform.

It expresses each network request as a declarative method like getProduct or getCategory. By having this additional layer we can hide implementation details of how we get the data which gives you freedom of introducing major changes in this layer without influencing other parts of the app.

API Client by itself is a Vanilla JavaScript application and it doesn't require any frontend framework to run. It's usually not used directly in the UI and is responsible only for providing data to Composition Functions.

### Configuration

``` javascript
import {
  setup
} from '@vue-storefront/magento-api';

export default async ({
  app
}) => {

  const config = {
    storage: app.$cookies,
    api: {
      uri: process.env.API_URL
    },
    tax: {
      displayCartSubtotalIncludingTax: true
    },
    externalCheckout: {
      enabled: true,
      cmsUrl: 'https://your-magento-instance.tld/vue/cart/sync/',
      stores: {
        default: {
          cmsUrl: 'https://your-magento-instance.tld/vue/cart/sync/'
        }
      }
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

``` typescript
interface ApiClientSettings {
  storage: Storage;
  api?: {
    uri: string;
  };
  tax: {
    displayCartSubtotalIncludingTax: boolean;
  };
  externalCheckout: {
    enabled: boolean;
    cmsUrl: string;
    stores: Record<string, ExternalCheckoutStore>;
  };
  websites: Record<string, Website>;
  defaultStore: string;
}

type ExternalCheckoutStore = {
  cmsUrl: string;
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

### Overriding and extending API Client methods

One of the biggest benefits of using headless architecture is the flexibility of combining multiple specialized third-party services in one application. It gives you a freedom of replacing parts of your app that are not meeting your expectations with other ones that do. For example if you don't like your eCommerce default CMS you can easily replace it with Storyblok.

The main purpose of introducing the API Client into Vue Storefront architecture was to make such changes as simple as possible and let people apply them without introducing breaking changes to other parts of the app

For example: If you want to change the way you're getting eCommerce data and switch from REST API to GraphQL or fetch product reviews from external service you can easily do that without introducing breaking changes in the UI layer or composition API functions **as long as your method will keep the same interface**

You can override any of API Client methods with `override function. It accepts an object where you can put functions you want to override.

``` javascript
import {
  override
} from '@vue-storefront/{platform}-api'

override({
  async getProduct(params) {
    // new getProduct
  },
})
```

### Methods

You can find detailed information about all API Client methods here

## Composables

* [ `useCart()` ](#usecart)
* [ `useCategory()` ](#usecategory)
* [ `useCheckout()` ](#usecheckout)
* [ `useConfig()` ](#useconfig)
* [ `useLocale()` ](#uselocale)
* [ `usePage()` ](#usepage)
* [ `useProduct()` ](#useproduct)
* [ `useRouter()` ](#userouter)
* [ `useUser()` ](#useuser)
* [ `useUserOrders()` ](#useuserorders)
* [ `useWishlist()` ](#usewishlist)

### useCart

`useCart` composition API function is responsible, as its name suggests, for interactions with the cart in your eCommerce. This function returns following values:

``` typescript
interface UseCart
<
  CART,
  CART_ITEM,
  PRODUCT,
  COUPON
> {
  cart: ComputedProperty<CART>;
  addItem: (product: PRODUCT, quantity: number) => Promise<void>;
  isOnCart: (product: PRODUCT) => boolean;
  removeItem: (product: CART_ITEM,) => Promise<void>;
  updateItemQty: (product: CART_ITEM, quantity?: number) => Promise<void>;
  clear: () => Promise<void>;
  coupon: ComputedProperty<COUPON | null>;
  applyCoupon: (coupon: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
  load: () => Promise<void>;
  loading: ComputedProperty<boolean>;
}
```

* `cart` - Returns the Items in the Cart as a `computed` property
* `isOnCart` - Function that takes in a `product` and returns `true` or `false`
* `addItem` - Function that takes in a `product` and its `quantaty` and adds it to the cart
* `load` - Function that loads the current `cart
* `removeItem` - Function that takes in a `product` and removes it from the `cart 
* `clear` - Function that clears cart
* `updateItemQty` - Function that takes in a `product` and its new `quantaty` and updates it accordingly
* `coupon` - Returns applied coupon codes as a `computed` property
* `applyCoupon` - Function that takes in a `coupon` and applies it to the cart
* `removeCoupon` - Function that removes all applied coupons
* `loading` - Returns `true` / `false` as `computed` property

#### Cart initialization

Cart composable is a service designed for supporting a single cart and access it everywhere with ease. Initialization of a cart requires using `load()` when calling `useCart()` for the first time. Keep in mind that upon execution of `load` , the cart will get loaded only once, if a wishlist has already been loaded, nothing happens.

``` javascript
import {
  onSSR
} from '@vue-storefront/core';
import {
  useCart
} from '@vue-storefront/magento';

export default {
  setup() {
    const {
      cart,
      isOnCart,
      addItem,
      load,
      removeItem,
      clear,
      updateItemQty,
      coupon,
      applyCoupon,
      removeCoupon,
      loading
    } = useCart();

    onSSR(async () => {
      await load();
    });

    return {
      cart,
      isOnCart,
      addItem,
      removeItem,
      clear,
      updateItemQty,
      coupon,
      applyCoupon,
      removeCoupon,
      loading,
    };
  }
};
```

### useCategory

`useCategory` composition API function is responsible, as its name suggests, for interactions with the categories in your eCommerce. This function returns following values:

``` typescript
interface UseCategory
<
  CATEGORY
> {
  categories: ComputedProperty<CATEGORY[]>;
  search: (params: {
    [x: string]: any;
  }) => Promise<void>;
  loading: ComputedProperty<boolean>;
}
```

* `categories` - Returns all `categories` as a `computed` property
* `search` - Function that takes `categorySearchParams` as input and fill the `categories
* `loading` - Returns the current state of `search` as `computed` property

``` javascript
import {
  onSSR
} from '@vue-storefront/core';
import {
  useCategory
} from '@vue-storefront/magento';

export default {
  setup(props) {
    const {
      categories,
      search,
      loading
    } = useCategory();

    onSSR(async () => {
      let searchParameters = {};
      if (props.categoryId) {
        searchParameters = {
          ids: {
            eq: props.categoryId
          }
        };
      } else {
        searchParameters = getCategorySearchParameters(context);
      }
      await search(searchParameters);
    });

    return {
      categories,
      loading
    };
  }
};
```

### useCheckout

`useCheckout` composition API function is responsible, as its name suggests, for interactions with the checkout in your eCommerce. This function returns following values:

> This composable however needs to be impelemented in the `core` and then ported to magento.

``` typescript
interface UseCheckout
<
  PAYMENT_METHODS,
  SHIPPING_METHODS,
  PERSONAL_DETAILS,
  SHIPPING_DETAILS,
  SHIPPING_METHOD,
  BILLING_DETAILS,
  CHOOSEN_PAYMENT_METHOD,
  CHOOSEN_SHIPPING_METHOD,
  PLACE_ORDER
> { 
    chosenShippingMethod: Ref<CHOOSEN_SHIPPING_METHOD>; 
    shippingDetails: Ref<PERSONAL_DETAILS>; 
    billingDetails: Ref<PERSONAL_DETAILS>; 
    chosenPaymentMethod: Ref<CHOOSEN_PAYMENT_METHOD>;  
    placeOrder: (params: any) => Promise<any>; 
    loadDetails: (params: any) => Promise<any>; 
    paymentMethods: Ref<PAYMENT_METHODS[]>; 
    personalDetails: Ref<PERSONAL_DETAILS>; 
    loading: Readonly<Ref<Readonly<boolean>>>; 
    shippingMethods: Ref<SHIPPING_METHODS[]> 
}
```

* `chosenShippingMethod` - Returns the `chosenShippingMethod
* `shippingDetails` - Returns the `shippingDetails`
* `billingDetails` - Returns the `billingDetails`
* `chosenPaymentMethod` - Returns the `chosenPaymentMethod`
* `chosenShippingMethod` - Returns the `chosenShippingMethod`
* `placeOrder` - Function to `placeOrder`
* `loadDetails` - Function to `loadDetails`
* `paymentMethods` - Returns the `paymentMethods`
* `personalDetails` - Returns the `personalDetails`
* `loading` - Returns the `loading` state
* `shippingMethods` - Returns the `shippingMethods`

``` javascript
import {
  useCheckout
} from '@vue-storefront/magento';

export default {
  setup() {
    const {
      chosenShippingMethod,
      shippingDetails,
      billingDetails,
      chosenPaymentMethod,
      placeOrder,
      loadDetails,
      paymentMethods,
      personalDetails,
      loading,
      shippingMethods
    } = useCheckout();

    return {
      chosenShippingMethod,
      shippingDetails,
      billingDetails,
      chosenPaymentMethod,
      placeOrder,
      loadDetails,
      paymentMethods,
      personalDetails,
      loading,
      shippingMethods
    };
  }
};
```

### useConfig

useConfig` composition API function is responsible, as its name suggests, for interactions with the configuration in your eCommerce. This function returns following values:

``` typescript
interface UseConfig<CONFIG> {
  config: ComputedProperty<CONFIG>;
  loadConfig: () => Promise<void>;
  loading: ComputedProperty<boolean>;
}
```

* `config` - Returns the loaded `config` as `computed` property
* `loadConfig` - Function to load the `config`
* `loading` - Return state of `loadConfig` Function as `computed` property

``` javascript
import {
  onSSR
} from '@vue-storefront/core';
import {
  useConfig
} from '@vue-storefront/magento';

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

### useLocale

`useLocale` composition API function is responsible, as its name suggests, for interactions with the locales in your eCommerce. This function returns following values:

``` typescript
interface UseLocale {
  availableLocales: ComputedProperty<AgnosticLocale[]>;
  availableCountries: ComputedProperty<AgnosticCountry[]>;
  availableCurrencies: ComputedProperty<AgnosticCurrency[]>;
  country: ComputedProperty<AgnosticCountry>;
  currency: ComputedProperty<AgnosticCurrency>;
  loadAvailableLocales: () => Promise<void>;
  loadAvailableCountries: () => Promise<void>;
  loadAvailableCurrencies: () => Promise<void>;
  loading: ComputedProperty<boolean>;
  locale: ComputedProperty<AgnosticLocale>;
  setLocale: (locale: AgnosticLocale) => Promise<void>;
  setCountry: (country: AgnosticCountry) => Promise<void>;
  setCurrency: (currency: AgnosticCurrency) => Promise<void>;
}
```

* `availableLocales` - Returns all `availableLocales` as `computed` property
* `availableCountries` - Returns all `availableCountries` as `computed` property
* `availableCurrencies` - Returns all `availableCurrencies` as `computed` property
* `country` - Returns all `country` s as `computed` property
* `currency` - Returns all `currency` s as `computed` property
* `loadAvailableLocales` - Function that loads available locales
* `loadAvailableCountries` - Function that loads available countries
* `loadAvailableCurrencies` - Function that loads available currencies
* `loading` - Returns the `loading` state as `computed` property
* `setLocale` - Function that takes a `locale` as param and sets the `locale` property 
* `setCountry` - Function that takes a `country` as param and sets the `country` property 
* `setCurrency` - Function that takes a `currency` as param and sets the `currency` property 

``` javascript
import {
  useLocale
} from '@vue-storefront/magento';
export default {
  setup(props, context) {
    const {
      $router,
      $route
    } = context.root;
    const {
      locale,
      ...fields
    } = useLocale();
    const setCookie = context.root.$i18n.setLocaleCookie;
    const isLangModalOpen = ref(false);

    const handleChangeLang = ({
      name
    }) => {
      if (name === locale.value) {
        isLangModalOpen.value = false;
        return;
      }
      locale.value = name;
      setCookie(name);
      $router.go({
        path: $route.fullPath,
        force: true
      });
    };

    return {
      handleChangeLang,
      locale,
      isLangModalOpen,
      ...fields
    };
  }
}
```

### usePage

`usePage` composition API function is responsible, as its name suggests, for interactions with the pages in your eCommerce. This function returns following values:

``` typescript
interface UsePage<CACHEID> {
    loadPage: (identifier: string) => Promise<void>;
    page: Readonly<Ref<Readonly<Page>>>;
    loading: Readonly<Ref<Readonly<boolean>>>;
}
```

* `loadPage` - Function that takes an `identifier` and loads the `page`
* `page` - Returns the `page` data
* `loading` - indicates the State of `loadPage`

``` javascript
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

`useProduct` composition API function is responsible, as its name suggests, for interactions with the products in your eCommerce. This function returns following values:

``` typescript
interface UseProduct<PRODUCT, PRODUCT_FILTERS, SORTING_OPTIONS> {
 products: ComputedProperty<PRODUCT[]>;
 totalProducts: ComputedProperty<number>;
 availableFilters: ComputedProperty<PRODUCT_FILTERS>;
 search: (params: {
   perPage?: number;
   page?: number;
   sort?: any;
   term?: any;
   filters?: PRODUCT_FILTERS;
   [x: string]: any;
 }) => Promise<void>;
 availableSortingOptions: ComputedProperty<SORTING_OPTIONS>;
 loading: ComputedProperty<boolean>;
 [x: string]: any;
}
```

* `products` - Returns `products` as a `computed` property
* `totalProducts` - Returns the number of `totalProducts` as a `computed` property 
* `availableFilters` - Returns all `availableFilters` as a `computed` property
* `search` - Function that takes in `perPage` , `page` , `sort` , `term` , `filters` and an `array of String` as optional

 params and gets the `products` accordingly

* `availableSortingOptions` - Return all `availableSortingOptions` as a `computed` property
* `loading` - Retruns the `loading` state of `search`

``` javascript
import {
  useProduct
} from '@vue-storefront/magento';
import {
  onSSR
} from '@vue-storefront/core';

export default {
  setup(props) {
    const path = context.root.$route.path;
    let urlKey = path.split('/').pop();
    const {
      loading: productLoading,
      products,
      search
    } = useProduct('products__' + urlKey);
    onSSR(async () => {
      urlKey = urlKey.replace(config.value.product_url_suffix, '');
      // eslint-disable-next-line @typescript-eslint/camelcase,camelcase
      await search({
        filter: {
          url_key: {
            eq: urlKey
          }
        },
        queryType: 'DETAIL'
      });
    });

    return {
      productLoading,
      products
    }
  }
}
```

### useRouter

`useRouter` composition API function is responsible, as its name suggests, for interactions with the routes in your eCommerce. This function returns following values:

``` typescript
interface UseRouter {
  search: (url: string) => Promise<void>; 
  route: Readonly<Ref<Readonly<Page>>>; 
  loading: Readonly<Ref<Readonly<boolean>>>;
}
```

* `search` - Function that takes in a `url` and fills the `route` property
* `route` - Returns the current Page
* `loading` - Returns state of `search`

``` javascript
import {
  onSSR
} from '@vue-storefront/core';
import {
  useRouter
} from '@vue-storefront/magento';
import {
  computed
} from '@vue/composition-api';

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

### useUser

`useUser` composition API function is responsible, as its name suggests, for interactions with the user in your
 eCommerce. This function returns following values:
 

``` typescript
interface UseUser
<
  USER,
  UPDATE_USER_PARAMS
> {
  user: ComputedProperty<USER>;
  updateUser: (params: UPDATE_USER_PARAMS) => Promise<void>;
  register: (user: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    [x: string]: any;
  }) => Promise<void>;
  login: (user: {
    username: string;
    password: string;
    [x: string]: any;
  }) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: Ref<boolean>;
  loading: ComputedProperty<boolean>;
}
```

* `user` - Returns the current `User` as `computed` property
* `updateUser` - Function that takes the `currentUser` and the data to be updated as params and updates the `user

` property

* `register` - Function that takes in an `email` , `password` as params and `firstName` , `lastName` as optional params

 and registers a new `User` and sets the `user`
* `login` - Function that takes in the `username` and `password` of a `User` and sets `user`
* `logout` - Function that logs out the current `user`
* `changePassword` - Function that takes in the `currentPassword` and `newPassword` and updates the `user`
* `refreshUser` - Function to refresh `user`
* `isAuthenticated` - Return `boolean` if `user` exists
* `loading` - Returns the current state of the above functions as `computed` property

``` javascript
import {
  useUser
} from '@vue-storefront/magento';

export default {
  setup(props, {
    root
  }) {
    const {
      isAuthenticated
    } = useUser();
    const onAccountClicked = () => {
      isAuthenticated && isAuthenticated.value ? root.$router.push('/my-account') : toggleLoginModal();
    };

    return {
      onAccountClicked
    }
  }
}
```

### useUserOrders

`useUserOrders` composition API function is responsible, as its name suggests, for interactions with the orders in your
 eCommerce. This function returns following values:

``` typescript
interface UseUserOrders<ORDER> {
  orders: ComputedProperty<ORDER[]>;
  totalOrders: ComputedProperty<number>;
  searchOrders: (params?: {
    id?: any;
    page?: number;
    perPage?: number;
    [x: string]: any;
  }) => Promise<void>;
  loading: ComputedProperty<boolean>;
}
```

* `orders` - Returns an `array` of orders for the current User as a `computed` property
* `totalOrder` - Returns the total `number` of `orders` for the current User 
* `searchOrders` - Function that takes an `id` , `page` and `perPage` as optional values and sets the `orders array`
* `loading` - Returns the current state of the `searchOrders` function

``` javascript
import {
  onSSR
} from '@vue-storefront/core';
import {
  useUserOrders
} from '@vue-storefront/magento';
import {
  computed
} from '@vue/composition-api';

export default {
  setup() {
    const {
      orders,
      searchOrders
    } = useUserOrders();

    onSSR(async () => {
      await searchOrders();
    });

    return {
      orders: computed(() => orders ? orders.value : [])
    }
  }
}
```

### useWishlist

`useWishlist` composition API function is responsible, as its name suggests, for interactions with the user in your
 eCommerce. This function returns following values:
 

``` typescript
 interface UseWishlist
<
  WISHLIST,
  WISHLIST_ITEM,
  PRODUCT,
> {
  wishlist: ComputedProperty<WISHLIST>;
  addItem: (product: PRODUCT) => Promise<void>;
  isOnWishlist: (product: PRODUCT) => boolean;
  removeItem: (product: WISHLIST_ITEM,) => Promise<void>;
  clear: () => Promise<void>;
  load: () => Promise<void>;
  loading: ComputedProperty<boolean>;
}
```

* `wishlist` - Returns the current `whishlist` as `computed` property
* `addItem` - Function that takes in a product and adds it to the `wishlist`
* `isOnWishlist` - Function that takes in `product` and checks it against the `wishlist` and returns a `boolean`
* `removeItem` - Function that takes in a `product` of the `wishlist` and removes it
* `clear` - Function that clears out all `products` from the `wishlist`
* `load` - Function that loads the `wishlist`
* `loading` - Indicated the state of the above functions and returns a `boolean` as `computed` property 

``` javascript
import {
  onSSR
} from '@vue-storefront/core';
import {
  useWishlist
} from '@vue-storefront/magento';
export default {
  setup(props, {
    root
  }) {
    const {
      load
    } = useWishlist();
    onSSR(async () => {
      await load();
    });
  }
}
```

## Getters

* [Cardgetters](#cardgetters)
* [Categorygetters](#categorygetters)
* [Checkoutgetters](#checkoutgetters)
* [Ordergetters](#ordergetters)
* [Productgetters](#productgetters)
* [Usergetters](#usergetters)
* [Wishlistgetters](#wishlistgetters)

### Cardgetters

``` typescript
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
  [getterName: string]: (element: any, options?: any) => unknown;
}
```

* `getItems` - Function that takes in a `cart` and returns an `array` of `CartItems`
* `getItemName` - Function that takes in a `cartItem` and returns its `name`
* `getItemPrice` - Function that takes in a `cartItem` and returns its `regular price` and optional its `special price`
* `getItemQty` - Function that takes in a `cartItem` and returns its `quantity`
* `getItemAttributes` - Function that takes in a `cartItem` and optional `filters` and returns the attribute as `value`
 and `label`, optional the `name`
* `getItemSku` - Function that takes in a `cartItem` and returns its `sku`
* `getTotals` - Function that takes in a `cart` and returns the `total` and `subtotal
* `getShippingPrice` - Function that takes in a `cart` and retruns the total `shippingprice`
* `getTotalItems` - Function that takes in a `cart` and returns the amount of `cartItems`
* `getFormattedPrice` - Function that takes in `price` and returns it as a formatted `string`

### Categorygetters

``` typescript
interface CategoryGetters<CATEGORY> {
  getTree: (category: CATEGORY) => AgnosticCategoryTree | null;
  getBreadcrumbs?: (category: CATEGORY) => AgnosticBreadcrumb[];
  [getterName: string]: any;
}
```

* `getTree` - Function that takes in a `Category` and returns a `label`, an optional `slug` and an `array` of `items
` that contains the same information and is recursive
* `getBreadcrumbs` - Function that takes in a Category  and returns an `array` of `text` and `links`

### Checkoutgetters

``` typescript
interface CheckoutGetters<SHIPPING_METHOD> {
  getShippingMethodId: (shippingMethod: SHIPPING_METHOD) => string;
  getShippingMethodName: (shippingMethod: SHIPPING_METHOD) => string;
  getShippingMethodDescription: (shippingMethod: SHIPPING_METHOD) => string;
  getShippingMethodPrice: (shippingMethod: SHIPPING_METHOD) => number;
  getFormattedPrice: (price: number) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}
```

* `getShippingMethodId` - Function that takes in a `shippingMethod` and returns its `id`
* `getShippingMethodName` - Function that takes in a `shippingMethod` and returns its `name`
* `getShippingMethodDescription` - Function that takes in a `shippingMethod` and returns its `description`
* `getShippingMethdPrice` - Function that takes in a `shippingMethod` and returns the `price` to use it
* `getFormattedPrice` - Function that takes in a `price` and returns it formatted. 

### Ordergetters

``` typescript
interface UserOrderGetters<ORDER, ORDER_ITEM> {
  getDate: (order: ORDER) => string;
  getId: (order: ORDER) => string;
  getStatus: (order: ORDER) => string;
  getPrice: (order: ORDER) => number;
  getItems: (order: ORDER) => ORDER_ITEM[];
  getItemSku: (item: ORDER_ITEM) => string;
  getItemName: (item: ORDER_ITEM) => string;
  getItemQty: (item: ORDER_ITEM) => number;
  getFormattedPrice: (price: number) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}
```

* `getDate` - Function that takes in an `order` and returns the `date` it has been issued
* `getId` - Function that takes in an `order` and returns its `id`
* `getStatus` - Function that takes in an `order` and returns its current `status`
* `getPrice` - Function that takes in an `order` and returns its `total price`
* `getItems` - Function that takes in an `order` and returns an `array` of `items` in the `order`
* `getItemSku` - Function that takes in an `orderItem` and returns its `sku`
* `getItemName` - Function that takes in an `orderItem` and returns its `name`
* `getItemQty` - Function that takes in an `orderItem` and returns its `quantity` in the `order`
* `getFormattedPrice` - Function that takes in a `price` and returns it formatted

### Productgetters

``` typescript
interface ProductGetters<PRODUCT, PRODUCT_FILTER> {
  getName: (product: PRODUCT) => string;
  getSlug: (product: PRODUCT) => string;
  getPrice: (product: PRODUCT) => AgnosticPrice;
  getGallery: (product: PRODUCT) => AgnosticMediaGalleryItem[];
  getCoverImage: (product: PRODUCT) => string;
  getFiltered: (products: PRODUCT[], filters?: PRODUCT_FILTER) =>
    PRODUCT[];
  getAttributes: (products: PRODUCT[] | PRODUCT, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getDescription: (product: PRODUCT) => string;
  getCategoryIds: (product: PRODUCT) => string[];
  getId: (product: PRODUCT) => string;
  getFormattedPrice: (price: number) => string;
  getBreadcrumbs?: (product: PRODUCT) => AgnosticBreadcrumb[];
  [getterName: string]: any;
}
```

* `getName` - Function that takes in a `product` and returns its `name`
* `getSlug` - Function that takes in a `product` and returns its `slug`
* `getPrice` - Function that takes in a `product` and returns a `regular price` and `special price`
* `getGallery` - Function that takes in a `product` and returns an `array` of `small`, `normal` and `big` image paths
* `getCoverImage` - Function that takes in a `product` and returns the `path` to its `coverImage`
* `getFiltered` - Function that takes in an `array`of `products`, optional `filters` and returns a `productsArray`
* `getAttributes` - Function that takes in an `array` of `products` or a single `product`, optional an `array` of
 `attributes` as `filters` and returns the `productAttributes`
* `getDescription` - Function that takes in a `product` and returns its `description`
* `getCategoryIds`- Function that takes in `product` and returns an `array` with its `categoryIds`
* `getId` - Function that takes in a `product` and returns its `id`
* `getFormattedPrice` - Function that takes in the `productPrice` and returns it formatted
* `getBreadcrumbs` - Function that takes in a `product` and returns its `breadcrumbItems`

### Usergetters

``` typescript
interface UserGetters<USER> {
  getFirstName: (customer: USER) => string;
  getLastName: (customer: USER) => string;
  getFullName: (customer: USER) => string;
  [getterName: string]: (element: any, options?: any) => unknown;
}
```

* `getFirstName` - Function that takes in a `user` and returns its `firstname`
* `getLastName` - Function that takes in a `user` and returns its `lastname`
* `getFullName` - Function that takes in a `user` and returns the `fullname`

### Wishlistgetters

``` typescript
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
```

* `getItems` - Function that takes in a `wishlist` and returns an `array` of `wishlistItems`
* `getItemName` - Function that takes in a `wishlistItem` and returns its `name`
* `getItemImage` - Function that takes in a `wishlistItem` and returns its `imagePath`
* `getItemPrice` - Function that takes in a `wishlistItem` and returns the `regular price` and `special price`
* `getItemAttributes` - Function that takes in a `wishlistItem` and an optional `array` of filters and returns the
 `attributes`
* `getItemSku` - Function that takes in a `wishlistItem` and returns its `sku`
* `getTotals` - Function that takes in a `whishlistItem` and returns the `total` and `suptotal`
* `getTotalItems` - Function that takes in a `wishlist` and returns the number of `items`
* `getFormattedPrice` - Function that takes in a `price` and returns it formatted 

## Setter

### Cartsetter

`setCart` - Function that takes in new `cart` and sets it as default.

