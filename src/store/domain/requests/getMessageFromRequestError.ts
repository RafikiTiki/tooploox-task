import { NOT_FOUND, FORBIDDEN } from 'http-status-codes';
import RequestType from './requestType';

const RATE_LIMIT_EXCEEDED_TEXT =
  'Rate limited exceeded. Retry after some time.';

const getMessageFromRequestError = (
  requestType: RequestType,
  statusCode?: string,
): string | null => {
  const parsedStatusCode = Number(statusCode);
  switch (requestType) {
    case RequestType.FETCH_USER_POPULAR_REPOS:
    case RequestType.FETCH_USER_DATA: {
      switch (parsedStatusCode) {
        case NOT_FOUND: {
          return 'User not found';
        }

        case FORBIDDEN: {
          return RATE_LIMIT_EXCEEDED_TEXT;
        }

        default: {
          return null;
        }
      }
    }

    case RequestType.SEARCH_USERS: {
      switch (parsedStatusCode) {
        case FORBIDDEN: {
          return RATE_LIMIT_EXCEEDED_TEXT;
        }

        default: {
          return null;
        }
      }
    }

    default: {
      return null;
    }
  }
};

export default getMessageFromRequestError;
