<!-- eslint-disable vue/multi-word-component-names -->
<!-- name must be exactly "error.vue" - Nuxt requirement -->
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

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import { SfButton } from '@storefront-ui/vue';
import type { NuxtError } from '@nuxt/types';

export default defineComponent({
  components: {
    SfButton,
  },
  props: {
    error: {
      type: Object as PropType<NuxtError>,
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
