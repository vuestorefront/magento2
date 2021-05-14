import {
  Context, useProductFactory, ProductsSearchParams, UseProduct,
} from '@vue-storefront/core';
import { UseProductFactoryParams } from '@vue-storefront/core/lib/src/factories/useProductFactory';
import { ProductsListQuery, GetProductSearchParams, ProductsQueryType } from '@vue-storefront/magento-api';

const availableSortingOptions = [{
  value: 'latest',
  label: 'Latest',
}, {
  value: 'price-up',
  label: 'Price from low to high',
}, {
  value: 'price-down',
  label: 'Price from high to low',
}];

const factoryParams: UseProductFactoryParams<ProductsListQuery['products'], ProductsSearchParams> = {
  productsSearch: async (context: Context, params: GetProductSearchParams & { queryType: ProductsQueryType; }) => {
    const { queryType, ...searchParams } = params;
    switch (queryType) {
      case ProductsQueryType.Detail:
        const [
          productDetailsResults,
          upsellProduct,
          relatedProduct,
        ] = await Promise.all([
          context.$magento.api.productDetail(searchParams as GetProductSearchParams),
          context.$magento.api.upsellProduct(searchParams as GetProductSearchParams),
          context.$magento.api.relatedProduct(searchParams as GetProductSearchParams),
        ]);

        productDetailsResults.data.products.items[0] = {
          ...productDetailsResults.data.products.items[0],
          ...upsellProduct.data.products.items[0],
          ...relatedProduct.data.products.items[0],
        };

        // eslint-disable-next-line no-underscore-dangle
        if (productDetailsResults.data.products.items[0].__typename === 'ConfigurableProduct') {
          const configurableProduct = await context.$magento.api.configurableProductDetail(searchParams as GetProductSearchParams);

          productDetailsResults.data.products.items[0] = {
            ...productDetailsResults.data.products.items[0],
            ...configurableProduct.data.products.items[0],
          };
        }

        return productDetailsResults.data.products;

      case ProductsQueryType.List:
      default:
        const productListResults = await context.$magento.api.products(searchParams as GetProductSearchParams);
        return productListResults.data.products;
    }
  },
};

const useProduct: (cacheId: string) => UseProduct<ProductsListQuery['products'], ProductsSearchParams> = useProductFactory<ProductsListQuery['products'], ProductsSearchParams>(factoryParams);

export default useProduct;
