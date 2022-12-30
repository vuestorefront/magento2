# Filters

The category page contains filters in the sidebar. Each of these filters narrows down the list of product results and renders differently.

We introduced renderers for the most commonly used types and the mechanism to help you add and configure the filter list.

## Renderers

Before we discuss the mechanism that powers the filters list and how to configure it, let's explore the available renderers and when to use them:

- **Checkbox**  for selecting multiple options from a list,
- **Radio** for selecting a single option from a list,
- **Color swatch** for displaying a list of colors and selecting multiple options,
- **Yes/No** for toggling between the `true` and `false` options.

You can find all of them in the `modules/catalog/category/components/filters/renderer` folder. The naming convention we used for these renderers is their type name followed by the `Type` keyword, e.g.: `RadioType` or `CheckboxType`.

## Configuration

Filters sidebar on the Category page is configured in the `modules/catalog/category/config/config.ts` file. It exports the `config()` function that returns an array of filter configurations. By modifying this array, you can configure filters, disable them, decide which renderers to use, etc.

Each filter can be customized using the following properties:

- `attrCode` (required) - attribute code and that must match Magento's attribute code,
- `type` (default: `checkbox`) - attribute type,
- `component` (default: `checkbox`) - component to render,
- `disabled` (default: `false`) - when set to `true` the attribute will not be displayed, nor affect the results.

Although the `type` and `component` fields might have the same values, they serve different purposes. It is best illustrated in the `yesno` renderer, whose type is `yes_no`, but the component used is `radio`. Even if renderers are the same, it's worth checking which component renders in the application.

### Examples

To change the filters, open the `modules/catalog/category/config/config.ts` configuration file and update the array returned from the `config()` function.

#### Adding new filters

To add a new filter, add a new object to the array with at least the `attrCode` property. Such configuration will generate a `checkbox` filter because this is the default value for both the `types` and `component` properties.

```diff
return [
+  {
+    attrCode: 'capacity',
+  },
  // Other filters
]
```

#### Disabling filters

To disable a filter, set that filter's `disabled` property to `true`.

```diff
return [
  {
    attrCode: 'material',
-    disabled: false,
+    disabled: true,
  },
  // Other filters
]
```

## GraphQL query

If you want to see or modify the way the application loads the filters, see the following files:

- `modules/catalog/category/components/filters/command/getProductFilterByCategoryCommand.ts` file for request handler,
- `modules/catalog/category/components/filters/command/getProductFilterByCategory.gql.ts` for GraphQL query.

## Adding new filter type and renderer

### Creating a new renderer

To create a new renderer, open the `modules/catalog/category/components/filters/renderer` folder and add a new file following the naming convention mentioned in the [Renderers](#renderers) section, for example `CustomType.vue`.

Every renderer must:

- Emit `selectFilter` event whenever an option is selected (type: `AggregationOption`). Otherwise parent component will not know about the change.

  ```html
  <input @input="$emit('selectFilter', $event.target.value)">
  ```

- Accept the `filter` prop (type: [Aggregation](/api-reference/magento-theme.aggregation.html))

  ```typescript
  export default {
    props: {
      filter: {
        type: Object as PropType<Aggregation>,
        required: true
      }
    }
  }
  ```

Once you have your custom renderer in place, you have to add a new renderer type to the enum located in the `modules/catalog/category/components/filters/renderer/RendererTypesEnum.ts` file.

```diff
enum RendererTypesEnum {
+  CUSTOM = 'CustomType',
  // Other types
}
```

Finally, to use the new renderer, open the `modules/catalog/category/config/config.ts` configuration file and update the array returned from the `config()` function.

```diff
return [
+  {
+    attrCode: 'custom',
+    type: FilterTypeEnum.RADIO, // Value of this property might be different
+    component: RendererTypesEnum.CUSTOM,
+  }
  // Other filters
]
```
