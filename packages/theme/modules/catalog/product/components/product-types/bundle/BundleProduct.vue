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
        <div class="product__price">
          <span class="product__price-label">{{ $t('From') }}</span>
          <SfPrice
            :regular="$fc(productPrices.regular)"
            :special="productPrices.special && $fc(productPrices.special)"
          />
          <span class="product__price-label">{{ $t('To') }}</span>
          <SfPrice
            :regular="$fc(productPrices.maximum)"
          />
          <div v-if="customizationPrice">
            <span class="product__price-label">{{ $t('Your customization') }}</span>
            <SfPrice
              :regular="$fc(customizationPrice)"
            />
          </div>
        </div>
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
        <BundleProductSelector
          v-if="productPrices.regular"
          :can-add-to-cart="canAddToCart(product, qty)"
          :product="product"
          @update-price="customizationPrice = $event"
        />
        <div v-else>
          <BundleProductOptionSkeleton />
          <BundleProductOptionSkeleton />
          <BundleProductOptionSkeleton />
        </div>
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
  SfButton,
  SfGallery,
  SfHeading,
  SfLoader,
  SfPrice,
  SfRating,
} from '@storefront-ui/vue';

import {
  ref,
  computed,
  defineComponent,
  PropType, toRef,
} from '@nuxtjs/composition-api';

import {
  getSwatchData as getProductSwatchData,
  getName as getProductName,
  getPrice as getProductPrice,
} from '~/modules/catalog/product/getters/productGetters';

import {
  getTotalReviews,
  getAverageRating,
} from '~/modules/review/getters/reviewGetters';

import { useCart } from '~/modules/checkout/composables/useCart';
import useWishlist from '~/modules/wishlist/composables/useWishlist';
import BundleProductSelector from '~/modules/catalog/product/components/product-types/bundle/BundleProductSelector.vue';
import SvgImage from '~/components/General/SvgImage.vue';
import HTMLContent from '~/components/HTMLContent.vue';
import AddToWishlist from '~/components/AddToWishlist.vue';
import { useUser } from '~/modules/customer/composables/useUser';
import ProductTabs from '~/modules/catalog/product/components/tabs/ProductTabs.vue';
import { useProductGallery } from '~/modules/catalog/product/composables/useProductGallery';
import { Product } from '~/modules/catalog/product/types';
import { TabsConfig, useProductTabs } from '~/modules/catalog/product/composables/useProductTabs';
import BundleProductOptionSkeleton
  from '~/modules/catalog/product/components/product-types/bundle/BundleProductOptionSkeleton.vue';

export default defineComponent({
  name: 'BundleProduct',
  components: {
    BundleProductOptionSkeleton,
    BundleProductSelector,
    HTMLContent,
    LazyHydrate,
    SfButton,
    SfGallery,
    SfHeading,
    SfLoader,
    SfPrice,
    SfRating,
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
    const { addItem, canAddToCart } = useCart();
    const { productGallery, imageSizes } = useProductGallery(product);
    const { activeTab, setActiveTab, openNewReviewTab } = useProductTabs();
    const { isAuthenticated } = useUser();
    const { addOrRemoveItem, isInWishlist } = useWishlist();
    const productShortDescription = computed(
      () => props.product?.short_description?.html || '',
    );

    const productDescription = computed(
      () => props.product?.description?.html || '',
    );

    const productPrices = computed(() => getProductPrice(props.product));
    const customizationPrice = ref(productPrices.value.special ?? productPrices.value.regular);
    const totalReviews = computed(() => getTotalReviews(props.product));
    const averageRating = computed(() => getAverageRating(props.product));

    return {
      addItem,
      addItemToWishlist: addOrRemoveItem,
      averageRating,
      canAddToCart,
      isAuthenticated,
      isInWishlist: computed(() => isInWishlist({ product: props.product })),
      productDescription,
      productGallery,
      getProductName,
      getProductSwatchData,
      productPrices,
      customizationPrice,
      productShortDescription,
      qty,
      totalReviews,
      imageSizes,
      setActiveTab,
      openNewReviewTab,
      activeTab,
      TabsConfig,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '../styles.scss';

.product__price {
  &-label {
    display: flex;
    margin: var(--spacer-xs) 0 0 0;
  }
}
</style>
