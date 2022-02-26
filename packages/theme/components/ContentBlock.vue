<template>
  <div>
    <div
      v-if="title"
      class="sf-heading"
    >
      <h3 class="sf-heading__title h3">
        {{ title }}
      </h3>
    </div>
    <HTMLContent
      :content="content"
    />
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'ContentBlock',
  components: {
    HTMLContent: () => import(/* webpackPrefetch: true */'~/components/HTMLContent.vue'),
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    content: {
      type: String,
      required: false,
      default: '',
    },
  },
});
</script>
