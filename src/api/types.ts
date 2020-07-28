export type GithubRepoInterface = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
};

export interface GithubUserInterface {
  id: number;
  login: string;
  avatar_url: string;
  name?: string;
  bio?: string;
}

export type GithubApiResponse<T> = {
  data: T;
  error?: string | null;
  nextPage?: string;
};

export type FetchPageableUserRepos = {
  data: GithubRepoInterface[];
  errorMessage?: string;
  nextPage?: string;
};
