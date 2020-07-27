import { Action } from './types';

function createAction<TPayload>(
  type: string,
  payload: TPayload,
): Action<TPayload> {
  return {
    type,
    payload,
  };
}

export default createAction;
