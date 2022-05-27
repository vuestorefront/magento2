<template>
  <div class="empty-wishlist">
    <slot>
      <div class="empty-wishlist__banner">
        <SvgImage
          icon="empty_cart_image"
          :label="$t('Empty bag')"
          width="211"
          height="143"
          class="empty-wishlist__icon"
          data-testid="icon"
        />
        <SfHeading
          :title="$t('Your bag is empty')"
          :description="$t('Looks like you haven’t added any items to the Wishlist.')"
          class="empty-wishlist__label"
          data-testid="label"
        />
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { SfHeading } from '@storefront-ui/vue';
import SvgImage from '~/components/General/SvgImage.vue';

export default defineComponent({
  name: 'EmptyWishlist',
  components: {
    SfHeading,
    SvgImage,
  },
});
</script>

<style lang="scss" scoped>
.empty-wishlist {
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  height: 100%;

  &__banner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__icon {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }

  &__label {
    --heading-description-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-color: var(--c-primary);
    --heading-title-font-weight: var(--font-weight--semibold);
    text-align: center;

    @include for-desktop {
      --heading-title-font-size: var(--font-size--xl);
      --heading-title-margin: 0 0 var(--spacer-sm) 0;
    }
  }
}
</style>
