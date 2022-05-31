# Product Types
In the Magento there are different types of products and each of it might require different way of presenting data. To address this problem in the Vue Storefront we introduced four most commonly used renderer types. Each is a standalone Vue component encapsulating differences of a multiple product types.

### Components
* Simple - modules/catalog/product/components/product-types/simple
* Grouped - modules/catalog/product/components/product-types/grouped
* Configurable - modules/catalog/product/components/product-types/configurable
* Bundle - modules/catalog/product/components/product-types/bundle

### Resolving product type renderer
Each renderer is a [dynamic component](https://vuejs.org/guide/essentials/component-basics.html). Resolving component is simple, and you can find the relevant code in `modules/catalog/pages/product.vue`

**Resolver**
```typescript
const renderer = computed(() => product.value?.__typename ?? ProductTypeEnum.SIMPLE_PRODUCT);
```

**Component**
```vue
<component
  :is="renderer"
  v-if="product"
  :product="product"
  :is-fetching="loading"
  @fetchProduct="fetchProduct($event.query)"
/>
```
Renderer is resolved based on the `product.__typename`. Default fallback is a `simple` renderer.

### How to add custom product type?
1. Create your renderer component inside `modules/catalog/product/components/product-types` directory. Implementation is the matter of business requirement and will be not cover in this documentation.
2. Open `modules/catalog/pages/product.vue` and lazy-import your component in the same way as the rest of renderers.
3. Make sure that the name of renderer matches the `__typename` value.
4. Once done, renderer will be resolved automatically once product data are fetched.
