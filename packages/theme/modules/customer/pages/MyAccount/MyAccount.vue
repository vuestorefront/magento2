<template>
  <div id="my-account">
    <div class="sf-content-pages my-account">
      <SfBar
        class="smartphone-only"
        :title="title"
        :back="isOnSubpage"
        @click:back="goToTopLevelRoute"
      />
      <section
        :class="{ 'is-active': isOnSubpage}"
        class="sf-content-pages__section"
      >
        <div class="sf-content-pages__sidebar">
          <h1
            v-t="'My Account'"
            class="sf-content-pages__title desktop-only"
          />
          <div
            v-for="linkGroup in sidebarLinkGroups"
            :key="linkGroup.title"
          >
            <h2
              v-t="linkGroup.title"
              class="sf-content-pages__category-title"
            />
            <SfList class="sf-content-pages__list">
              <li
                v-for="item in linkGroup.items"
                :key="item.label"
                class="sf-content-pages__list-item sf-list__item"
              >
                <SfMenuItem
                  :label="$t(item.label)"
                  :link="localeRoute(item.link)"
                  class="sf-content-pages__menu"
                  v-on="{ click: getHandler(item.id) }"
                />
              </li>
            </SfList>
          </div>
        </div>
        <div class="sf-content-pages__content">
          <router-view v-if="!$fetchState.pending" />
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import {
  SfMenuItem, SfList, SfBar,
} from '@storefront-ui/vue';

import {
  defineComponent,
  useContext,
  useRouter,
  useRoute,
  computed,
  useFetch,
} from '@nuxtjs/composition-api';
import { useSidebarLinkGroups } from './useSidebarLinkGroups';
import { useUser } from '../../composables/useUser';

export default defineComponent({
  name: 'MyAccount',
  components: {
    SfBar,
    SfList,
    SfMenuItem,
  },
  middleware: 'is-authenticated',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { i18n, localeRoute } = useContext();
    const { user, load: loadUser } = useUser();

    useFetch(async () => {
      if (user.value === null) {
        await loadUser();
      }
    });

    const { sidebarLinkGroups, logoutUser } = useSidebarLinkGroups();

    const isOnSubpage = computed(() => route.value.matched.length > 1);
    const goToTopLevelRoute = () => router.push(localeRoute({ name: 'customer' }));
    const title = computed(() => i18n.t(route.value.matched.at(-1)?.meta.titleLabel as string));

    /**
     * #tab-id: handler-name
     */
    const handlers = {
      'log-out': logoutUser,
    };

    const getHandler = (id: string) => handlers[id] ?? {};

    return {
      sidebarLinkGroups,
      title,
      isOnSubpage,
      goToTopLevelRoute,
      logoutUser,
      getHandler,
    };
  },
});
</script>

<style lang='scss' scoped>
@import '@storefront-ui/shared/styles/components/organisms/SfContentPages.scss';

::v-deep {
  .nuxt-link-exact-active > .sf-menu-item__label {
    color: var(--c-primary);
  }
}

.my-account {
  height: 100%;
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-sm);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}

.sf-content-pages {
  &__content {
    padding-top: 0;
    height: auto;
  }
}
</style>
