import { Return, ReturnItem, ReturnCustomAttribute } from '@absolute-web/magento-api';

export interface CustomerReturnsGetters {
  getCustomerEmail(customerReturn: Return): string;

  getDate(customerReturn: Return, locales: string, options: object): string;

  getOrderId(customerReturn: Return): string;

  getProductName(returnProduct: ReturnItem): string;

  getProductSku(returnProduct: ReturnItem): string;

  getProductPrice(returnProduct: ReturnItem): number;

  getProductPriceCurrency(returnProduct: ReturnItem): string;

  getProductRequestQty(returnProduct: ReturnItem): number;

  getProductQty(returnProduct: ReturnItem): number;

  getProductReturnReason(returnProduct: ReturnItem): string;

  getProductReturnReasonId(returnProduct: ReturnItem): number;

  getReturnId(customerReturn: Return): string;

  getReturnUid(customerReturn: Return): string;

  getStatus(customerReturn: Return): string;
}

export const getCustomerEmail = (customerReturn: Return): string => (customerReturn?.customer?.email ? customerReturn?.customer?.email : '');

export const getDate = (customerReturn: Return, locales: string, options: object): string => (customerReturn?.created_at ? new Date(customerReturn.created_at).toLocaleString(locales, options) : '');

export const getOrderId = (customerReturn: Return): string => (customerReturn?.order?.number ? customerReturn?.order?.number : '');

export const getProductName = (returnProduct: ReturnItem): string => (returnProduct?.order_item?.product_name ? returnProduct?.order_item?.product_name : '');

export const getProductSku = (returnProduct: ReturnItem): string => (returnProduct?.order_item?.product_sku ? returnProduct?.order_item?.product_sku : '');

export const getProductPrice = (returnProduct: ReturnItem): number => (
  returnProduct?.order_item?.product_sale_price?.value ? returnProduct?.order_item?.product_sale_price?.value : 0
);

export const getProductPriceCurrency = (returnProduct: ReturnItem): string => (
  returnProduct?.order_item?.product_sale_price?.currency ? returnProduct?.order_item?.product_sale_price?.currency : ''
);

export const getProductRequestQty = (returnProduct: ReturnItem): number => (returnProduct?.request_quantity ? returnProduct?.request_quantity : 0);

export const getProductQty = (returnProduct: ReturnItem): number => (returnProduct?.quantity ? returnProduct?.quantity : 0);

export const getProductReturnReason = (returnProduct: ReturnItem): string => (returnProduct?.custom_attributes
  ? returnProduct?.custom_attributes.find((attribute: ReturnCustomAttribute) => attribute.label === 'Reason to Return').value || ''
  : '');

export const getProductReturnReasonId = (returnProduct: ReturnItem): number => (
  returnProduct.reason ? returnProduct.reason : null
);

export const getReturnId = (customerReturn: Return): string => (customerReturn?.number ? customerReturn?.number : '');

export const getReturnUid = (customerReturn: Return): string => (customerReturn?.uid ? customerReturn?.uid : '');

export const getStatus = (customerReturn: Return): string => (customerReturn?.status ? customerReturn?.status.replace(/_/g, ' and ').toLowerCase() : '');

const customerReturnsGetters: CustomerReturnsGetters = {
  getCustomerEmail,
  getDate,
  getOrderId,
  getProductName,
  getProductSku,
  getProductPrice,
  getProductPriceCurrency,
  getProductRequestQty,
  getProductQty,
  getProductReturnReason,
  getProductReturnReasonId,
  getReturnId,
  getReturnUid,
  getStatus,
};

export default customerReturnsGetters;
