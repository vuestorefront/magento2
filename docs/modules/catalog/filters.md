# Filters
On the category page there are filters in the sidebar, each is responsible for narrowing list of products result and each can be rendered in a very different way.
To address that problem we introduced most commonly used renderer types and logic that helps to add and configure custom renderers that fit business requirements.

### Renderers
Available renderers are

* Checkbox - for a multiselect purpose
* Radio - for a single select purpose
* Color Swatch - allows displaying list of colors as a multiselect swatches
* Yes/No - simple binary true/false radio filter

You can find all of them in `<root>/modules/catalog/category/components/filters/renderer` directory

**Naming convention** for renderers is `<type_name>Type.vue` eg. `RadioType.vue` or `CheckboxType.vue`

### Configuration
Filter's config file is located in `<root>/modules/catalog/category/config/config.ts`. You can configure what filters you want to display, which renderer to use, what is the type of filter and eventually disable some of them. The list of filters is tha actual set of filter that will be displayed in the sidebar on the category page. If there is no filter configured - at least its code must be set - it will be not displayed.

* attrCode - this is the attribute code and must match Magento's attribute code
* type [default: checkbox] - define a type of attribute
* component [default: checkbox] - define a component to use for a rendering purpose
* disabled [default: false] - if set to `true` the attribute will be not display as a filter

As you can see, only the `attrCode` field is required, because it is not possible to guess or assume this parameter.

**NOTE:** type and component, though might have the same value, serves a completely different purposes. This is best illustrated in the case of `yesno` renderer which type is `yes_no` but the component is set to `radio`. Even if renderers are the same, knowing which type of is used in the application might be useful.

**NOTE:** for a filter, to be displayed on the filter list, it must be configured at least with a minimal data, which is a require attribute code. This is a simple whitelist mechanism which prevents displaying all available filters.

### Query
The command responsible for fetching all filters is `<root>>/modules/catalog/category/components/filters/command/getProductFilterByCategoryCommand.ts` and the query `<root>/modules/catalog/category/components/filters/command/getProductFilterByCategory.gql.ts`. This is the best place to modify filters fetching logic.

### How to modify the list of filters on the category page?

1. Let's say that our goal is to 1) disable `material` filter; 2) add new `awesome` filter
2. Open filter's configuration file `<root>/modules/catalog/category/config/config.ts`
3. There is a list of a default filters
```typescript
return [
  {
    attrCode: 'price',
    type: FilterTypeEnum.RADIO,
    component: RendererTypesEnum.RADIO,
  },
  {
    attrCode: 'material',
  },
  // and more
]
```
4. Firstly, to disable a filter we must simply set `disabled` to `true` for that filter. Disabled filter will be not rendered.
```typescript
return [
  {
    attrCode: 'price',
    type: FilterTypeEnum.RADIO,
    component: RendererTypesEnum.RADIO,
  },
  {
    attrCode: 'material',
    disabled: true, // flag to disable rendering of the filter
  },
  // and more
]
```
5. Secondly, to add a new filter with a minimum effort we must add only filter's `attrCode` value
```typescript
return [
  {
    attrCode: 'price',
    type: FilterTypeEnum.RADIO,
    component: RendererTypesEnum.RADIO,
  },
  {
    attrCode: 'material',
    disabled: true,
  },
  {
    attrCode: 'awesome' // new attribute to be displayed as a filter with a default checkbox renderer and as a checkbox type
  }
  // and more
]
```

### How to add a filter with a new type and renderer?
Adding a new renderer is straightforward. In a previous part we just added new `awesome` attribute with minimal configuration and therefore the filter will be rendererd as a `checkbox`.
1. Create a new renderer inside the renderers directory `modules/catalog/category/components/filters/renderer` and name it `AwesomeType.vue`

  **You must follow a few rules to make the renderer usable**
   * Your component `should` emit `selectFilter` event whenever an option is selected (type: AggregationOption), otherwise parent component will not know about the action
      ```vue
      <SfRadio
         v-for="option in filter.options"
         :key="`${filter.attribute_code}-${option.value}`"
         class="radio-filter"
         :value="option.value"
         name="filter__price"
         data-testid="category-filter"
         @change="$emit('selectFilter', option)"# emitted event, option type is AggregationOption
      ></SfRadio>
     ```
     * Minimal props configuration is as the follow
      ```typescript
         props: {
           filter: {
           type: Object as PropType<Aggregation>,
           required: true,
           },
         },
      ```
2. Once you have your custom renderer in place, you should add a new renderer type to the enum `modules/catalog/category/components/filters/renderer/RendererTypesEnum.ts`
    ```typescript
    enum RendererTypesEnum {
      RADIO = 'RadioType',
      CHECKBOX = 'CheckboxType',
      SWATCH_COLOR = 'SwatchColorType',
      YES_NO = 'YesNoType',
      DEFAULT = 'CheckboxType',
      AWESOME = 'AwesomeType', // New renderer type
    }
    ```
3. Now, open the configuration file and simply modify selected filter's renderer type
    ```typescript
    return [
      {
        attrCode: 'price',
        type: FilterTypeEnum.RADIO,
        component: RendererTypesEnum.RADIO,
      },
      {
        attrCode: 'material',
        disabled: true,
      },
      {
        attrCode: 'awesome',
        type: FilterTypeEnum.RADIO, // We decide that our renderer is a radio type
        component: RendererTypesEnum.AWESOME, // We use our AwesomeType component to render the filter
      }
      // and more
    ]
    ```
