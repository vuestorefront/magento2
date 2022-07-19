<template>
  <SfBanner
    image="/homepage/bannerD.png"
    :subtitle="$t('Fashion to take away')"
    :title="$t('Download our application to your mobile')"
    class="sf-banner--left desktop-only banner-app"
  >
    <template #call-to-action>
      <div class="app-banner__call-to-action">
        <SfLink
          class="app-banner__button sf-banner__call-to-action"
          aria-label="Go to Apple Product"
          data-testid="banner-cta-button"
          link="#"
        >
          <div class="app-store-image">
            <SfImage
              src="/homepage/apple.png"
              loading="lazy"
              alt="Apple"
              :width="134"
              :height="44"
            />
          </div>
        </SfLink>
        <SfLink
          class="app-banner__button sf-banner__call-to-action"
          aria-label="Go to Google Product"
          data-testid="banner-cta-button"
          link="#"
        >
          <div class="app-store-image">
            <SfImage
              src="/homepage/google.png"
              loading="lazy"
              alt="Google"
              :width="134"
              :height="44"
            />
          </div>
        </SfLink>
      </div>
    </template>
  </SfBanner>
</template>
<script lang="ts">
import {
  SfBanner,
  SfLink,
  SfImage,
} from '@storefront-ui/vue';
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'AppStoreBanner',
  components: {
    SfBanner,
    SfLink,
    SfImage,
  },
});
</script>
<style lang="scss" scoped>
.app-banner {
  --banner-title-margin: var(--spacer-base) 0 var(--spacer-xl) 0;
  --banner-padding: 0 0 var(--spacer-2xl);
  --banner-title-font-size: var(--h1-font-size);
  --banner-subtitle-font-size: var(--font-size--xl);
  --banner-title-font-weight: var(--font-weight--semibold);
  --banner-subtitle-font-weight: var(--font-weight--medium);
  --banner-title-text-transform: none;
  --banner-background-size: contain;
  --banner-background-position: right;
  &__title {
    margin: var(--spacer-base) 0 var(--spacer-xl) 0;
    font-size: var(--h1-font-size);
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--semibold);
    text-transform: capitalize;
  }
  display: block;
  min-height: 26.25rem;
  max-width: 65rem;
  margin: 0 auto;
  padding: 0 calc(25% + var(--spacer-2xl)) 0 var(--spacer-xl);
  &__call-to-action {
    --button-background: transparent;
    display: flex;
  }
  &__button {
    --button-padding: 0;
    --button-width: 8.375rem;
    --button-height: 2.75rem;
    & + & {
      margin: 0 0 0 calc(var(--spacer-xl) / 2);
    }
  }
}
// override ".sf-banner img" style spill
::v-deep .app-store-image img {
  position: initial;
  margin-top: var(--spacer-base);
}
</style>
