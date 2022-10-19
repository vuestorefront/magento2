<template>
  <div>
    <SfMegaMenu
      :visible="visible"
      :title="$t('Search results')"
      class="search"
    >
      <transition
        name="sf-fade"
        mode="out-in"
      >
        <div
          v-if="searchResults && searchResults.length > 0"
          key="results"
          class="search__wrapper-results"
        >
          <SfMegaMenuColumn
            :title="$t('Product suggestions')"
            class="sf-mega-menu-column--pined-content-on-mobile search__results"
          >
            <template #title="{ title }">
              <SfMenuItem
                :label="title"
                class="sf-mega-menu-column__header search__header"
              >
                <template #mobile-nav-icon>
                  &#8203;
                </template>
              </SfMenuItem>
            </template>
            <SfScrollable
              class="results--desktop desktop-only"
              show-text=""
              hide-text=""
            >
              <div class="results-listing">
                <SfProductCard
                  v-for="(product, index) in searchResults"
                  :key="index"
                  class="result-card"
                  image-tag="nuxt-img"
                  :regular-price="$fc(productGetters.getPrice(product).regular)"
                  :max-rating="5"
                  :score-rating="productGetters.getAverageRating(product)"
                  :reviews-count="productGetters.getTotalReviews(product)"
                  :image-width="imageSizes.productCard.width"
                  :image-height="imageSizes.productCard.height"
                  :image="
                    getMagentoImage(
                      productGetters.getProductThumbnailImage(product)
                    )
                  "
                  :nuxt-img-config="{
                    fit: 'cover',
                  }"
                  :alt="productGetters.getName(product)"
                  :title="productGetters.getName(product)"
                  :link="localePath(getProductPath(product))"
                  :wishlist-icon="false"
                />
              </div>
            </SfScrollable>
            <div class="results--mobile smartphone-only">
              <SfProductCard
                v-for="(product, index) in searchResults"
                :key="index"
                class="result-card"
                image-tag="nuxt-img"
                :regular-price="$fc(productGetters.getPrice(product).regular)"
                :max-rating="5"
                :score-rating="productGetters.getAverageRating(product)"
                :reviews-count="productGetters.getTotalReviews(product)"
                :image-width="imageSizes.productCardHorizontal.width"
                :image-height="imageSizes.productCardHorizontal.height"
                :image="
                  getMagentoImage(
                    productGetters.getProductThumbnailImage(product)
                  )
                "
                :nuxt-img-config="{
                  fit: 'cover',
                }"
                :alt="productGetters.getName(product)"
                :title="productGetters.getName(product)"
                :link="localePath(getProductPath(product))"
                :wishlist-icon="false"
              />
            </div>
          </SfMegaMenuColumn>
          <div class="action-buttons smartphone-only">
            <SfButton
              class="action-buttons__button color-light"
              @click="$emit('close')"
            >
              {{ $t('Cancel') }}
            </SfButton>
          </div>
        </div>
        <div
          v-else
          key="no-results"
          class="before-results"
        >
          <SvgImage
            icon="error_image"
            :label="$t('Error')"
            width="412"
            height="412"
            class="before-results__picture"
          />
          <p class="before-results__paragraph">
            {{ $t('You haven’t searched for items yet') }}
          </p>
          <p class="before-results__paragraph">
            {{ $t('Let’s start now – we’ll help you') }}
          </p>
          <SfButton
            class="before-results__button color-secondary smartphone-only"
            @click="$emit('close')"
          >
            {{ $t('Go back') }}
          </SfButton>
        </div>
      </transition>
    </SfMegaMenu>
  </div>
</template>
<script lang="ts">
import {
  SfMegaMenu,
  SfProductCard,
  SfScrollable,
  SfMenuItem,
  SfButton,
} from '@storefront-ui/vue';
import { defineComponent } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import productGetters from '~/modules/catalog/product/getters/productGetters';
import { useImage, useProduct } from '~/composables';
import SvgImage from '~/components/General/SvgImage.vue';
import type { Product } from '~/modules/catalog/product/types';

export default defineComponent({
  name: 'SearchResults',
  components: {
    SfMegaMenu,
    SfProductCard,
    SfScrollable,
    SfMenuItem,
    SfButton,
    SvgImage,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    searchResults: {
      type: Array as PropType<Product[] | null>,
      default: () => [],
    },
  },
  setup() {
    const { getMagentoImage, imageSizes } = useImage();
    const { getProductPath } = useProduct();

    return {
      productGetters,
      getMagentoImage,
      imageSizes,
      getProductPath,
    };
  },
});
</script>
<style lang="scss" scoped>
.search {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 3;
  --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
  --mega-menu-content-padding: 0;
  --mega-menu-height: auto;
  @include for-desktop {
    --mega-menu-content-padding: var(--spacer-xl) 0;
  }
  &__wrapper-results {
    display: flex;
    flex-direction: column;
    @include for-desktop {
      flex-direction: row;
      flex: 1;
    }
    width: 100%;
  }
  &__results {
    flex: 1;
  }
  &__header {
    margin-left: var(--spacer-sm);
  }
  ::v-deep .sf-bar {
    display: none;
  }
  ::v-deep .sf-mega-menu-column__header {
    display: none;
    @include for-desktop {
      display: flex;
    }
  }
}
.results {
  &--desktop {
    --scrollable-max-height: 35vh;
  }
  &--mobile {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background: var(--c-white);
    padding: var(--spacer-base) var(--spacer-sm);
    --product-card-max-width: 9rem;
  }
}
.see-all {
  padding: var(--spacer-xl) 0 0 var(--spacer-sm);
}
.action-buttons {
  padding: var(--spacer-xl) var(--spacer-sm) var(--spacer-3xl);
  background: var(--c-white);
  width: 100%;
  &__button {
    width: calc(100% - 32px);
  }
}
.results-listing {
  display: flex;
  flex-wrap: wrap;
  margin-left: var(--spacer-2xs);
}
.result-card {
  margin: var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-2xs) 0;
  }
}

.before-results {
  box-sizing: border-box;
  padding: var(--spacer-base) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}
</style>
