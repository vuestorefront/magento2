<template>
  <component
    :is="tag"
    :aria-label="label"
    :role="role || (label ? 'img' : null)"
    class="svg-image"
  >
    <svg
      :width="width"
      :height="height"
    >
      <use :xlink:href="`#${icon}`" />
    </svg>
  </component>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'SvgImage',
  props: {
    icon: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '24',
    },
    height: {
      type: String,
      default: '24',
    },
    tag: {
      type: String,
      default: 'span',
    },
    label: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.svg-image {
  align-items: center;
  display: inline-flex;

  svg {
    fill: currentColor;
  }
}
</style>
