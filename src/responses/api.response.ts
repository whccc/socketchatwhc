import { IOperation } from './responses.interface';

export class ApiResponse<T> {
  public data: T;
  public operation: IOperation;

  constructor(data: T, code: string, messageCode: string) {
    this.data = data;
    this.operation = { code, message: messageCode };
  }
}
