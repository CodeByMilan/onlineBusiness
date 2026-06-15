export enum USER_TYPE {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export enum USER_GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface IUser {
  email: string;
  password: string;
  type: USER_TYPE;
  gender?: USER_GENDER;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  userName?: string;
}
