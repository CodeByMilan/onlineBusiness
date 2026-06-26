export enum ORDER_STATUS {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PAYMENT_METHOD {
  CASH = 'cash',
  CARD = 'card',
  BANK = 'bank',
  WALLET = 'wallet',
}
export interface IOrder {
  totalAmount: number;
  status: ORDER_STATUS;
  paymentMethod: PAYMENT_METHOD;
  shippingAddress: string;
}
