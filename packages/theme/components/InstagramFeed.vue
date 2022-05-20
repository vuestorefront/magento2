<template>
  <SfSection
    :title-heading="$t('Share Your Look')"
    subtitle-heading="#YOURLOOK"
    class="title"
  >
    <div class="grid grid-images">
      <div class="grid__row">
        <div class="grid__col">
          <SfImage
            src="/homepage/imageAm.webp"
            alt="katherina_trn"
            loading="lazy"
            image-tag="nuxt-img"
            class="smartphone-only"
            :width="160"
            :height="160"
          />
          <SfImage
            src="/homepage/imageAd.webp"
            alt="katherina_trn"
            loading="lazy"
            image-tag="nuxt-img"
            class="desktop-only"
            :width="470"
            :height="470"
          />
        </div>
        <div class="grid__col small">
          <SfImage
            src="/homepage/imageBm.webp"
            alt="katherina_trn"
            loading="lazy"
            image-tag="nuxt-img"
            class="smartphone-only"
            :width="160"
            :height="160"
          />
          <SfImage
            src="/homepage/imageCd.webp"
            alt="katherina_trn"
            loading="lazy"
            image-tag="nuxt-img"
            class="desktop-only"
            :width="470"
            :height="160"
          />
        </div>
      </div>
      <div class="grid__row">
        <div class="grid__col small">
          <SfImage
            src="/homepage/imageCm.webp"
            alt="katherina_trn"
            loading="lazy"
            image-tag="nuxt-img"
            class="smartphone-only"
            :width="160"
            :height="160"
          />
          <SfImage
            src="/homepage/imageBd.webp"
            alt="katherina_trn"
            loading="lazy"
            image-tag="nuxt-img"
            class="desktop-only"
            :width="470"
            :height="160"
          />
        </div>
        <div class="grid__col">
          <SfImage
            src="/homepage/imageDm.webp"
            alt="katherina_trn"
            loading="lazy"
            image-tag="nuxt-img"
            class="smartphone-only"
            :width="160"
            :height="160"
          />
          <SfImage
            src="/homepage/imageDd.webp"
            alt="katherina_trn"
            loading="lazy"
            image-tag="nuxt-img"
            class="desktop-only"
            :width="470"
            :height="470"
          />
        </div>
      </div>
    </div>
  </SfSection>
</template>
<script lang="ts">
import {
  SfSection,
  SfImage,
} from '@storefront-ui/vue';
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'InstagramFeed',
  components: {
    SfSection,
    SfImage,
  },
});
</script>
<style lang="scss" scoped>
.title {
  --heading-title-font-weight: var(--font-weight--semibold);
  --section-margin: var(--spacer-xl) 0;
  --section-content-margin: var(--spacer-xl) 0;
  --heading-title-font-size: var(--h2-font-size);
  @include for-desktop {
    --section-margin: var(--spacer-2xl) 0;
    --section-content-margin: var(--spacer-2xl) 0;
  }
}
.grid {
  display: flex;
  max-height: 20.625rem;
  width: 100%;
  justify-content: center;
  margin: 0;
  @include for-desktop {
    max-height: 40.625rem;
    max-width: 60rem;
    margin: 0 auto;
  }
  &__row {
    display: flex;
    flex-direction: column;
    & + & {
      margin-left: var(--spacer-xs);
      @include for-desktop {
        margin-left: var(--spacer-sm);
      }
    }
  }
  &__col {
    width: 10rem;
    height: 10rem;
    @include for-desktop {
      &.small {
        height: 10rem;
      }
     width: 29.375rem;
     height: 29.375rem;
    }
    & + & {
      margin-top: var(--spacer-xs);
      @include for-desktop {
        margin-top: var(--spacer-sm);
      }
    }
  }
}

</style>
