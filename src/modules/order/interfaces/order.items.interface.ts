import { ORDER_STATUS } from './order.interface';

export interface IOrderItems {
  quantity: number;
  unitPrice: number;
  status: ORDER_STATUS;
}
