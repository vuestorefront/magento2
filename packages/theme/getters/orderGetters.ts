/* istanbul ignore file */

import { AgnosticPagination } from '~/composables/types';

export const getDate = (order: any): string => new Date(order?.created_at).toLocaleDateString() || '';

export const getId = (order: any): string => String(Number.parseInt(order?.order_number, 10) || Math.floor(Math.random() * 100));

export const getStatus = (order: any): string => order?.status || 'Failed';

export const getPrice = (order: any): number | null => order?.grand_total || 0;

export const getItems = (order: any): any[] => order?.items || [];

export const getItemSku = (item: any): string => item?.product_sku || 0;

export const getItemName = (item: any): string => item?.product_name || 0;

export const getItemQty = (item: any): number => item?.quantity_ordered || 0;

export const getItemPrice = (item: any): number => item?.product_sale_price?.value || 0;

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
