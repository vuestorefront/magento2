<template>
  <div id="product">
    <SfLoader
      :class="{ 'loading--product': productDataIsLoading }"
      :loading="productDataIsLoading"
    >
      <div>
        <SfBreadcrumbs
          class="breadcrumbs desktop-only"
          :breadcrumbs="breadcrumbs"
        />
        <div
          class="product"
        >
          <LazyHydrate when-idle>
            <SfLoader
              :class="{ 'loading--product-gallery': productLoading }"
              :loading="productLoading"
            >
              <SfGallery
                :images="productGallery"
                :enable-zoom="true"
                class="product__gallery"
              />
            </SfLoader>
          </LazyHydrate>
          <div class="product__info">
            <div class="product__header">
              <SfHeading
                :title="productGetters.getName(product)"
                :level="3"
                class="sf-heading--no-underline sf-heading--left"
              />
              <SfIcon
                icon="drag"
                size="xxl"
                color="var(--c-text-disabled)"
                class="product__drag-icon smartphone-only"
              />
            </div>
            <div class="product__price-and-rating">
              <SfPrice
                :regular="$n(productPrice, 'currency')"
                :special="productSpecialPrice && $n(productSpecialPrice, 'currency')"
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
            <div>
              <p
                v-if="productShortDescription"
                v-dompurify-html="productShortDescription"
                class="product__description desktop-only"
              />
              <SfButton class="sf-button--text desktop-only product__guide">
                {{ $t('Size guide') }}
              </SfButton>
              <template
                v-for="option in configurableOptions"
              >
                <div
                  v-if="option.attribute_code === 'color'"
                  :key="option.uid"
                  class="product__colors desktop-only"
                >
                  <p class="product__color-label">
                    {{ option.label }}:
                  </p>
                  <SfColor
                    v-for="color in option.values"
                    :key="color.uid"
                    :color="productGetters.getSwatchData(color.swatch_data)"
                    :selected="productConfiguration[option.attribute_uid] === color.uid"
                    class="product__color"
                    @click="() => updateProductConfiguration(option.attribute_uid, color.uid)"
                  />
                </div>
                <SfSelect
                  v-else
                  :key="option.uid"
                  :value="productConfiguration[option.attribute_uid]"
                  :label="option.label"
                  class="sf-select--underlined product__select-size"
                  :required="true"
                  @input="($event) => updateProductConfiguration(option.attribute_uid, $event)"
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
              <template
                v-if="product.__typename === 'GroupedProduct'"
              >
                <grouped-product-selector
                  :can-add-to-cart="canAddToCart"
                  @update-price="basePrice = $event"
                />
              </template>
              <template
                v-else-if="product.__typename === 'BundleProduct'"
              >
                <BundleProductSelector
                  :can-add-to-cart="canAddToCart"
                  @update-price="basePrice = $event"
                />
              </template>
              <SfAddToCart
                v-else
                v-model="qty"
                v-e2e="'product_add-to-cart'"
                :disabled="loading || !canAddToCart"
                class="product__add-to-cart"
                @click="addItem({ product, quantity: parseInt(qty) })"
              />
            </div>
            <LazyHydrate when-idle>
              <SfTabs
                id="tabs"
                :open-tab="openTab"
                class="product__tabs"
                @click:tab="changeTab"
              >
                <SfTab title="Description">
                  <div
                    v-if="productDescription"
                    v-dompurify-html="productDescription"
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
                      <SfButton class="product__property__button sf-button&#45;&#45;text">
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
                    :key="reviewGetters.getReviewId(review)"
                    :author="reviewGetters.getReviewAuthor(review)"
                    :date="reviewGetters.getReviewDate(review)"
                    :message="reviewGetters.getReviewMessage(review)"
                    :max-rating="5"
                    :rating="reviewGetters.getReviewRating(review)"
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
          v-if="relatedProducts.length > 0"
          when-visible
        >
          <ProductsCarousel
            :products="relatedProducts"
            :title="$t('Match it with')"
          />
        </LazyHydrate>
        <LazyHydrate
          v-if="upsellProducts.length > 0"
          when-visible
        >
          <ProductsCarousel
            :products="upsellProducts"
            :title="$t('Other products you might like')"
          />
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
<script>
import LazyHydrate from 'vue-lazy-hydration';
import {
  SfAddToCart,
  SfBreadcrumbs,
  SfButton,
  SfColor,
  SfGallery,
  SfHeading,
  SfIcon,
  SfLoader,
  SfPrice,
  SfRating,
  SfReview,
  SfSelect,
  SfTabs,
} from '@storefront-ui/vue';
import {
  useProduct,
  useCart,
  productGetters,
  useReview,
  reviewGetters,
  useUser,
  useWishlist,
} from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';
import { ref, computed } from '@vue/composition-api';
import { useVueRouter } from '~/helpers/hooks/useVueRouter';
import { productData } from '~/helpers/product/productData';
import cacheControl from '~/helpers/cacheControl';
import BundleProductSelector from '~/components/Products/BundleProductSelector';
import GroupedProductSelector from '~/components/Products/GroupedProductSelector';
import InstagramFeed from '~/components/InstagramFeed.vue';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import ProductAddReviewForm from '~/components/ProductAddReviewForm.vue';
import ProductsCarousel from '~/components/ProductsCarousel.vue';

export default {
  name: 'Product',
  components: {
    GroupedProductSelector,
    BundleProductSelector,
    InstagramFeed,
    LazyHydrate,
    MobileStoreBanner,
    ProductAddReviewForm,
    ProductsCarousel,
    SfAddToCart,
    SfBreadcrumbs,
    SfButton,
    SfColor,
    SfGallery,
    SfHeading,
    SfIcon,
    SfLoader,
    SfPrice,
    SfRating,
    SfReview,
    SfSelect,
    SfTabs,
  },
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5,
  }),
  transition: 'fade',
  setup(props, context) {
    const qty = ref(1);
    const { product, id } = productData();
    const { route, router } = useVueRouter();
    const { search, loading: productLoading } = useProduct(`product-${id}`);
    const { addItem, loading } = useCart();
    const {
      reviews: productReviews,
      search: searchReviews,
      loading: reviewsLoading,
      addReview,
    } = useReview(`productReviews-${id}`);
    const { isAuthenticated } = useUser();
    const { isInWishlist, addItem: addToWishlist } = useWishlist();
    const basePrice = ref(0);
    const openTab = ref(1);
    const productDataIsLoading = computed(() => productLoading.value && !productGetters.getName(product.value));
    const productShortDescription = computed(() => product.value.short_description?.html || '');
    const productDescription = computed(() => product.value.description?.html || '');
    const canAddToCart = computed(() => {
      // eslint-disable-next-line no-underscore-dangle
      if (product.value.__typename === 'ConfigurableProduct') {
        return !!product.value.configurable_product_options_selection?.variant?.uid;
      }
      const inStock = product.value.stock_status || '';
      const stockLeft = product.value.only_x_left_in_stock === null ? true : qty.value <= product.value.only_x_left_in_stock;
      return inStock && stockLeft;
    });
    const categories = computed(() => productGetters.getCategoryIds(product.value));
    const relatedProducts = computed(() => productGetters.getProductRelatedProduct(product.value));
    const upsellProducts = computed(() => productGetters.getProductUpsellProduct(product.value));
    const baseReviews = computed(() => (Array.isArray(productReviews.value)
      ? [...productReviews.value].shift()
      : productReviews.value));
    const reviews = computed(() => reviewGetters.getItems(baseReviews.value));
    const totalReviews = computed(() => reviewGetters.getTotalReviews(baseReviews.value));
    const averageRating = computed(() => reviewGetters.getAverageRating(baseReviews.value));
    const breadcrumbs = computed(() => {
      const productCategories = product.value.categories;
      return productGetters.getBreadcrumbs(product.value,
        Array.isArray(productCategories) ? [...productCategories].pop() : []);
    });
    const productGallery = computed(() => productGetters.getGallery(product.value)
      .map((img) => ({
        mobile: { url: img.small },
        desktop: { url: img.normal },
        big: { url: img.big },
        // eslint-disable-next-line no-underscore-dangle
        alt: product.value._name || product.value.name,
      })));

    const configurableOptions = computed(() => product.value.configurable_options);
    const productConfiguration = ref({});
    const productTypedPrice = computed(() => {
      // eslint-disable-next-line no-underscore-dangle
      switch (product.value.__typename) {
        case 'BundleProduct':
          return basePrice.value;
        case 'GroupedProduct':
          return basePrice.value;
        default:
          return 0;
      }
    });
    const productPrice = computed(() => productTypedPrice.value || productGetters.getPrice(product.value).regular);
    const productSpecialPrice = computed(() => {
      // eslint-disable-next-line no-underscore-dangle
      switch (product.value.__typename) {
        case 'SimpleProduct':
        default:
          return productGetters.getPrice(product.value).special;
      }
    });

    const addItemToWishlist = async () => {
      await addToWishlist({ product: product.value });
    };
    const changeTab = (tabNumber, callback) => {
      document
        .querySelector('#tabs')
        .scrollIntoView({ behavior: 'smooth', block: 'end' });
      openTab.value = tabNumber;
      if (callback && typeof callback === 'function') callback();
    };
    const changeNewReview = () => {
      changeTab(2, () => {
        setTimeout(() => document
          .querySelector('#addReview')
          .scrollIntoView({ behavior: 'smooth', block: 'end' }), 500);
      });
    };
    const successAddReview = async (reviewData) => {
      await addReview(reviewData);
      document
        .querySelector('#tabs')
        .scrollIntoView({ behavior: 'smooth', block: 'end' });
    };
    const updateProductConfiguration = async (label, value) => {
      productConfiguration.value[label] = value;
      const configurations = Object.entries(productConfiguration.value).map((config) => config[1]);
      await search({
        queryType: 'DETAIL',
        filter: {
          sku: {
            eq: id,
          },
        },
        configurations,
      });
      router.push({
        path: route.fullPath,
        query: productConfiguration.value,
      });
    };
    const loadProductConfiguration = () => {
      const { query } = route;
      productConfiguration.value = query;
    };

    onSSR(async () => {
      const baseSearchQuery = {
        filter: {
          sku: {
            eq: id,
          },
        },
      };
      await search({
        queryType: 'DETAIL',
        ...baseSearchQuery,
      });
      await searchReviews({ ...baseSearchQuery });
      loadProductConfiguration();

      if (product?.value?.length === 0) context.root.$nuxt.error({ statusCode: 404 });
    });

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
      productConfiguration,
      productDataIsLoading,
      productDescription,
      productGallery,
      productGetters,
      productLoading,
      productPrice,
      productReviews,
      productShortDescription,
      productSpecialPrice,
      qty,
      relatedProducts,
      reviewGetters,
      reviews,
      reviewsLoading,
      successAddReview,
      totalReviews,
      updateProductConfiguration,
      upsellProducts,
    };
  },
};
</script>
<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.product-loader {
  height: 38px;
  margin: var(--spacer-base) auto var(--spacer-lg)
}

.product {
  @include for-desktop {
    display: flex;
  }

  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
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

  &__gallery {
    flex: 1;
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
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
    @include for-desktop {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;
    }
  }
}
</style>
