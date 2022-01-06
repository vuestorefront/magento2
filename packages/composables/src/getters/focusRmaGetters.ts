import { OrderItemInterface, FocusReturnChildItem } from '@absolute-web/magento-api';

export interface FocusRmaGetters {
  getCanAddToRmaWithoutParent(item: OrderItemInterface): boolean;

  getChildItems(item: OrderItemInterface): FocusReturnChildItem[];

  getChildType(item: OrderItemInterface): string;

  getItemPriceWithTaxAndDiscount(item: OrderItemInterface): number;

  getParentItemUid(item: OrderItemInterface): string;
}

export const getCanAddToRmaWithoutParent = (item: OrderItemInterface): boolean => (
  item?.focus_can_add_to_rma_without_parent === undefined ? true : item?.focus_can_add_to_rma_without_parent
);

export const getChildItems = (item: OrderItemInterface): FocusReturnChildItem[] => (item?.focus_child_items ? item?.focus_child_items : []);

export const getChildType = (item: OrderItemInterface): string => (item?.focus_child_type ? item?.focus_child_type : null);

export const getItemPriceWithTaxAndDiscount = (item: OrderItemInterface): number => (
  item?.focus_price_with_tax_and_discount?.value ? item?.focus_price_with_tax_and_discount?.value : 0
);

export const getParentItemUid = (item: OrderItemInterface): string => (item?.focus_parent_item_uid ? item?.focus_parent_item_uid : null);

const focusRmaGetters: FocusRmaGetters = {
  getCanAddToRmaWithoutParent,
  getChildItems,
  getChildType,
  getItemPriceWithTaxAndDiscount,
  getParentItemUid,
};

export default focusRmaGetters;
