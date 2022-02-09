/* istanbul ignore file */
import {
  Context, Logger,
  useUserFactory,
  UseUserFactoryParams as UserUserFactoryParamsBase,
} from '@vue-storefront/core';
import { CustomerCreateInput, UpdateCustomerEmailMutationVariables } from '@vue-storefront/magento-api';
import { CustomQuery } from '@vue-storefront/core/lib/src/types';
import useCart from '../useCart';
import { generateUserData } from '../../helpers/userDataGenerator';

interface UseUserFactoryParams<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS>
  extends UserUserFactoryParamsBase<USER, UPDATE_USER_PARAMS, REGISTER_USER_PARAMS> {
  logIn: (context: Context, params: {
    username: string;
    password: string;
    recaptchaToken?: string;
    customQuery?: CustomQuery;
  }) => Promise<USER>;

  register: (context: Context, params: REGISTER_USER_PARAMS & {
    customQuery?: CustomQuery;
    recaptchaInstance?: any;
  }) => Promise<USER>;
}

/**
 * @deprecated since version <version?>
 *
 * @see <add docs link>
 */
const factoryParams: UseUserFactoryParams<
any,
UpdateCustomerEmailMutationVariables,
CustomerCreateInput
> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: Context) => {
    Logger.debug('[Magento] Load user information');
    const apiState = context.$magento.config.state;

    if (!apiState.getCustomerToken()) {
      return null;
    }
    try {
      const { data } = await context.$magento.api.customer();

      Logger.debug('[Result]:', { data });

      return data?.customer ?? {};
    } catch {
      // eslint-disable-next-line no-void
      // @ts-ignore
      await factoryParams.logOut(context);
    }

    return null;
  },
  logOut: async (context: Context, params) => {
    const apiState = context.$magento.config.state;

    await context.$magento.api.revokeCustomerToken(params);

    apiState.setCustomerToken(null);
    apiState.setCartId(null);
    context.cart.setCart(null);
  },
  updateUser: async (context: Context, params) => {
    Logger.debug('[Magento] Update user information', { params });

    const { email: oldEmail } = params.currentUser;
    const { email, password, ...updateData } = params.updatedUserData;

    const userData = generateUserData(updateData);

    if (email && email !== oldEmail) {
      await context.$magento.api.updateCustomerEmail({
        email,
        password,
      });
    }

    const { data, errors } = await context.$magento.api.updateCustomer(userData);
    Logger.debug('[Result]:', { data });

    if (errors) {
      throw new Error(errors.map((e) => e.message).join(','));
    }

    // return data.updateCustomerV2.customer;
    return data?.updateCustomerV2?.customer || {};
  },
  register: async (context: Context, params) => {
    const {
      email,
      password,
      recaptchaToken,
      ...baseData
    } = generateUserData(params);

    const { data, errors } = await context.$magento.api.createCustomer(
      {
        email,
        password,
        recaptchaToken,
        ...baseData,
      },
    );

    Logger.debug('[Result]:', { data });

    if (errors) {
      Logger.error(errors);

      throw new Error(errors.map((e) => e.message).join(','));
    }
    if (!data.createCustomerV2 || !data.createCustomerV2.customer) {
      throw new Error('Customer registration error');
    }

    if (recaptchaToken) {
      // generate a new token for the login action
      const { recaptchaInstance } = params;
      const newRecaptchaToken = await recaptchaInstance.getResponse();

      return factoryParams.logIn(context, { username: email, password, recaptchaToken: newRecaptchaToken });
    }

    return factoryParams.logIn(context, { username: email, password });
  },
  logIn: async (context: Context, params: any) => {
    Logger.debug('[Magento] Authenticate user');
    const apiState = context.$magento.config.state;

    const { data, errors } = await context.$magento.api.generateCustomerToken(
      {
        email: params.username,
        password: params.password,
        recaptchaToken: params.recaptchaToken,
      },
    );

    Logger.debug('[Result]:', { data });

    if (errors) {
      Logger.error(errors);

      throw new Error(errors.map((e) => e.message).join(','));
    }
    if (!data.generateCustomerToken || !data.generateCustomerToken.token) {
      throw new Error('Customer sign-in error');
    }
    apiState.setCustomerToken(data.generateCustomerToken.token);

    // merge existing cart with customer cart
    const currentCartId = apiState.getCartId();
    const cart = await context.$magento.api.customerCart();
    const newCartId = cart.data.customerCart.id;

    if (newCartId && currentCartId && currentCartId !== newCartId) {
      const { data: dataMergeCart } = await context.$magento.api.mergeCarts(
        {
          sourceCartId: currentCartId,
          destinationCartId: newCartId,
        },
      );

      context.cart.setCart(dataMergeCart.mergeCarts);

      apiState.setCartId(dataMergeCart.mergeCarts.id);
    } else {
      context.cart.setCart(cart.data.customerCart);
    }

    await context.$magento.api.wishlist({});

    return factoryParams.load(context);
  },

  changePassword: async (context: Context, params) => {
    Logger.debug('[Magento] changing user password');
    const { data, errors } = await context.$magento.api.changeCustomerPassword(params);
    if (errors) {
      Logger.error(errors);
      throw new Error(errors.map((e) => e.message).join(','));
    }

    Logger.debug('[Result] ', { data });

    return data?.changeCustomerPassword;
  },
};

export default useUserFactory<
any,
UpdateCustomerEmailMutationVariables,
CustomerCreateInput & { email: string; password: string, recaptchaToken?: string }
>(factoryParams);
