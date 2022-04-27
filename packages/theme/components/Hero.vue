<template>
  <div class="hero" :style="styles">
    <div class="hero__wrapper">
      <slot name="subtitle" v-bind="{ subtitle }">
        <span v-show="subtitle" class="hero__subtitle">
          {{ subtitle }}
        </span>
      </slot>
      <slot name="title" v-bind="{ title }">
        <span v-show="title" class="hero__title">
          {{ title }}
        </span>
      </slot>
      <slot name="call-to-action" v-bind="{ buttonText, link }">
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

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { SfButton } from '@storefront-ui/vue';

export default defineComponent({
  name: 'Hero',
  components: { SfButton },
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
    background: {
      type: String,
      default: '',
    },
    desktopImage: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: null,
    },
    mobileImage: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const styles = ref({
      '--hero-background-image': `url('${props.desktopImage}')`,
      '--hero-background-image-mobile': `url('${props.mobileImage}')`,
      'background-color': props.background,
    });

    return { styles };
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
  background-image: var(--hero-background-image, var(--hero-background-image-mobile));
  background-repeat: no-repeat;
  background-size: cover;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
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
    background-image: var(--hero-background-image);
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
