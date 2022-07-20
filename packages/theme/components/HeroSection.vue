<template>
  <div class="hero">
    <SfImage
      :image-tag="imageTag"
      :src="imageSrc"
      :alt="title"
      :width="imageWidth"
      :height="imageHeight"
      :nuxt-img-config="nuxtImgConfig"
      placeholder
      class="hero__image"
    />
    <div class="hero__wrapper">
      <slot
        name="subtitle"
        v-bind="{ subtitle }"
      >
        <span
          v-show="subtitle"
          class="hero__subtitle"
        >
          {{ subtitle }}
        </span>
      </slot>
      <slot
        name="title"
        v-bind="{ title }"
      >
        <span
          v-show="title"
          class="hero__title"
        >
          {{ title }}
        </span>
      </slot>
      <slot
        name="call-to-action"
        v-bind="{ buttonText, link }"
      >
        <SfButton
          v-if="buttonText && link"
          :link="localePath(link)"
          class="hero__button"
        >
          {{ buttonText }}
        </SfButton>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { ImageModifiers } from '@nuxt/image';
import { SfButton, SfImage } from '@storefront-ui/vue';

export default defineComponent({
  name: 'HeroSection',
  components: {
    SfButton,
    SfImage,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    imageHeight: {
      type: [Number, String],
      default: '',
    },
    imageSrc: {
      type: String,
      default: '',
    },
    imageTag: {
      type: String,
      default: '',
    },
    imageWidth: {
      type: [Number, String],
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    nuxtImgConfig: {
      type: Object as PropType<ImageModifiers | {}>,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  justify-content: flex-start;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 14rem;
  color: var(--c-text);

  &__image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    ::v-deep img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    width: 100%;
    padding: var(--spacer-sm);
    text-decoration: none;
  }

  &__title {
    margin: var(--spacer-xs) 0 0 0;
    color: var(--c-text);
    width: 60%;
    @include font(
        --hero-title-font,
        var(--font-weight--semibold),
        var(--h2-font-size),
        1.2,
        var(--font-family--secondary)
    );
    letter-spacing: 0.1px;
    text-transform: none;
  }

  &__subtitle {
    margin: 0;
    color: var(--c-gray);
    width: 60%;
    @include font(
        --hero-subtitle-font,
        var(--font-weight--normal),
        var(--h6-font-size),
        1.4,
        var(--font-family--secondary)
    );
    text-transform: uppercase;
  }

  &__button {
    display: none;
  }

  @include for-desktop {
    min-height: 36.625rem;

    &__wrapper {
      width: 50%;
      padding: var(--spacer-2xl);
    }

    &__title {
      --hero-font-size: var(--h1-font-size);
      width: 100%;
      margin: var(--spacer-base) 0 var(--spacer-lg) 0;
    }

    &__subtitle {
      width: 100%;
    }

    &__button {
      display: block;
    }
  }
}
</style>
