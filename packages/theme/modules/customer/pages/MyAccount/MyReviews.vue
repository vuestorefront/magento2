<template>
  <SfTabs class="tab-orphan">
    <SfTab :title="$t('My reviews')">
      <div v-if="loading">
        <SfLoader />
      </div>
      <template v-else>
        <SfReview
          v-for="review in userReviews"
          :key="reviewGetters.getReviewId(review)"
          :author="reviewGetters.getReviewAuthor(review)"
          :date="reviewGetters.getReviewDate(review)"
          :message="reviewGetters.getReviewMessage(review)"
          :max-rating="5"
          :rating="reviewGetters.getReviewRating(review)"
          :char-limit="250"
          :read-more-text="$t('Read more')"
          :hide-full-text="$t('Read less')"
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
      </template>
      <div
        v-if="userReviews.length === 0"
        class="no-reviews"
      >
        <p class="no-reviews__title">
          {{ $t('You have submitted no reviews') }}.
        </p>
      </div>
    </SfTab>
  </SfTabs>
</template>

<script lang="ts">
import {
  SfTabs, SfLoader, SfReview, SfRating,
} from '@storefront-ui/vue';
import {
  ref, computed, defineComponent, onMounted,
} from '@nuxtjs/composition-api';
import reviewGetters from '~/modules/review/getters/reviewGetters';
import { Customer } from '~/modules/GraphQL/types';
import { useReview } from '~/modules/review/composables/useReview';

export default defineComponent({
  name: 'MyReviews',
  components: {
    SfLoader,
    SfReview,
    SfTabs,
    SfRating,
  },
  setup() {
    const { loading, loadCustomerReviews } = useReview();
    const reviews = ref<Customer['reviews'] | null>(null);

    const userReviews = computed(() => reviewGetters.getItems(reviews.value));

    onMounted(async () => {
      // @ts-expect-error loadCustomerReviews type is wrong in theme and in api-client, see M2-579
      reviews.value = await loadCustomerReviews();
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

<style lang="scss" scoped>
@import '../styles/shared.scss';

.no-reviews {
  &__title {
    margin: 0 0 var(--spacer-lg) 0;
    font: var(--font-weight--normal) var(--font-size--base) / 1.6
      var(--font-family--primary);
  }
}

.sf-review__rating {
  width: 100%;
  display: flex;
  align-items: center;
}

.sf-review__product {
  font-size: var(--font-size--sm);
  margin-right: 5px;
}
</style>
