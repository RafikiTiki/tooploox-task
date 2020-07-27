import React from 'react';
import {
  InfiniteLoader,
  List,
  AutoSizer,
  Index,
  ListRowRenderer,
} from 'react-virtualized';
import { List as ImmutableList } from 'immutable';
import GithubUserRow from '../GithubUserRow';
import styles from './styles.module.css';
import EmptyUsersListPlaceholder from '../EmptyUsersListPlaceholder';
import { UserBaseDataRecordInterface } from '../../store/domain/users/models';

type PropTypes = {
  hasNextPage: boolean;
  isLoading: boolean;
  users: ImmutableList<UserBaseDataRecordInterface>;
  onFetchMoreUsersData: VoidFunction;
};

const GithubUsersList: React.FC<PropTypes> = ({
  users,
  isLoading,
  hasNextPage,
  onFetchMoreUsersData,
}) => {
  // if (isLoading) {
  //   return (
  //     <div className={styles.loaderWrapper}>
  //       <SearchUsersLoader />
  //     </div>
  //   );
  // }

  if (users.size === 0) {
    return <EmptyUsersListPlaceholder />;
  }

  // react-virtualized specific stuff
  const rowCount = hasNextPage ? users.size + 1 : users.size;
  const onLoadMoreRows = isLoading ? () => {} : onFetchMoreUsersData;
  const isRowLoaded = ({ index }: Index): boolean =>
    !hasNextPage || index < users.size;
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = 'Loading...';
    } else {
      const user = users.get(index);
      content = <GithubUserRow user={user} key={user.id} />;
    }

    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  };

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      loadMoreRows={onLoadMoreRows}
      rowCount={rowCount}>
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ height, width }) => (
            <List
              className={styles.usersList}
              width={width}
              height={height}
              rowHeight={83}
              rowCount={users.size}
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

export default GithubUsersList;
