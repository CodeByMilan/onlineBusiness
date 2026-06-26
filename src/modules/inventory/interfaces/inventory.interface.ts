import { PRODUCT_STATUS_ENUM } from 'src/common/constants/status.constants';

export interface IInventory {
  quantity: number;
  status: PRODUCT_STATUS_ENUM;
  variantId:number
}
