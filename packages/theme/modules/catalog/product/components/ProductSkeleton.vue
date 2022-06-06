<template>
  <div class="product-skeleton">
    <div class="gallery-skeleton">
      <SkeletonLoader
        margin="0"
      />
    </div>
    <div class="product-info-skeleton">
      <div class="product-header-skeleton">
        <SkeletonLoader
          width="260px"
          height="42px"
          margin="0"
        />
      </div>
      <div class="price-and-rating-skeleton">
        <div class="price-skeleton">
          <SkeletonLoader
            width="60px"
            height="29px"
            margin="0"
          />
        </div>
        <div class="review-skeleton">
          <div class="rating-skeleton">
            <SkeletonLoader
              width="100px"
              height="15px"
              margin="0"
            />
          </div>
          <div class="review-links-skeletons">
            <SkeletonLoader
              width="106px"
              height="16px"
              margin="0"
            />
            <SkeletonLoader
              width="85px"
              height="16px"
              margin="0"
            />
          </div>
        </div>
      </div>
      <div class="actions-skeleton">
        <div>
          <SkeletonLoader
            width="120px"
            height="55px"
          />
        </div>
        <div>
          <SkeletonLoader
            width="370px"
            height="55px"
          />
        </div>
      </div>
      <div class="tabs-skeleton">
        <SkeletonLoader
          width="522px"
          height="44px"
          margin="0"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
} from '@nuxtjs/composition-api';
import SkeletonLoader from '~/components/SkeletonLoader/index.vue';

export default defineComponent({
  name: 'ProductSkeleton',
  components: {
    SkeletonLoader,
  },
});
</script>
<style lang="scss" scoped>
.product-skeleton {
  display: flex;
  flex-wrap: wrap;

  @include for-desktop {
    flex-wrap: nowrap;
  }
}

.product-header-skeleton {
  @include for-desktop {
    margin-top: 30px;
  }
}

.gallery-skeleton {
  padding-top: 3.75rem;
  padding-bottom: 3.75rem;
  width: 100%;

  @include for-desktop {
    flex: 1 1 50%;
    width: auto;
  }

  .skeleton {
    width: 100%;
    height: 671px;

    @include for-desktop {
      width: 582px;
      height: 658px;
    }
  }
}

.product-info-skeleton {
  flex: 1 1 100%;
  padding: 0 var(--spacer-sm) var(--spacer-base);
  @include for-desktop {
    flex: 1 1 50%;
    max-width: 32.625rem;
    padding-left: var(--spacer-lg);
  }
}

.price-and-rating-skeleton {
  margin: var(--spacer-lg) 0;
  display: flex;
  justify-content: space-between;
}

.rating-skeleton {
  margin: var(--spacer-xs) 0 var(--spacer-xs);
}

.review-skeleton {
  text-align: right;
}

.actions-skeleton {
  display: flex;
  margin-top: 50px;
  justify-content: space-between;
}

.tabs-sleleton {
  margin-top: var(--spacer-2xl);
}
</style>
