<template>
  <component
    :is="component"
    v-if="isShow"
    class="add-to-wishlist"
    @click="$emit('addToWishlist')"
  >
    <SfIcon
      :icon="isInWishlist ? isInWishlistIcon : wishlistIcon"
      size="lg"
      color="green-primary"
      viewBox="0 0 24 24"
      :coverage="1"
    />
    <SfButton class="sf-button--text">
      {{ $t(actionText) }}
    </SfButton>
  </component>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api';
import { SfIcon, SfButton } from '@storefront-ui/vue';

export default defineComponent({
  name: 'AddToWishlist',
  components: {
    SfIcon,
    SfButton,
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
    const actionText = computed(() => (props.isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'));

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
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 1rem;
  &__content {
    margin-left: 5px;
    display: flex;
  }
}
</style>
