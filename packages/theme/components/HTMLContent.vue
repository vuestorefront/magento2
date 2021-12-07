<template>
  <component
    :is="tag"
    v-html="content"
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
    const contentData = computed(() => DOMPurify.sanitize(props.content));

    return {
      contentData,
    };
  },
});
</script>
