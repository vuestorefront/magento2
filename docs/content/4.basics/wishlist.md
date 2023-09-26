# Wishlist
In this section, we will cover the basics of wishlist. We will show you how to fetch wishlist data, create new wishlist, and update existing wishlist.

## Overview
Wishlist is a list of products that customers want to buy later. Using provided methods you can implement the full wishlist functionality in your storefront integration.

:warning: **Because only logged in users can have a wishlist, all methods in this section require a valid access token stored in the `vsf-customer` cookie.**

## References
| Method                                                                             | Description                                  |
|------------------------------------------------------------------------------------|----------------------------------------------|
| [addProductToWishlist](../reference/api/magento-sdk.addProductToWishlist.md)       | Method to add a product to wishlist          |
| [removeProductsFromWishlist](../reference/api/magento-sdk.removeProductsFromWishlist.md) | Method to remove a product to wishlist       |
| [wishlistItemsCount](../reference/api/magento-sdk.wishlistItemsCount.md) | Method to get items quantity in the wishlist |
