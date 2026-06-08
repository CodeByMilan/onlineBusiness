export enum USER_TYPE {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export interface IUser {
  email?: string;
  password: string;
  type: USER_TYPE;
}
