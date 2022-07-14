<template>
  <component
    :is="component"
    v-if="isShow"
    class="add-to-wishlist"
    @click="$emit('addToWishlist')"
  >
    <SvgImage
      :icon="isInWishlist ? isInWishlistIcon : wishlistIcon"
      :label="$t('Wishlist')"
      width="32"
      height="32"
    />
    <SfButton class="sf-button--text">
      {{ $t(actionText) }}
    </SfButton>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api';
import { SfButton } from '@storefront-ui/vue';
import SvgImage from '~/components/General/SvgImage.vue';

export default defineComponent({
  name: 'AddToWishlist',
  components: {
    SfButton,
    SvgImage,
  },
  props: {
    component: {
      type: String,
      default: 'span',
    },
    isInWishlist: {
      type: Boolean,
      default: false,
    },
    wishlistIcon: {
      type: String,
      default: 'heart',
    },
    isInWishlistIcon: {
      type: String,
      default: 'heart_fill',
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const actionText = computed(() => (props.isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'));

    return {
      actionText,
    };
  },
});
</script>

<style lang="scss" scoped>
.add-to-wishlist {
  display: flex;
  align-items: center;
  color: var(--c-primary);
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 1rem;
  &__content {
    margin-left: 5px;
    display: flex;
  }
}
</style>
