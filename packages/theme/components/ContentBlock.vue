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
    <div v-dompurify-html="content" />
  </div>
</template>
<script>
export default {
  name: 'ContentBlock',
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
};
</script>
