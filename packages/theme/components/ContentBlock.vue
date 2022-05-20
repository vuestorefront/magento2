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
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import HTMLContent from '~/components/HTMLContent.vue';

export default defineComponent({
  name: 'ContentBlock',
  components: { HTMLContent },
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
