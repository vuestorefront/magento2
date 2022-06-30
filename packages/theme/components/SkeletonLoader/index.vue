<template>
  <div
    :class="componentClass"
    :style="componentStyle"
    data-testid="skeletonLoader"
  >
    <slot v-if="!isLoading" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';

type ComponentStyles = { width?: string, height?: string, borderRadius: string, margin: string };

export default defineComponent({
  name: 'SkeletonLoader',
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
    animation: {
      type: [String, Boolean],
      default: 'shimmer',
    },
    width: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    margin: {
      type: String,
      default: '0 0 1em 0',
    },
    radius: {
      type: String,
      default: '4px',
    },
    skeletonClass: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const componentClass = computed(() => [
      'skeleton',
      props.skeletonClass,
      props.animation ? `skeleton--${props.animation}` : null,
    ]);

    const componentStyle = ref<ComponentStyles>({
      borderRadius: props.radius,
      margin: props.margin,
    });

    if (props.width) {
      componentStyle.value.width = props.width;
    }

    if (props.height) {
      componentStyle.value.height = props.height;
    }

    return {
      componentClass,
      componentStyle,
    };
  },
});

</script>

<style lang="scss">
.skeleton {
  display: inline-block;
  vertical-align: middle;
  background-color: #f1f2f3;
  user-select: none;
  width: 100%;
  height: 1em;

  &--shimmer {
    position: relative;
    overflow: hidden;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, rgba(0,0,0,0) 100%);
      animation: shimmer 1.5s infinite;
      content: '';
    }
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
