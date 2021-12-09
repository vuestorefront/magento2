<template>
  <component
    :is="tag"
    v-html="sanitizedContent"
  />
</template>
<script>
import { defineComponent, computed } from '@nuxtjs/composition-api';
import DOMPurify from 'isomorphic-dompurify';

export default defineComponent({
  name: 'HTMLContent',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    content: String,
  },
  setup(props) {
    return {
      sanitizedContent: computed(() => DOMPurify.sanitize(props.content)),
    };
  },
});
</script>
