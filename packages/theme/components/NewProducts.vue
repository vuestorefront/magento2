<template>
  <SfSection class="new-products">
    <template #heading>
      <div class="heading">
        <h2 class="sf-heading__title title">
          {{ title }}
        </h2>
        <SfButton :link="localePath(link)">
          {{ buttonText }}
        </SfButton>
      </div>
    </template>
    <SfLoader
      :class="{ loading }"
      :loading="loading"
    >
      <div class="products">
        <SfProductCard
          v-for="(product, i) in mappedProducts"
          :key="i"
          class="product"
          image-tag="nuxt-img"
          :title="productGetters.getName(product)"
          :image-width="imageSizes.productCard.width"
          :image-height="imageSizes.productCard.height"
          :image="
            getMagentoImage(productGetters.getProductThumbnailImage(product))
          "
          :nuxt-img-config="{
            fit: 'cover',
          }"
          :regular-price="$fc(productGetters.getPrice(product).regular)"
          :special-price="
            productGetters.getPrice(product).special &&
              $fc(productGetters.getPrice(product).special)
          "
          :link="localePath(getProductPath(product))"
          :max-rating="5"
          :score-rating="productGetters.getAverageRating(product)"
          :reviews-count="productGetters.getTotalReviews(product)"
          :is-in-wishlist="isInWishlist({ product })"
          :is-added-to-cart="isInCart(product)"
          :wishlist-icon="isAuthenticated ? 'heart' : ''"
          :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''"
          @click:wishlist="addItemToWishlist(product)"
          @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
        />
      </div>
    </SfLoader>
  </SfSection>
</template>

<script lang="ts">
import {
  SfButton, SfLoader, SfProductCard, SfSection,
} from '@storefront-ui/vue';

import {
  computed, defineComponent, onMounted, ref,
} from '@nuxtjs/composition-api';
import {
  useImage,
  useProduct,
} from '~/composables';
import useWishlist from '~/modules/wishlist/composables/useWishlist';
import productGetters from '~/modules/catalog/product/getters/productGetters';
import { useUser } from '~/modules/customer/composables/useUser';
import { useAddToCart } from '~/helpers/cart/addToCart';
import { SortEnum } from '~/modules/GraphQL/types';

export default defineComponent({
  name: 'NewProducts',
  components: {
    SfProductCard,
    SfSection,
    SfLoader,
    SfButton,
  },
  props: {
    buttonText: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { isAuthenticated } = useUser();
    const {
      getProductList,
      loading,
      getProductPath,
    } = useProduct();
    const { isInWishlist, addOrRemoveItem } = useWishlist();
    const { addItemToCart, isInCart } = useAddToCart();
    const products = ref([]);

    const mappedProducts = computed(() => products.value.map((product) => ({
      ...product,
      isInWishlist: isInWishlist({ product }),
    })));

    const addItemToWishlist = async (product) => {
      await addOrRemoveItem({ product });
    };

    const { getMagentoImage, imageSizes } = useImage();

    onMounted(async () => {
      const newestProducts = await getProductList({
        pageSize: 4,
        currentPage: 1,
        sort: {
          position: SortEnum.Asc,
        },
      });

      if (newestProducts?.items?.length) {
        products.value = newestProducts.items;
      }
    });

    return {
      addItemToCart,
      addItemToWishlist,
      isAuthenticated,
      isInCart,
      isInWishlist,
      loading,
      mappedProducts,
      productGetters,
      getMagentoImage,
      imageSizes,
      getProductPath,
    };
  },
});
</script>

<style lang="scss" scoped>
.new-products {
  .heading {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .title {
    font-weight: var(--font-weight--semibold);
  }

  .products {
    display: flex;
    justify-content: space-between;

    @include for-mobile {
      flex-wrap: wrap;
    }

    .product {
      @include for-desktop {
        flex: 1 1 25%;
      }

      @include for-mobile {
        flex: 1 1 50%;
      }
    }
  }
}
</style>
