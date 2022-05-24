<template>
  <div>
    <SfList class="grouped_items">
      <SfListItem
        v-for="(groupedItem, index) in groupedItems"
        :key="index"
        class="grouped_items--item"
      >
        <SfImage
          image-tag="nuxt-img"
          :src="
            getMagentoImage(
              getProductThumbnailImage(groupedItem.product)
            )
          "
          :alt="getProductName(groupedItem.product)"
          :width="60"
          :height="60"
        />
        <div>
          <p>{{ getProductName(groupedItem.product) }}</p>
          <SfPrice
            :regular="$fc(getProductPrice(groupedItem.product).regular)"
            :special="
              getProductPrice(groupedItem.product).special &&
                $fc(getProductPrice(groupedItem.product).special)
            "
          />
        </div>
        <SfQuantitySelector
          v-model="groupedItem.qty"
          :disabled="loading || !canAddToCart"
        />
      </SfListItem>
    </SfList>
    <SfButton
      v-e2e="'product_add-to-cart'"
      :disabled="loading || !canAddToCart"
      class="color-primary sf-button grouped_items--add-to-cart"
      @click="addToCart"
    >
      Add to Cart
    </SfButton>
  </div>
</template>
<script lang="ts">
import {
  SfList,
  SfPrice,
  SfButton,
  SfQuantitySelector,
  SfImage,
} from '@storefront-ui/vue';
import {
  computed, watch, ref, defineComponent, PropType,
} from '@nuxtjs/composition-api';

import {
  getGroupedProducts,
  getName as getProductName,
  getPrice as getProductPrice,
  getProductThumbnailImage,
} from '~/modules/catalog/product/getters/productGetters';

import { useCart, useImage } from '~/composables';
import type { WithTypename } from '~/modules/catalog/product/types';
import type { GroupedProduct, ProductInterface } from '~/modules/GraphQL/types';

export default defineComponent({
  name: 'GroupedProductSelector',
  components: {
    SfList,
    SfPrice,
    SfButton,
    SfQuantitySelector,
    SfImage,
  },
  props: {
    canAddToCart: {
      type: Boolean,
      required: false,
      default: true,
    },
    product: {
      type: Object as PropType<WithTypename<GroupedProduct>>,
      required: true,
    },
  },
  emits: ['update-price'],
  setup(props, { emit }) {
    const { addItem } = useCart();
    const loading = ref(false);
    const groupedItems = computed(() => getGroupedProducts(props.product));
    const addToCart = async () => {
      try {
        loading.value = true;

        const groupedItemsFiltered = groupedItems.value.filter((p) => p.qty);
        if (groupedItemsFiltered.length > 0) {
          // eslint-disable-next-line no-restricted-syntax
          for (const p of groupedItemsFiltered) {
            // eslint-disable-next-line no-await-in-loop
            await addItem({ product: p.product, quantity: p.qty });
          }
        }
        loading.value = false;
      } catch {
        loading.value = false;
      }
    };

    watch(
      groupedItems,
      (newValue) => {
        const evalProductPrice = (p: ProductInterface) => {
          const { regular, special } = getProductPrice(p);

          return regular > special ? regular : special;
        };

        const price = newValue.reduce(
          (acc, curr) => curr.qty * evalProductPrice(curr.product) + acc,
          0,
        );

        emit('update-price', price);
      },
      {
        deep: true,
      },
    );

    const { getMagentoImage } = useImage();

    return {
      addToCart,
      groupedItems,
      loading,
      getMagentoImage,
      getProductName,
      getProductPrice,
      getProductThumbnailImage,
    };
  },
});
</script>
<style lang="scss">
.grouped_items {
  padding: 0 10px;

  &--item {
    display: grid;
    grid-template-columns: fit-content(70px) auto fit-content(100%);
    grid-template-rows: auto;
    align-items: center;
    justify-items: start;
    column-gap: var(--spacer-base);
    padding: var(--spacer-base) 0;
    border-bottom: 1px solid var(--c-text-muted);

    .sf-quantity-selector {
      justify-self: end;
    }
  }

  &--add-to-cart {
    width: 100%;
    margin-top: var(--spacer-lg);
  }
}
</style>
