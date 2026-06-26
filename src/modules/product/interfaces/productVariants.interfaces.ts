import { PRODUCT_STATUS_ENUM } from 'src/common/constants/status.constants';

export interface IProductVariants {
  size: string;
  color: string;
  status: PRODUCT_STATUS_ENUM;
  priceAdjustment: number;
  sku: string;
  productId:number
}
