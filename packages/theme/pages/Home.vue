<template>
  <div id="home">
    <Hero
      class="hero-section"
      :title="$t('Colorful summer dresses are already in store')"
      :subtitle="$t('SUMMER COLLECTION {year}', { year })"
      :button-text="$t('Learn more')"
      link="/c/women.html"
      background="#eceff1"
      desktop-image="https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerB_1240x400.jpg"
      mobile-image="https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerB_328x224.jpg"
    />
    <LazyHydrate when-visible>
      <SfBannerGrid
        :banner-grid="1"
        class="banner-grid"
      >
        <template
          v-for="item in banners"
          #[item.slot]
        >
          <SfBanner
            :key="item.slot"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            :button-text="item.buttonText"
            :image="item.image"
            :class="item.class"
          />
        </template>
      </SfBannerGrid>
    </LazyHydrate>
    <LoadWhenVisible>
      <NewProducts
        class="products"
        :button-text="$t('See more')"
        :title="$t('New Products')"
        link="/c/women.html"
      />
    </LoadWhenVisible>
    <LoadWhenVisible>
      <SfCallToAction
        :title="$t('Subscribe to Newsletters')"
        :button-text="$t('Subscribe')"
        :description="
          $t(
            'Be aware of upcoming sales and events. Receive gifts and special offers!'
          )
        "
        image="https://cdn.shopify.com/s/files/1/0407/1902/4288/files/newsletter_1240x202.jpg?v=1616496568"
        class="call-to-action"
      />
    </LoadWhenVisible>
    <LoadWhenVisible>
      <InstagramFeed />
    </LoadWhenVisible>
    <LoadWhenVisible>
      <MobileStoreBanner />
    </LoadWhenVisible>
  </div>
</template>
<script type="module">
import {
  SfButton,
  SfBanner,
  SfBannerGrid,
} from '@storefront-ui/vue';

import {
  defineComponent,
  ref,
  useContext,
  onMounted,
} from '@nuxtjs/composition-api';
import LazyHydrate from 'vue-lazy-hydration';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import Hero from '~/components/Hero.vue';
import LoadWhenVisible from '~/components/utils/LoadWhenVisible';
import SvgImage from '~/components/General/SvgImage.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    Hero,
    LazyHydrate,
    LoadWhenVisible,
    SvgImage,
    SfButton,
    SfBanner,
    SfBannerGrid,
    InstagramFeed: () => import(/* webpackPrefetch: true */ '~/components/InstagramFeed.vue'),
    MobileStoreBanner: () => import(/* webpackPrefetch: true */ '~/components/MobileStoreBanner.vue'),
    NewProducts: () => import(/* webpackPrefetch: true */ '~/components/NewProducts.vue'),
    SfCallToAction: () => import(/* webpackPrefetch: true */ '@storefront-ui/vue'),
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const { addTags } = useCache();
    const { app } = useContext();
    const year = new Date().getFullYear();
    const banners = ref([
      {
        slot: 'banner-A',
        subtitle: app.i18n.t('Dresses'),
        title: app.i18n.t('Cocktail & Party'),
        description: app.i18n.t(
          'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.',
        ),
        buttonText: app.i18n.t('Shop now'),
        image: {
          mobile:
            'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerB_328x343.jpg',
          desktop:
            'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerF_332x840.jpg',
        },
        class: 'sf-banner--slim desktop-only',
        link: '/c/women/women-clothing-skirts',
      },
      {
        slot: 'banner-B',
        subtitle: app.i18n.t('Dresses'),
        title: app.i18n.t('Linen Dresses'),
        description: app.i18n.t(
          'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.',
        ),
        buttonText: app.i18n.t('Shop now'),
        image: {
          mobile:
            'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerE_328x343.jpg',
          desktop:
            'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerE_496x840.jpg',
        },
        class: 'sf-banner--slim banner-central desktop-only',
        link: '/c/women/women-clothing-dresses',
      },
      {
        slot: 'banner-C',
        subtitle: app.i18n.t('T-Shirts'),
        title: app.i18n.t('The Office Life'),
        image: {
          mobile:
            'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerC_328x343.jpg',
          desktop:
            'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerC_332x400.jpg',
        },
        class: 'sf-banner--slim banner__tshirt',
        link: '/c/women/women-clothing-shirts',
      },
      {
        slot: 'banner-D',
        subtitle: app.i18n.t('Summer Sandals'),
        title: app.i18n.t('Eco Sandals'),
        image: {
          mobile:
            'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerG_328x343.jpg',
          desktop:
            'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerG_332x400.jpg',
        },
        class: 'sf-banner--slim',
        link: '/c/women/women-shoes-sandals',
      },
    ]);

    onMounted(() => {
      addTags([{ prefix: CacheTagPrefix.View, value: 'home' }]);
    });

    // @ts-ignore
    return {
      banners,
      year,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-meta h4 a {
  color: #111111;
  font-weight: 600;
  font-size: 20px;
}

.article-meta {
  margin-top: 10px;
}

.article-item__meta-item:not(:last-child)::after {
  display: inline-block;
  content: '';
  width: 5px;
  height: 5px;
  margin: -1px 10px 0 10px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.4);
  vertical-align: middle;
}

#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero-section {
  margin: var(--spacer-xl) auto var(--spacer-lg);

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }

  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.products {
  margin-top: var(--spacer-base);
}

.carousel {
  margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }

  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }

    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
}
</style>
