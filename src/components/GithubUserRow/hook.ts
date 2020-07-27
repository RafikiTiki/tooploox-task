import { GithubUserRecordInterface } from '../../store/domain/users/models';
import useTypedSelector from '../../store/useTypedSelector';
import { selectGithubUserBaseData } from '../../store/domain/users/selectors';

export const useGithubUserBaseData = (
  userId: number,
): GithubUserRecordInterface => {
  const githubUserBaseData = useTypedSelector((state) =>
    selectGithubUserBaseData(state, userId),
  );

  return githubUserBaseData;
};
