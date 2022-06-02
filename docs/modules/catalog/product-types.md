# Product Types

Magento has different types of products, and each of them requires a different way of presenting data. To address this problem, we introduced Vue components for the four most commonly used product types:

- Simple
- Grouped
- Configurable
- Bundle

These components are located in the `modules/catalog/product/components/product-types` folder.

## Product rendering

The `modules/catalog/pages/product.vue` component that powers the `/product` route dynamically switches between components based on the type of the current product.

Firstly, components for all product types are registered using dynamic imports:

```typescript
export default {
  components: {
    SimpleProduct: () => import('...'),
    BundleProduct: () => import('...'),
    ConfigurableProduct: () => import('...'),
    GroupedProduct: () => import('...'),
  }
}
```

Then, the `renderer` variable reads the type of the current product based on the data from Magento API (with a fallback to the `simple` type).

```typescript
const renderer = computed(() => product.value?.__typename ?? ProductTypeEnum.SIMPLE_PRODUCT);
```

Component passes this variable to the `:is` attribute of the dynamic `<component>` to switch between product components.

```html{2}
<component
  :is="renderer"
  v-if="product"
  :product="product"
  :is-fetching="loading"
  @fetchProduct="fetchProduct($event.query)"
/>
```

## How to add a custom product type?

To add support for custom product types, create a new component inside the `modules/catalog/product/components/product-types` folder.

It should accept two props:

- `product` (type: [Product](http://localhost:8080/api-reference/magento-theme.product.html)) - product object fetched from the API,
- `isFetching` (type: `boolean`) - a flag indicating whether the `product.vue` components currently fetches product data .

```typescript
export default {
  props: {
    product: {
      type: [Object, null] as PropType<Product>,
      default: null,
    },
    isFetching: {
      type: Boolean,
      default: true,
    },
  }
};
```

Then, open the `modules/catalog/pages/product.vue` file and register the newly created component in the `components` object using dynamic import. Make sure that the name of this component matches the `__typename` value returned from the Magento API.

Once done, the page should dynamically import the component and feed it with product data.
