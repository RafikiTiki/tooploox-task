import parseLinkHeader from 'parse-link-header';
import get from 'lodash/get';

export const getNextPage = (response: Response): string | undefined => {
  const linkHeader = response.headers.get('link');
  const pagination = linkHeader ? parseLinkHeader(linkHeader) : null;

  return get(pagination, ['next', 'page']);
};
