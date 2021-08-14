import {
  Context,
  CustomQuery,
  ProductsSearchParams,
  UseProduct,
  useProductFactory,
  UseProductFactoryParams,
} from '@vue-storefront/core';
import { ProductsListQuery, GetProductSearchParams, ProductsQueryType } from '@vue-storefront/magento-api';

const factoryParams: UseProductFactoryParams<ProductsListQuery['products'], ProductsSearchParams> = {
  productsSearch: async (context: Context, params: GetProductSearchParams & { queryType: ProductsQueryType; customQuery?: CustomQuery }) => {
    const {
      queryType,
      customQuery,
      ...searchParams
    } = params;
    switch (queryType) {
      case ProductsQueryType.Detail:
        const [
          productDetailsResults,
          upsellProduct,
          relatedProduct,
        ] = await Promise.all([
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
        ]);

        productDetailsResults.data.products.items[0] = {
          ...productDetailsResults.data.products.items[0],
          ...upsellProduct.data.products.items[0],
          ...relatedProduct.data.products.items[0],
        };

        // eslint-disable-next-line no-underscore-dangle
        if (productDetailsResults.data.products.items[0].__typename === 'ConfigurableProduct') {
          const configurableProduct = await context
            .$magento
            .api
            .configurableProductDetail(searchParams as GetProductSearchParams, (customQuery || {}));

          productDetailsResults.data.products.items[0] = {
            ...productDetailsResults.data.products.items[0],
            ...configurableProduct.data.products.items[0],
          };
        }

        // eslint-disable-next-line no-underscore-dangle
        if (productDetailsResults.data.products.items[0].__typename === 'GroupedProduct') {
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
            .bundledProductDetail(searchParams as GetProductSearchParams, (customQuery || {}));

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
