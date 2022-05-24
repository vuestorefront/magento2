import type { Product } from '~/modules/catalog/product/types';
import { AgnosticAttribute } from '~/composables/types';

export const getAttributeValue = (attribute) => attribute.values;

export const formatAttributeList = (attributes): AgnosticAttribute[] => attributes.map((attr) => {
  const attrValue = getAttributeValue(attr);
  return {
    name: attr.attribute_code,
    value: attrValue,
    label: attr.label,
  };
});

export const getVariantByAttributes = (products: Product[], attributes: any): Product => {
  if (!products || products.length === 0) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const configurationKeys = Object.keys(attributes);

  // @ts-ignore
  return products[0].configurable_children.find((product) => configurationKeys
    // @ts-ignore
    .every((attrName) => product[attrName] && product[attrName] === attributes[attrName])) || products[0].configurable_children[0];
};
