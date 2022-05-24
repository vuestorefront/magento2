<template>
  <SfTabs
    :open-tab="1"
    class="tab-orphan"
  >
    <SfTab :title="$t('My reviews')">
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

<script>
import {
  SfTabs, SfLoader, SfReview, SfRating,
} from '@storefront-ui/vue';
import { reviewGetters } from '~/getters';
import {
  computed, defineComponent, onMounted, ref,
} from '@nuxtjs/composition-api';
import { useReview } from '~/composables';

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
    const reviews = ref([]);

    const userReviews = computed(() => reviewGetters.getItems(reviews.value));

    onMounted(async () => {
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
.no-reviews {
  &__title {
    margin: 0 0 var(--spacer-lg) 0;
    font: var(--font-weight--normal) var(--font-size--base) / 1.6
      var(--font-family--primary);
  }
}

.tab-orphan {
  @include for-mobile {
    --tabs-title-display: none;
    --tabs-content-padding: 0;
    --tabs-conent-border-width: 0;
  }
}

.message {
  margin: 0 0 var(--spacer-2xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6
    var(--font-family--primary);

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
