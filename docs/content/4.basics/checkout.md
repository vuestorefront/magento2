# Checkout

Checkout in e-commerce is the process of selecting and paying for items in a shopping cart. The checkout process is one of the most important parts of an e-commerce website. It is the final step a user must take before completing a purchase on an online store.

## Overview

We provide a set of methods that allow you to implement the full checkout functionality in your storefront integration. These methods are divided into two groups: guest checkout methods and customer checkout methods. Guest checkout methods are used when the customer is not logged in, while customer checkout methods are used when the customer is logged in.

## References

| Method                                                                                                       | Description                                        |
|--------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| [getAvailableShippingMethods](../api/magento-sdk/getAvailableShippingMethods)                   | Method to fetch guest available shipping methods   |
| [getAvailablePaymentMethods](../api/magento-sdk/getAvailablePaymentMethods)                     | Method to fetch guest available payment methods    |
| [getAvailableCustomerShippingMethods](../api/magento-sdk/getAvailableCustomerShippingMethods)   | Method to fetch customer available sipping methods |
| [getAvailableCustomerPaymentMethods](../api/magento-sdk/getAvailableCustomerPaymentMethods)     | Method to fetch customer available payment methods |
| [getCustomerAddresses](../api/magento-sdk/getCustomerAddresses)                                 | Method to fetch customer addresses                 |
| [setShippingAddressesOnCart](../api/magento-sdk/setShippingAddressesOnCart)                     | Method to set shipping addresses on cart           |
| [setBillingAddressOnCart](../api/magento-sdk/setBillingAddressOnCart)                         | Method to set billing addresse on cart             |
| [setShippingMethodsOnCart](../api/magento-sdk/setShippingMethodsOnCart)                         | Method to set shipping methods on cart             |
| [setPaymentMethodOnCart](../api/magento-sdk/setPaymentMethodOnCart)                             | Method to set payment method on cart               |
| [setGuestEmailOnCart](../api/magento-sdk/setGuestEmailOnCart)                                   | Method to set email on the guest cart              |
| [placeOrder](../api/magento-sdk/placeOrder)                                                     | Method to place an order                           |
