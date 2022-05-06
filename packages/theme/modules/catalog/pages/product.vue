<template>
  <div id="product">
    <SfLoader
      class="loading--product"
      :loading="productDataIsLoading"
    >
      <div>
        <SfBreadcrumbs
          class="breadcrumbs desktop-only"
          :breadcrumbs="breadcrumbs"
        />
        <div class="product">
          <SfLoader
            class="loading--product-gallery"
            :loading="fetchProductsState.pending"
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
                  @click="changeTab(2)"
                >
                  {{ $t('Read all reviews') }}
                </SfButton>
                |
                <SfButton
                  class="sf-button--text"
                  @click="changeNewReview"
                >
                  Add a review
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
              <template v-for="option in configurableOptions">
                <div
                  v-if="option.attribute_code === 'color'"
                  :key="option.uid"
                  class="product__colors"
                >
                  <p class="product__color-label">
                    {{ option.label }}:
                  </p>
                  <SfColor
                    v-for="color in option.values"
                    :key="color.uid"
                    :color="getProductSwatchData(color.swatch_data)"
                    :selected="
                      productConfiguration[option.attribute_uid] === color.uid
                    "
                    class="product__color"
                    @click="
                      () =>
                        updateProductConfiguration(
                          option.attribute_uid,
                          color.uid
                        )
                    "
                  />
                </div>
                <SfSelect
                  v-else
                  :key="option.uid"
                  :value="productConfiguration[option.attribute_uid]"
                  :label="option.label"
                  class="sf-select--underlined product__select-size"
                  :required="true"
                  @input="
                    ($event) =>
                      updateProductConfiguration(option.attribute_uid, $event)
                  "
                >
                  <SfSelectOption
                    v-for="attribute in option.values"
                    :key="attribute.uid"
                    :value="attribute.uid"
                  >
                    {{ attribute.label }}
                  </SfSelectOption>
                </SfSelect>
              </template>
              <template v-if="product.__typename === 'GroupedProduct'">
                <grouped-product-selector
                  :can-add-to-cart="canAddToCart"
                  :product="product"
                  @update-price="basePrice = $event"
                />
              </template>
              <template v-else-if="product.__typename === 'BundleProduct'">
                <BundleProductSelector
                  :can-add-to-cart="canAddToCart"
                  :product="product"
                  @update-price="basePrice = $event"
                />
              </template>
              <SfAddToCart
                v-else
                v-model="qty"
                v-e2e="'product_add-to-cart'"
                :disabled="loading || !canAddToCart || productLoading"
                class="product__add-to-cart"
                @click="addItem({ product, quantity: parseInt(qty) })"
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
              <SfTabs
                id="tabs"
                :open-tab="openTab"
                class="product__tabs"
                @click:tab="changeTab"
              >
                <SfTab title="Description">
                  <HTMLContent
                    v-if="productDescription"
                    :content="productDescription"
                    tag="div"
                    class="product__description"
                  />
                  <!-- @TODO: Check Property in Configurable Products              -->
                  <!--              <SfProperty
                    v-for="(property, i) in properties"
                    :key="i"
                    :name="property.name"
                    :value="property.value"
                    class="product__property"
                  >
                    <template
                      v-if="property.name === 'Category'"
                      #value
                    >
                      <SfButton class="product__property__button sf-button--text">
                        {{ property.value }}
                      </SfButton>
                    </template>
                  </SfProperty>-->
                </SfTab>
                <SfTab title="Read reviews">
                  <div v-show="reviewsLoading">
                    <SfLoader />
                  </div>
                  <SfReview
                    v-for="review in reviews"
                    v-show="!reviewsLoading"
                    :key="getReviewId(review)"
                    :author="getReviewAuthor(review)"
                    :date="getReviewDate(review)"
                    :message="getReviewMessage(review)"
                    :max-rating="5"
                    :rating="getReviewRating(review)"
                    :char-limit="250"
                    read-more-text="Read more"
                    hide-full-text="Read less"
                    class="product__review"
                  />
                  <div
                    v-show="!reviewsLoading"
                    id="addReview"
                  >
                    <ProductAddReviewForm
                      @add-review="successAddReview"
                    />
                  </div>
                </SfTab>
                <SfTab
                  title="Additional Information"
                  class="product__additional-info"
                >
                  <div class="product__additional-info">
                    <p class="product__additional-info__title">
                      {{ $t('Instruction1') }}
                    </p>
                    <p class="product__additional-info__paragraph">
                      {{ $t('Instruction2') }}
                    </p>
                    <p class="product__additional-info__paragraph">
                      {{ $t('Instruction3') }}
                    </p>
                  </div>
                </SfTab>
              </SfTabs>
            </LazyHydrate>
          </div>
        </div>
        <LazyHydrate
          when-visible
        >
          <RelatedProducts />
        </LazyHydrate>
        <LazyHydrate
          when-visible
        >
          <UpsellProducts />
        </LazyHydrate>
      </div>
    </SfLoader>
    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <MobileStoreBanner />
    </LazyHydrate>
  </div>
</template>
<script lang="ts">
import LazyHydrate from 'vue-lazy-hydration';
import {
  SfAddToCart,
  SfBreadcrumbs,
  SfButton,
  SfColor,
  SfGallery,
  SfHeading,
  SfLoader,
  SfPrice,
  SfRating,
  SfReview,
  SfSelect,
  SfTabs,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  useContext,
  useRoute,
  useRouter,
  defineComponent,
  useFetch,
} from '@nuxtjs/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';

import {
  getSwatchData as getProductSwatchData,
  getName as getProductName,
  getCategoryIds,
  getBreadcrumbs,
  getGallery as getProductGallery,
  getPrice as getProductPrice,
} from '~/modules/catalog/product/getters/productGetters';

import reviewGetters, {
  getReviewId,
  getReviewAuthor,
  getReviewDate,
  getReviewMessage,
  getReviewRating,
} from '~/getters/reviewGetters';

import {
  useCart, useReview,
} from '~/composables';
import useWishlist from '~/modules/wishlist/composables/useWishlist';
import { useProduct } from '~/modules/catalog/product/composables/useProduct';
import type { Product } from '~/modules/catalog/product/types';

import BundleProductSelector from '~/modules/catalog/product/components/BundleProductSelector.vue';
import GroupedProductSelector from '~/modules/catalog/product/components/GroupedProductSelector.vue';
import UpsellProducts from '~/modules/catalog/product/components/UpsellProducts.vue';
import RelatedProducts from '~/modules/catalog/product/components/RelatedProducts.vue';

import InstagramFeed from '~/components/InstagramFeed.vue';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import ProductAddReviewForm from '~/components/ProductAddReviewForm.vue';
import SvgImage from '~/components/General/SvgImage.vue';
import HTMLContent from '~/components/HTMLContent.vue';
import AddToWishlist from '~/components/AddToWishlist.vue';
import { useImage } from '~/composables/useImage';
import { useUser } from '~/modules/customer/composables/useUser';

export default defineComponent({
  name: 'ProductPage',
  components: {
    BundleProductSelector,
    GroupedProductSelector,
    HTMLContent,
    InstagramFeed,
    LazyHydrate,
    MobileStoreBanner,
    ProductAddReviewForm,
    RelatedProducts,
    SfAddToCart,
    SfBreadcrumbs,
    SfButton,
    SfColor,
    SfGallery,
    SfHeading,
    SfLoader,
    SfPrice,
    SfRating,
    SfReview,
    SfSelect,
    SfTabs,
    AddToWishlist,
    SvgImage,
    UpsellProducts,
  },
  transition: 'fade',
  setup() {
    const { addTags } = useCache();
    const qty = ref(1);
    const product = ref<Product | null>(null);
    const { getMagentoImage, imageSizes } = useImage();
    const route = useRoute();
    const router = useRouter();
    const { getProductDetails, loading: productLoading } = useProduct();
    const { addItem, loading } = useCart();

    const {
      search: searchReviews,
      loading: reviewsLoading,
      addReview,
    } = useReview();

    const { isAuthenticated } = useUser();
    const { addItem: addItemToWishlist, isInWishlist } = useWishlist();
    const { error: nuxtError, app } = useContext();
    const basePrice = ref(0);
    const openTab = ref(1);
    const productDataIsLoading = computed(
      () => productLoading.value && !getProductName(product.value),
    );
    const productShortDescription = computed(
      () => product.value?.short_description?.html || '',
    );
    const productDescription = computed(
      () => product.value?.description?.html || '',
    );
    const canAddToCart = computed(() => {
      // eslint-disable-next-line no-underscore-dangle
      if (product.value?.__typename === 'ConfigurableProduct') {
        return !!product.value?.configurable_product_options_selection?.variant
          ?.uid;
      }
      const inStock = product.value?.stock_status || '';
      const stockLeft = product.value?.only_x_left_in_stock === null
        ? true
        : qty.value <= product.value?.only_x_left_in_stock;
      return inStock && stockLeft;
    });
    const categories = computed(() => getCategoryIds(product.value));

    const reviews = ref(null);
    const totalReviews = ref(null);
    const averageRating = ref(null);

    const breadcrumbs = computed(() => {
      const productCategories = product.value?.categories ?? [];
      return getBreadcrumbs(
        product.value,
        Array.isArray(productCategories) ? [...productCategories].pop() : null,
      );
    });
    const productGallery = computed(() => getProductGallery(product.value).map((img) => ({
      mobile: { url: getMagentoImage(img.small) },
      desktop: { url: getMagentoImage(img.normal) },
      big: { url: getMagentoImage(img.big) },
      // eslint-disable-next-line no-underscore-dangle
      alt: product.value.name,
    })));

    const configurableOptions = computed(
      () => product.value?.configurable_options ?? {},
    );
    const productConfiguration = ref(Object.entries(route.value.query));
    const productTypedPrice = computed(() => {
      // eslint-disable-next-line no-underscore-dangle
      switch (product.value?.__typename) {
        case 'BundleProduct':
          return basePrice.value;
        case 'GroupedProduct':
          return basePrice.value;
        default:
          return 0;
      }
    });
    const productPrice = computed(
      () => productTypedPrice.value
        || getProductPrice(product.value).regular,
    );
    const productSpecialPrice = computed(() => {
      // eslint-disable-next-line no-underscore-dangle
      switch (product.value?.__typename) {
        case 'SimpleProduct':
        default:
          return getProductPrice(product.value).special;
      }
    });

    const changeTab = (tabNumber, callback) => {
      document.querySelector('#tabs').scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
      openTab.value = tabNumber;
      if (callback && typeof callback === 'function') callback();
    };

    const changeNewReview = () => {
      changeTab(2, () => {
        setTimeout(
          () => document.querySelector('#addReview').scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          }),
          500,
        );
      });
    };
    const successAddReview = async (reviewData) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await addReview(reviewData);
      document.querySelector('#tabs').scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    };

    const { params: { id } } = route.value;
    const baseSearchQuery = () => ({
      filter: {
        sku: {
          eq: id,
        },
      },
      configurations: productConfiguration.value.map(
        (config) => config[1],
      ) as string[],
    });

    const { fetch: fetchProducts, fetchState: fetchProductsState } = useFetch(async () => {
      const result = await getProductDetails({
        ...baseSearchQuery(),
      });

      product.value = result.items[0] as Product ?? null;
      if (Boolean(product?.value?.sku) === false) nuxtError({ statusCode: 404 });

      const tags = [
        {
          prefix: CacheTagPrefix.View,
          value: `product-${route.value.params.id}`,
        },
      ];

      const productTags = [{
        prefix: CacheTagPrefix.Product,
        value: product.value.uid,
      }];

      const categoriesTags = categories.value.map((catId) => ({
        prefix: CacheTagPrefix.Category,
        value: catId,
      }));

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      addTags([...tags, ...productTags, ...categoriesTags]);
    });

    useFetch(async () => {
      const productReviews = await searchReviews(baseSearchQuery());
      const baseReviews = Array.isArray(productReviews)
        ? productReviews[0]
        : productReviews;

      reviews.value = reviewGetters.getItems(baseReviews);
      totalReviews.value = reviewGetters.getTotalReviews(product.value);
      averageRating.value = reviewGetters.getAverageRating(product.value);
    });

    const updateProductConfiguration = (label: string, value: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      productConfiguration.value.push([label, value]);
      const routeData = router.resolve({
        path: `${app.localePath(window.location.pathname)}`,
        query: {
          ...Object.fromEntries(productConfiguration.value),
        },
      });

      window.history.pushState({}, null, routeData.href);

      fetchProducts();
    };
    return {
      addItem,
      addItemToWishlist,
      averageRating,
      basePrice,
      breadcrumbs,
      canAddToCart,
      categories,
      changeNewReview,
      changeTab,
      configurableOptions,
      isAuthenticated,
      isInWishlist: computed(() => isInWishlist({ product: product.value })),
      loading,
      openTab,
      product,
      productConfiguration: computed(() => Object.fromEntries(productConfiguration.value)),
      productDataIsLoading,
      productDescription,
      productGallery,
      getProductName,
      getProductSwatchData,
      productLoading,
      productPrice,
      productShortDescription,
      productSpecialPrice,
      qty,
      getReviewId,
      getReviewAuthor,
      getReviewDate,
      getReviewMessage,
      getReviewRating,
      reviews,
      reviewsLoading,
      successAddReview,
      totalReviews,
      updateProductConfiguration,
      imageSizes,
      fetchProducts,
      fetchProductsState,
    };
  },
});
</script>
<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
}

.product-loader {
  height: 38px;
  margin: var(--spacer-base) auto var(--spacer-lg);
}

.product {
  @include for-desktop {
    display: flex;
  }

  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      margin: 0;
      max-width: 32.625rem;
      padding-left: var(--spacer-lg);
      width: 100%;
    }
  }

  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }

  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
    color: var(--c-text-disabled);
  }

  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }

  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }

  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }

  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }

  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);

    @include for-mobile {
      margin-left: var(--spacer-sm);
    }
  }

  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }

  &__color {
    margin: 0 var(--spacer-2xs);
  }

  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }

  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }

  &__compare {
    margin-top: 0;
  }

  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }

  &__property {
    margin: var(--spacer-base) 0;

    &__button {
      --button-font-size: var(--font-size--base);
    }
  }

  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }

  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );

    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);

      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }

    &__paragraph {
      margin: 0;
    }
  }

  &__additional-actions {
    display: flex;
    justify-content: flex-start;
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }

  &__gallery {
    flex: 1;
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

@keyframes moveicon {

  0% {
    transform: translate3d(0, 0, 0) rotate(90deg) scale(1, -1);
  }
  50% {
    transform: translate3d(10%, 0, 0) rotate(90deg) scale(1, -1);
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(90deg) scale(1, -1);
  }
}

.loading {
  &--product {
    padding: var(--spacer-3xl) auto;
    @include for-desktop {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;
    }
  }

  &--product-gallery {
    padding: var(--spacer-3xl) auto;
    height: 700px;
    @include for-desktop {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;
    }
  }
}

</style>
