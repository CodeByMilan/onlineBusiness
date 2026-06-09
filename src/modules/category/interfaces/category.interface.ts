import { STATUS_ENUM } from 'src/common/constants/status.constants';

export interface ICategory {
  name: string;
  slug: string;
  status: STATUS_ENUM;
}
