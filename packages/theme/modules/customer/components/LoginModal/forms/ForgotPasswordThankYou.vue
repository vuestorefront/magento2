<template>
  <div>
    <i18n
      tag="p"
      path="forgotPasswordConfirmation"
    >
      <span class="bold">
        <slot name="email" />
      </span>
    </i18n>
    <p>{{ $t('Thank You Inbox') }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({});
</script>

<style lang="scss" scoped>
.bold {
  font-weight: var(--font-weight--semibold);
}
</style>
