import parseLinkHeader from 'parse-link-header';
import get from 'lodash/get';
import GithubAPIError from './errorDefinitions';
import { GithubApiResponse } from './types';

export const getNextPage = (response: Response): string | undefined => {
  const linkHeader = response.headers.get('link');
  const pagination = linkHeader ? parseLinkHeader(linkHeader) : null;

  return get(pagination, ['next', 'page']);
};

export const processResponse = async (
  response: Response,
): Promise<GithubApiResponse<any>> => {
  const nextPage = getNextPage(response);
  const data = await response.json();

  if (response.status > 400) {
    throw new GithubAPIError(response.statusText);
  }

  return {
    nextPage,
    data,
  };
};
