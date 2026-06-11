import { PRODUCT_STATUS_ENUM } from 'src/common/constants/status.constants';

export interface IProduct{
  name: string;
  price: number;
  status: PRODUCT_STATUS_ENUM;
  description: string;
  quantity: number;
}

