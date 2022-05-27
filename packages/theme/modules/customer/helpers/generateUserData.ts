import type { CustomerCreateInput } from '~/modules/GraphQL/types';

export const generateUserData = (userData: any): CustomerCreateInput => {
  const baseData = {
    email: userData.email,
    firstname: userData.firstName || userData.firstname,
    lastname: userData.lastName || userData.lastname,
  } as CustomerCreateInput;

  if (Object.prototype.hasOwnProperty.call(userData, 'is_subscribed')) {
    baseData.is_subscribed = userData.is_subscribed;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'dateOfBirth') || Object.prototype.hasOwnProperty.call(userData, 'date_of_birth')) {
    baseData.date_of_birth = userData.dateOfBirth || userData.date_of_birth;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'gender')) {
    baseData.gender = userData.gender;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'taxvat')) {
    baseData.taxvat = userData.taxvat;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'prefix')) {
    baseData.prefix = userData.prefix;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'suffix')) {
    baseData.suffix = userData.suffix;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'password')) {
    baseData.password = userData.password;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'recaptchaToken')) {
    baseData.recaptchaToken = userData.recaptchaToken;
  }

  return baseData;
};
