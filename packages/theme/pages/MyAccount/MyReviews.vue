<template>
  <SfTabs
    :open-tab="1"
    class="tab-orphan"
  >
    <SfTab title="My reviews">
      <div v-if="loading">
        <SfLoader />
      </div>
      <SfReview
        v-for="review in userReviews"
        v-else
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
      >
        <template #info="{ rating, maxRating, date }">
          <div class="sf-review__info">
            <div :class="{ 'sf-review__rating': rating > 0 && maxRating > 0 }">
              <span class="sf-review__product">
                {{ reviewGetters.getProductName(review) }} -
              </span>
              <SfRating
                v-if="rating"
                :max="maxRating"
                :score="rating"
              />
            </div>
            <div class="sf-review__date">
              {{ date }}
            </div>
          </div>
        </template>
      </SfReview>
    </SfTab>
  </SfTabs>
</template>

<script>
import {
  SfTabs,
  SfLoader,
  SfReview,
  SfRating,
} from '@storefront-ui/vue';
import { reviewGetters, useReview } from '@vue-storefront/magento';
import { computed, defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'MyReviews',
  components: {
    SfLoader,
    SfReview,
    SfTabs,
    SfRating,
  },
  setup() {
    const {
      reviews,
      loading,
      loadCustomerReviews,
    } = useReview('productReviews-my-reviews');

    // @ts-ignore
    const userReviews = computed(() => reviewGetters.getItems(reviews.value));

    onBeforeMount(async () => {
      await loadCustomerReviews();
    });

    return {
      reviewGetters,
      userReviews,
      loading,
      loadCustomerReviews,
    };
  },
});
</script>

<style lang='scss' scoped>
.tab-orphan {
  @include for-mobile {
    --tabs-title-display: none;
    --tabs-content-padding: 0;
    --tabs-conent-border-width: 0;
  }
}

.message {
  margin: 0 0 var(--spacer-2xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--primary);

  &__link {
    color: var(--c-primary);
    --link-weight: var(--font-weight--medium);
    --link-font-family: var(--font-family--primary);
    --link-font-size: var(--font-size--base);
    text-decoration: none;

    &:hover {
      color: var(--c-text);
    }
  }
}
.sf-review__rating{
  width: 100%;
  display: flex;
  align-items: center;
}

.sf-review__product {
  font-size: var(--font-size--sm);
  margin-right: 5px;
}
</style>
