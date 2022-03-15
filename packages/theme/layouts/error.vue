<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">
      {{ $t('Page not found') }}
    </h1>
    <h1 v-else>
      {{ $t('An error occurred') }}
    </h1>
    <SfButton :link="localePath('/')">
      {{ $t('Back to Home page') }}
    </SfButton>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';
import { SfButton } from '@storefront-ui/vue';

export default defineComponent({
  components: {
    SfButton,
  },
  layout: 'error',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.error-page {
  margin-top: var(--spacer-base);
  position: relative;
  text-align: center;

  @include for-desktop {
    margin-top: var(--spacer-2xl);
  }
}

.sf-link {
  display: inline-block;
  margin-top: var(--spacer-base);
  width: auto;

  &:hover,
  &:focus {
    color: var(--c-light-variant);
  }
}
</style>
