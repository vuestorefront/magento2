<template>
  <SfTabs
    id="tabs"
    :open-tab="activeTab"
    class="product__tabs"
    @click:tab="changeTab"
  >
    <SfTab :title="$t('Description')">
      <HTMLContent
        v-if="productDescription"
        :content="productDescription"
        tag="div"
        class="product__description"
      />
    </SfTab>
    <SfTab :title="$t('Read reviews')">
      <SfLoader
        v-if="isReviewsLoading"
        :loading="isReviewsLoading"
      />
      <div v-else>
        <SfReview
          v-for="review in reviews"
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
        <div id="addReview">
          <ProductAddReviewForm
            @add-review="successAddReview"
          />
        </div>
      </div>
    </SfTab>
    <SfTab
      :title="$t('Additional Information')"
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
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api';
import {
  SfReview,
  SfTabs,
  SfLoader,
} from '@storefront-ui/vue';
import ProductAddReviewForm from '~/modules/catalog/product/components/ProductAddReviewForm.vue';
import HTMLContent from '~/components/HTMLContent.vue';
import reviewGetters, {
  getReviewId,
  getReviewAuthor,
  getReviewDate,
  getReviewMessage,
  getReviewRating,
} from '~/modules/review/getters/reviewGetters';
import { useReview, UseReviewAddReviewParams } from '~/modules/review/composables/useReview';
import { Product } from '~/modules/catalog/product/types';
import { TabsConfig } from '~/modules/catalog/product/composables/useProductTabs';
import { usePageStore } from '~/stores/page';

export default defineComponent({
  name: 'ProductTabs',
  components: {
    ProductAddReviewForm,
    HTMLContent,
    SfReview,
    SfTabs,
    SfLoader,
  },
  props: {
    product: {
      type: [Object, null] as PropType<Product | null>,
      default: null,
    },
    openTab: {
      type: Number,
      default: TabsConfig.description.ID,
    },
  },
  setup(props, { emit }) {
    const { routeData } = usePageStore();
    const reviews = ref(null);
    const isReviewsLoading = ref(true);

    const {
      search: searchReviews,
      addReview,
    } = useReview();

    const getSearchQuery = () => ({
      filter: {
        sku: {
          eq: routeData.sku,
        },
      },
    });

    const fetchReviews = async (query = getSearchQuery()) => {
      const productReviews = await searchReviews(query);
      const baseReviews = Array.isArray(productReviews)
        ? productReviews[0]
        : productReviews;

      reviews.value = reviewGetters.getItems(baseReviews);
    };

    let lastReviewsQuery = '';
    const changeTab = (tabNumber: number) => {
      if (!process.client) return props.openTab;
      const tabs = document.querySelector('#tabs');

      if (!tabs) return props.openTab;
      tabs.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });

      if (tabNumber === TabsConfig.reviews.ID) {
        const newQuery = getSearchQuery();
        const stringNewQuery = JSON.stringify(newQuery);
        if (lastReviewsQuery !== stringNewQuery) {
          lastReviewsQuery = stringNewQuery;
          fetchReviews(newQuery);
          isReviewsLoading.value = false;
        }
      }
      emit('changeTab', tabNumber);
      return tabNumber;
    };

    const activeTab = computed(() => changeTab(props.openTab));

    const productDescription = computed(
      () => props.product?.description?.html || '',
    );

    const successAddReview = async (reviewData: UseReviewAddReviewParams) => {
      await addReview(reviewData);
      document.querySelector('#tabs').scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    };

    return {
      reviews,
      activeTab,
      changeTab,
      isReviewsLoading,
      getReviewId,
      getReviewAuthor,
      getReviewDate,
      getReviewMessage,
      getReviewRating,
      productDescription,
      successAddReview,
    };
  },
});
</script>
