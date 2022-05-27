# Filters
Filters are filterable attributes available on the category page to narrow the result set. Natively Magetno 2 supports a lot of configuration options for each attribute including renderer, where to display the attribute or how to do that. Unfortunately GraphQL has its limitations and most of the filter options are unavailable for headless fronted purposes. That is why we introduced extensive and configurable implementation to address that issue.

### Renderers
In the core we implemented four most commonly used renderer types:

* Checkbox
* Radio
* Color Swatch
* Yes No

You can find all of them in `<root>/modules/catalog/category/components/filters/renderer`

### Configuration
Filter's config file is located in `<root>/modules/catalog/category/config/config.ts`. You can configure what filters you want to display, which renderer to use, what is the type of filter and eventually disable some of them. The list of filters is tha actual set of filter that will be displayed in the sidebar on the category page. If there is no filter configured - at least its code must be set - it will be not displayed.
The default configuration fallback is as follows

```javascript
const defaultCfg = {
  attrCode,
  type: FilterTypeEnum.CHECKBOX,
  component: RendererTypesEnum.CHECKBOX,
  disabled: false,
};
```
As you can see only the `attrCode` is required because it is not possible to guess or assume this parameter.

### Query
The command responsible for fetching all filters is `<root>>/modules/catalog/category/components/filters/command/getProductFilterByCategoryCommand.ts` and the query `<root>/modules/catalog/category/components/filters/command/getProductFilterByCategory.gql.ts`. This is the best place to modify filters fetching logic.
