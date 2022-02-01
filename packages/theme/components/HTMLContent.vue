<template>
  <component
    :is="tag"
    v-html="sanitizedContent"
  />
</template>
<script>
import { defineComponent, computed } from '@nuxtjs/composition-api';
import _unescape from 'lodash.unescape';
import DOMPurify from 'isomorphic-dompurify';

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
  setup(props) {
    return {
      sanitizedContent: computed(() => _unescape(DOMPurify.sanitize(props.content))),
    };
  },
});
</script>
