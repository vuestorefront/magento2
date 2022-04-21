<template>
  <div class="sf-header-navigation-item">
    <div class="sf-header-navigation-item__item sf-header-navigation-item__item--desktop">
      <SfLink
        class="sf-header-navigation-item__link"
        :link="link"
      >
        {{
          label
        }}
      </SfLink>
    </div>
  </div>
</template>
<script lang="ts">
import { SfLink } from '@storefront-ui/vue';

export default {
  name: 'HeaderNavigationItem',
  components: {
    SfLink,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    link: {
      type: [String, Object],
      default: '',
    },
  },
};
</script>
