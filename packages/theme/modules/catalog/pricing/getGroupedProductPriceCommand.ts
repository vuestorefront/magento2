import type { GroupedProduct, ProductInterface } from '~/modules/GraphQL/types';
import { getPrice as getProductPrice } from '~/modules/catalog/product/getters/productGetters';

export function getGroupedProductPriceCommand(product: GroupedProduct): number {
  const evalProductPrice = (p: ProductInterface) => {
    const { regular, special } = getProductPrice(p);

    return regular > special && special !== null ? special : regular;
  };

  return product.items?.reduce(
    (acc, curr) => curr.qty * evalProductPrice(curr.product) + acc,
    0,
  ) ?? 0;
}
