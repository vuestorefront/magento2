import { AgnosticAttribute, AgnosticPrice } from '@vue-storefront/core';
import { ProductInterface, ConfigurableOption } from  '../../../../api-client/src/types'

export const getAttributeValue = (attribute) => {
    return attribute.values;
};

export const formatAttributeList = (attributes: ConfigurableOption[]): AgnosticAttribute[] =>
    attributes.map((attr) => {
        const attrValue = getAttributeValue(attr);
        return {
            name: attr.attribute_code,
            value: attrValue,
            label: attr.label
        };
    });

export const getVariantByAttributes = (products: Product[], attributes: any): Product => {
    if (!products || products.length === 0) {
        return null;
    }

    const configurationKeys = Object.keys(attributes);

    return products[0].configurable_children.find((product) => {
        return configurationKeys.every((attrName) =>
            product.hasOwnProperty(attrName) && product[attrName] == attributes[attrName]
        );
    }) || products[0].configurable_children[0];
};
