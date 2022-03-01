<template>
  <component
    :is="tag"
    v-html="$xss(content)"
  />
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'HTMLContent',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    content: {
      type: String,
      default: '',
    },
  },
});
</script>
