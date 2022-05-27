import type { ConfigurableProduct } from '~/modules/GraphQL/types';
import { getPrice as getProductPrice } from '~/modules/catalog/product/getters/productGetters';

export function getConfigurableProductPriceCommand(product: ConfigurableProduct): number {
  const priceProduct = product?.configurable_product_options_selection?.variant ?? product;
  const { regular } = getProductPrice(priceProduct);

  return regular;
}
