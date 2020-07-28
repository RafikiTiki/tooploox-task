export enum AlertType {
  INFO,
  SUCCESS,
  WARNING,
  ERROR,
}

export interface AlertInterface {
  readonly id: string;
  readonly type: AlertType;
  readonly message: string;
}
