export enum USER_TYPE {
  ADMIN = 'ADMIN',
  USER = 'CUSTOMER',
}

export interface IUser {
  email?: string;
  password: string;
  type?: USER_TYPE;
}
