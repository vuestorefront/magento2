<template>
  <div class="shipping-provider">
    <SfHeading
      :level="3"
      :title="$t('Shipping method')"
      class="sf-heading&#45;&#45;left sf-heading&#45;&#45;no-underline title"
    />
    <div class="form">
      <SfLoader :loading="isLoading">
        <div v-if="errorUseGetShippingMethods.load">
          {{
            $t(
              'There was some error while trying to fetch shipping methods. We are sorry, please try with different shipping details or later.')
          }}
        </div>
        <div v-else-if="errorShippingProvider.save">
          {{
            $t(
              'There was some error while trying to select this shipping method. We are sorry, please try with different shipping method or later.')
          }}
        </div>
        <div v-else-if="!shippingMethods.length">
          {{
            $t(
              'There are no shipping methods available for this country. We are sorry, please try with different country or later.')
          }}
        </div>
      </SfLoader>
      <div class="form__radio-group">
        <SfRadio
          v-for="(method, index) in shippingMethods"
          :key="index"
          v-e2e="'shipping-method-label'"
          :label="method.method_title"
          :value="method.method_code"
          :selected="selectedShippingMethod && selectedShippingMethod.shippingMethod && selectedShippingMethod.shippingMethod.id"
          name="shippingMethod"
          :description="method.carrier_title"
          class="form__radio shipping"
          @input="selectShippingMethod(method)"
        >
          <div class="shipping__label">
            {{ method.method_title }}
          </div>

          <div class="shipping__description">
            {{ method.carrier_title }}
          </div>
        </SfRadio>
      </div>
      <div class="form__action">
        <SfButton
          v-e2e="'continue-to-billing'"
          class="form__action-button"
          type="button"
          :disabled="!isShippingMethodStepCompleted || loading || loadingShippingProvider.save"
          @click.native="$emit('submit')"
        >
          {{ $t('Continue to billing') }}
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart, useShippingProvider, cartGetters } from '@vue-storefront/magento';
import {
  SfHeading,
  SfButton,
  SfRadio,
  SfLoader,
} from '@storefront-ui/vue';
import { useGetShippingMethods } from '@vue-storefront/magento/src';
import {
  ref, reactive, onMounted, computed,
} from '@vue/composition-api';

export default {
  name: 'VsfShippingProvider',
  components: {
    SfHeading,
    SfButton,
    SfRadio,
    SfLoader,
  },
  setup() {
    const isShippingMethodStepCompleted = ref(false);
    const {
      load: loadShippingMethods,
      result: shippingMethods,
      loading: loadingShippingMethods,
      error: errorUseGetShippingMethods,
    } = useGetShippingMethods('VsfShippingProvider');
    const { cart } = useCart();
    const {
      state,
      error: errorShippingProvider,
      loading: loadingShippingProvider,
      save,
      load,
    } = useShippingProvider('VsfShippingProvider');
    const selectedShippingMethod = computed(() => state.value && state.value.response);
    const totals = computed(() => cartGetters.getTotals(cart.value));

    const isLoading = computed(() => loadShippingMethods.value || loadingShippingProvider.value);

    onMounted(async () => {
      await loadShippingMethods({ cartId: cart.value.id });
    });

    return {
      errorShippingProvider,
      errorUseGetShippingMethods,
      isLoading,
      isShippingMethodStepCompleted,
      loadingShippingProvider,
      selectedShippingMethod,
      shippingMethods,
      state,
      totals,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  --heading-title-font-weight: var(--font-weight--bold);
}

.shipping-provider {
  .sf-radio {
    &__label {
      display: flex;
      justify-content: space-between;
    }

    &__description {
      --radio-description-margin: 0;
      --radio-description-font-size: var(--font-xs);
    }
  }
}

.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }

  &__action-button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 25rem;
    }
  }

  &__radio-group {
    flex: 0 0 100%;
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      margin: 0 0 var(--spacer-2xl) 0;
    }

  }
}
</style>
