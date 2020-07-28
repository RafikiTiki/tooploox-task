export interface Action<TPayload = any> {
  type: string;
  payload: TPayload;
}
