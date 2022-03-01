<template>
  <HTMLContent :content="content" />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';
import HTMLContent from '~/components/HTMLContent';

export default defineComponent({
  name: 'CmsContent',
  components: { HTMLContent },
  props: {
    content: {
      type: String,
      default: '',
    },
  },
});
</script>
