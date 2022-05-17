/**
 * @deprecated since version 1.0.0
 */
import { AgnosticPagination } from '@vue-storefront/core';
import { CustomerOrder, OrderItemInterface } from '@vue-storefront/magento-api';

export const getDate = (order: CustomerOrder): string => new Date(order?.created_at).toLocaleDateString() || '';

export const getId = (order: CustomerOrder): string => String(Number.parseInt(order?.order_number, 10) || Math.floor(Math.random() * 100));

export const getStatus = (order: CustomerOrder): string => order?.status || 'Failed';

export const getPrice = (order: CustomerOrder): number | null => order?.grand_total || 0;

export const getItems = (order: CustomerOrder): any[] => order?.items || [];

export const getItemSku = (item: OrderItemInterface): string => item?.product_sku || '';

export const getItemName = (item: OrderItemInterface): string => item?.product_name || '';

export const getItemQty = (item: OrderItemInterface): number => item?.quantity_ordered || 0;

export const getItemPrice = (item: OrderItemInterface): number => item?.product_sale_price?.value || 0;

export const getFormattedPrice = (price: number) => String(price);

const getPagination = (orders: any): AgnosticPagination => ({
  currentPage: orders?.page_info?.current_page || 1,
  totalPages: orders?.page_info?.total_pages || 1,
  totalItems: orders?.total_count || 0,
  itemsPerPage: orders?.page_info?.page_size || 10,
  pageOptions: [10, 50, 100],
});

const orderGetters = {
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getPagination,
};

export default orderGetters;
