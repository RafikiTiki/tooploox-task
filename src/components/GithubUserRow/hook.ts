import { GithubUserRecordInterface } from '../../store/domain/users/models';
import useTypedSelector from '../../store/useTypedSelector';
import { selectGithubUserBaseData } from '../../store/domain/users/selectors';
import { Maybe } from '../../commonTypes';

export const useGithubUserBaseData = (
  userId: number,
): Maybe<GithubUserRecordInterface> => {
  const githubUserBaseData = useTypedSelector((state) =>
    selectGithubUserBaseData(state, userId),
  );

  return githubUserBaseData;
};
