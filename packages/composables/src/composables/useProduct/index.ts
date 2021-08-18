import {
  Context,
  CustomQuery,
  ProductsSearchParams,
  UseProduct,
  useProductFactory,
  UseProductFactoryParams,
} from '@vue-storefront/core';
import { ProductsListQuery, GetProductSearchParams, ProductsQueryType } from '@vue-storefront/magento-api';
import { Scalars } from '@vue-storefront/magento-api/lib/types/GraphQL';

const factoryParams: UseProductFactoryParams<ProductsListQuery['products'], ProductsSearchParams> = {
  productsSearch: async (context: Context, params: GetProductSearchParams & { queryType: ProductsQueryType; customQuery?: CustomQuery; configurations?: Scalars['ID'] }) => {
    const {
      queryType,
      customQuery,
      ...searchParams
    } = params;

    switch (queryType) {
      case ProductsQueryType.Detail:
        const queryPromises = [];

        queryPromises.push(
          context
            .$magento
            .api
            .productDetail(searchParams as GetProductSearchParams, (customQuery || {})),

          context
            .$magento
            .api
            .upsellProduct(searchParams as GetProductSearchParams, (customQuery || {})),

          context
            .$magento
            .api
            .relatedProduct(searchParams as GetProductSearchParams, (customQuery || {})),
        );

        if (searchParams.configurations) {
          queryPromises.push(
            context
              .$magento
              .api
              .configurableProductDetail(searchParams as GetProductSearchParams, (customQuery || {})),
          );
        }

        const result = await Promise.all(queryPromises);

        const [
          productDetailsResults,
          upsellProduct,
          relatedProduct,
          configurableProduct,
        ] = result;

        productDetailsResults.data.products.items[0] = {
          ...productDetailsResults.data.products.items[0],
          ...upsellProduct.data.products.items[0],
          ...relatedProduct.data.products.items[0],
        };

        if (configurableProduct) {
          productDetailsResults.data.products.items[0] = {
            ...productDetailsResults.data.products.items[0],
            ...configurableProduct.data.products.items[0],
          };

          // Because `variant` is of type `SimpleProduct` it's possible to overwrite master product with it's values
          // https://devdocs.magento.com/guides/v2.4/graphql/interfaces/configurable-product.html#ConfigurableProductOptionsSelection
          if (configurableProduct.data.products.items[0]?.configurable_product_options_selection?.variant) {
            productDetailsResults.data.products.items[0] = {
              ...productDetailsResults.data.products.items[0],
              ...configurableProduct.data.products.items[0].configurable_product_options_selection.variant,
            };
          }
        }

        // eslint-disable-next-line no-underscore-dangle
        if (productDetailsResults.data.products.items[0].__typename === 'GroupedProduct') {
          // ToDo: check if it's possible to do request in parallel also for GroupedProduct
          const groupedProduct = await context
            .$magento
            .api
            .groupedProductDetail(searchParams as GetProductSearchParams, (customQuery || {}));

          productDetailsResults.data.products.items[0] = {
            ...productDetailsResults.data.products.items[0],
            ...groupedProduct.data.products.items[0],
          };
        }

        // eslint-disable-next-line no-underscore-dangle
        if (productDetailsResults.data.products.items[0].__typename === 'BundleProduct') {
          const bundledProduct = await context
            .$magento
            .api
            .bundleProductDetail(searchParams as GetProductSearchParams, (customQuery || {}));

          productDetailsResults.data.products.items[0] = {
            ...productDetailsResults.data.products.items[0],
            ...bundledProduct.data.products.items[0],
          };
        }

        return productDetailsResults.data.products;

      case ProductsQueryType.List:
      default:
        const productListResults = await context
          .$magento
          .api
          .products(searchParams as GetProductSearchParams, (customQuery || {}));
        return productListResults.data.products;
    }
  },
};

const useProduct: (cacheId?: string) => UseProduct<ProductsListQuery['products'], ProductsSearchParams> = useProductFactory<ProductsListQuery['products'], ProductsSearchParams>(factoryParams);

export default useProduct;
