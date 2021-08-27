import {
  Context,
  useForgotPasswordFactory,
  UseForgotPasswordFactoryParams,
} from '@vue-storefront/core';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword: async (context: Context, { email, customQuery }) => {
    const { data } = await context.$magento.api.requestPasswordResetEmail({ email });

    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNewPassword: async (context: Context, { tokenValue, newPassword, customQuery }) => {
    console.log('Mocked: setNewPassword');
    return {};
  },
};

export const useForgotPassword = useForgotPasswordFactory<any>(factoryParams);
export default useForgotPassword;
