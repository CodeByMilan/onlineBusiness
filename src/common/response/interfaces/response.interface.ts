export interface IResponse<T = Record<string, any>> {
    _metadata?: Record<string, any>;
    data?: T;
  }