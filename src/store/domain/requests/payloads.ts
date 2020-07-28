import RequestType from './requestType';
import RequestStatus from './requestStatus';

export type OnSetRequestStatusPayload = {
  requestType: RequestType;
  status: RequestStatus;
  error?: Error;
};

export type OnSetRequestNextPage = {
  requestType: RequestType;
  nextPage: string;
};
