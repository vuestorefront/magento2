<template>
  <div ref="root">
    <slot v-if="isVisible" />
  </div>
</template>
<script lang="ts">
import {
  defineComponent, onMounted, onUnmounted, ref,
} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'LoadWhenVisible',
  props: {
    options: {
      type: Object,
      default: () => ({
        rootMargin: '0px 0px 200px 0px',
      }),
    },

  },
  setup({ options }) {
    const isVisible = ref(false);
    const root = ref(null);

    let observer = null;
    if (process.browser && ('IntersectionObserver' in window)) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio <= 0) return;
        observer.unobserve(root.value);
        isVisible.value = true;
      }, options);
    }

    onMounted(() => {
      if (observer) {
        observer.observe(root.value);
      }
    });

    onUnmounted(() => {
      if (observer) {
        observer.unobserve(root.value);
      }
    });

    return {
      root,
      isVisible,
    };
  },
});
</script>
