import useAddresses from '~/modules/customer/composables/useAddresses';

export const useAddressesDetails = () => {
  const {
    load, remove, update, save,
  } = useAddresses();

  const loadAddresses = () => {
    const addressesData = await load();
    userAddresses.value = userAddressesGetters.getAddresses(addressesData);

    const activeAddressData = userAddresses.value
      .filter((address) => String(address?.id) === route.value.query.id)
      .pop();

    activeAddress.value = activeAddressData;
  };

  return {
    load,
  };
};
