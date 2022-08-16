<template>
  <div class="product">
    <SfLoader
      class="loading--product-gallery"
      :loading="isFetching"
    >
      <SfGallery
        :images="productGallery"
        :image-width="imageSizes.productGallery.imageWidth"
        :image-height="imageSizes.productGallery.imageHeight"
        :thumb-width="imageSizes.productGallery.thumbWidth"
        :thumb-height="imageSizes.productGallery.thumbHeight"
        :enable-zoom="true"
        image-tag="nuxt-img"
        thumb-image-tag="nuxt-img"
        class="product__gallery"
        :nuxt-img-config="{
          fit: 'cover',
        }"
        :thumb-nuxt-img-config="{
          fit: 'cover',
        }"
      />
    </SfLoader>
    <div class="product__info">
      <div class="product__header">
        <SfHeading
          :title="getProductName(product)"
          :level="3"
          class="sf-heading--no-underline sf-heading--left"
        />
        <SvgImage
          icon="drag"
          width="40"
          height="40"
          class="product__drag-icon smartphone-only"
        />
      </div>
      <div class="product__price-and-rating">
        <SfPrice
          :regular="$fc(productPrice)"
          :special="productSpecialPrice && $fc(productSpecialPrice)"
        />
        <div>
          <div class="product__rating">
            <SfRating
              :score="averageRating"
              :max="5"
            />
            <a
              v-if="!!totalReviews"
              href="#"
              class="product__count"
            >
              ({{ totalReviews }})
            </a>
          </div>
          <SfButton
            class="sf-button--text"
            @click="setActiveTab(TabsConfig.reviews.ID)"
          >
            {{ $t('Read all reviews') }}
          </SfButton>
          |
          <SfButton
            class="sf-button--text"
            @click="openNewReviewTab"
          >
            {{ $t('Add a review') }}
          </SfButton>
        </div>
      </div>
      <div v-if="product !== null ">
        <HTMLContent
          v-if="productShortDescription"
          :content="productShortDescription"
          tag="p"
          class="product__description desktop-only"
        />
        <SfAddToCart
          v-model="qty"
          v-e2e="'product_add-to-cart'"
          :disabled="isCartLoading || !canAddToCart(product, qty) || isFetching"
          class="product__add-to-cart"
          @click="addItem({ product, quantity: parseInt(qty) })"
        >
          <template #add-to-cart-btn>
            <SfButton
              class="sf-add-to-cart__button"
              :disabled="isCartLoading || !canAddToCart(product, qty) || isFetching"
              @click="addItem({ product, quantity: parseInt(qty) })"
            >
              {{ $t('Add to cart') }}
            </SfButton>
          </template>
        </SfAddToCart>
        <SfAlert
          :style="{ visibility: !!addToCartError ? 'visible' : 'hidden'}"
          class="product__add-to-cart-error"
          :message="$t(addToCartError)"
          type="danger"
        />
        <div class="product__additional-actions">
          <AddToWishlist
            :is-in-wishlist="isInWishlist"
            :is-show="isAuthenticated"
            @addToWishlist="addItemToWishlist({product})"
          />
        </div>
      </div>
      <LazyHydrate when-idle>
        <ProductTabs
          :product="product"
          :open-tab="activeTab"
          @changeTab="setActiveTab($event)"
        />
      </LazyHydrate>
    </div>
  </div>
</template>
<script lang="ts">
import LazyHydrate from 'vue-lazy-hydration';
import {
  SfAddToCart,
  SfButton,
  SfGallery,
  SfHeading,
  SfLoader,
  SfPrice,
  SfRating,
  SfAlert,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  defineComponent,
  PropType,
  toRef,
} from '@nuxtjs/composition-api';

import {
  getName as getProductName,
  getPrice as getProductPrice,
} from '~/modules/catalog/product/getters/productGetters';

import {
  getTotalReviews,
  getAverageRating,
} from '~/modules/review/getters/reviewGetters';

import useWishlist from '~/modules/wishlist/composables/useWishlist';
import SvgImage from '~/components/General/SvgImage.vue';
import HTMLContent from '~/components/HTMLContent.vue';
import AddToWishlist from '~/components/AddToWishlist.vue';
import { useUser } from '~/modules/customer/composables/useUser';
import { Product } from '~/modules/catalog/product/types';
import { useCart } from '~/modules/checkout/composables/useCart';
import ProductTabs from '~/modules/catalog/product/components/tabs/ProductTabs.vue';
import { useProductGallery } from '~/modules/catalog/product/composables/useProductGallery';
import { TabsConfig, useProductTabs } from '~/modules/catalog/product/composables/useProductTabs';

export default defineComponent({
  name: 'SimpleProduct',
  components: {
    HTMLContent,
    LazyHydrate,
    SfAddToCart,
    SfButton,
    SfGallery,
    SfHeading,
    SfLoader,
    SfPrice,
    SfRating,
    SfAlert,
    AddToWishlist,
    SvgImage,
    ProductTabs,
  },
  transition: 'fade',
  props: {
    product: {
      type: [Object, null] as PropType<Product>,
      default: null,
    },
    isFetching: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const qty = ref(1);
    const product = toRef(props, 'product');
    const {
      addItem, error: cartError, loading: isCartLoading, canAddToCart,
    } = useCart();
    const { productGallery, imageSizes } = useProductGallery(product);
    const { isAuthenticated } = useUser();
    const { addOrRemoveItem, isInWishlist } = useWishlist();
    const { activeTab, setActiveTab, openNewReviewTab } = useProductTabs();

    const productShortDescription = computed(
      () => props.product?.short_description?.html || '',
    );

    const productPrice = computed(() => getProductPrice(props.product).regular);
    const productSpecialPrice = computed(() => getProductPrice(props.product).special);
    const totalReviews = computed(() => getTotalReviews(props.product));
    const averageRating = computed(() => getAverageRating(props.product));
    const addToCartError = computed(() => cartError.value?.addItem?.message);

    return {
      addItem,
      addItemToWishlist: addOrRemoveItem,
      averageRating,
      totalReviews,
      canAddToCart,
      isAuthenticated,
      isInWishlist: computed(() => isInWishlist({ product: props.product })),
      isCartLoading,
      productShortDescription,
      productGallery,
      getProductName,
      productPrice,
      productSpecialPrice,
      qty,
      imageSizes,
      setActiveTab,
      openNewReviewTab,
      activeTab,
      TabsConfig,
      addToCartError,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '../styles.scss';
</style>
