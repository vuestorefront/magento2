import type { ConfigurableProduct } from '~/modules/GraphQL/types';
import { getPrice as getProductPrice } from '~/modules/catalog/product/getters/productGetters';

export function getConfigurableProductSpecialPriceCommand(product: ConfigurableProduct): number {
  const priceProduct = product?.configurable_product_options_selection?.variant ?? product;
  const { special } = getProductPrice(priceProduct);

  return special;
}
