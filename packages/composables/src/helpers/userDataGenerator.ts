import { CustomerUpdateParameters } from '@vue-storefront/magento-api';

export const generateUserData = (userData): CustomerUpdateParameters => {
  const baseData = {
    email: userData.email,
    firstname: userData.firstName || userData.firstname,
    lastname: userData.lastName || userData.lastname,
  } as CustomerUpdateParameters;

  if (Object.prototype.hasOwnProperty.call(userData, 'is_subscribed')) {
    baseData.is_subscribed = userData.is_subscribed;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'dateOfBirth') || Object.prototype.hasOwnProperty.call(userData, 'date_of_birth')) {
    baseData.date_of_birth = userData.dateOfBirth || userData.date_of_birth;
  }

  if (Object.prototype.hasOwnProperty.call(userData, 'allow_remote_shopping_assistance')) {
    baseData.allow_remote_shopping_assistance = userData.allow_remote_shopping_assistance;
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

  return baseData;
};
