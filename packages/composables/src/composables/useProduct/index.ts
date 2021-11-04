import {
  ComposableFunctionArgs,
  Context,
  Logger,
  ProductsSearchParams,
  UseProduct,
  useProductFactory,
  UseProductFactoryParams,
} from '@absolute-web/vsf-core';
import {
  GetProductSearchParams, ProductsQueryType, Product, Products, Aggregation, StagingPreviewParams,
} from '@absolute-web/magento-api';
import { Scalars } from '@absolute-web/magento-api/lib/types/GraphQL';
import { useCache } from '@absolute-web/vsf-cache';

const pdpDataBlacklist = new Set(['media_gallery', 'description', 'short_description', 'image', 'small_image', 'thumbnail']);

const extractPdpData = (productDetails: Product) => {
  let productData = {};

  if (productDetails.pdp_data) {
    try {
      productData = JSON.parse(productDetails.pdp_data);

      Object.keys(productData).forEach((key) => {
        if (pdpDataBlacklist.has(key)) {
          delete productData[key];
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  return productData;
};

const deleteEmptyFields = (productDetails: Product) => {
  const result = {};

  Object.keys(productDetails).forEach((key) => {
    if (typeof productDetails[key] !== 'undefined' && productDetails[key] !== null) {
      result[key] = productDetails[key];
    }
  });

  return result as Product;
};

const extractCustomAttributes = (productDetails: Product, aggregations: Aggregation[]) => {
  const result = {};

  aggregations.forEach((aggregation) => {
    if (
      !Object.prototype.hasOwnProperty.call(productDetails, aggregation.attribute_code)
      || productDetails[aggregation.attribute_code] === null
      || !Object.prototype.hasOwnProperty.call(aggregation, 'options')
      || aggregation.options.length === 0) {
      return;
    }

    const key = aggregation.attribute_code;

    const attributeOption = aggregation.options.find(
      (option) => Number.parseInt(option.value, 10) === productDetails[key]
        || option.label === productDetails[key],
    );

    if (
      attributeOption
      && Object.prototype.hasOwnProperty.call(attributeOption, 'label')
    ) {
      result[key] = {
        code: key,
        label: aggregation.label || '',
        value: attributeOption.value,
        valueLabel: attributeOption.label,
      };
    }
  });

  return result;
};

const factoryParams: UseProductFactoryParams<Products,
ProductsSearchParams> = {
  provide() {
    return {
      cache: useCache(),
    };
  },
  productsSearch: async (context: Context, params: ComposableFunctionArgs<GetProductSearchParams & {
    queryType: ProductsQueryType;
    configurations?: Scalars['ID'];
    preview?: StagingPreviewParams;
  }>) => {
    Logger.debug('[Magento]: Load product based on ', { params });

    const {
      queryType,
      preview,
      ...searchParams
    } = {
      ...params,
    };

    switch (queryType) {
      case ProductsQueryType.Detail:
        const productDetailsResults = await context
          .$magento
          .getApi
          .productDetail({
            ...searchParams,
            preview,
          });

        if (productDetailsResults?.data?.cacheTags) {
          context.cache.addTagsFromString(productDetailsResults.data.cacheTags);
        }

        Logger.debug('[Result]:', { data: productDetailsResults });

        if (productDetailsResults.data.products.items.length === 0) {
          return productDetailsResults.data.products as unknown as Products;
        }

        let productDetails = productDetailsResults.data.products.items[0] as unknown as Product;
        const aggregations = productDetailsResults.data.products.aggregations as unknown as Aggregation[];

        productDetails = {
          ...productDetails,
          ...extractPdpData(productDetails),
          pdp_data: undefined,
        };

        productDetails = {
          ...productDetails,
          ...extractCustomAttributes(productDetails, aggregations),
        };

        productDetails = deleteEmptyFields(productDetails);

        return { items: [productDetails], aggregations } as Products;

      case ProductsQueryType.List:
      default:
        const productListResults = await context
          .$magento
          .getApi
          .products(searchParams as GetProductSearchParams);

        const listAggregations = (productListResults.data.products.aggregations || []) as unknown as Aggregation[];

        if (listAggregations.length > 0) {
          productListResults.data.products.items = productListResults.data.products.items.map((product) => ({
            ...product,
            ...extractCustomAttributes(product as unknown as Product, listAggregations),
          }));
        }

        if (productListResults?.data?.cacheTags) {
          context.cache.addTagsFromString(productListResults.data.cacheTags);
        }

        Logger.debug('[Result]:', { data: productListResults });

        return productListResults.data.products as unknown as Products;
    }
  },
};

const useProduct:
(cacheId?: string) => UseProduct<Products,
ProductsSearchParams> = useProductFactory<Products,
ProductsSearchParams>(factoryParams);

export default useProduct;
