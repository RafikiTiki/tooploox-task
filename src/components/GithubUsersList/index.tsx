import React from 'react';
import {
  InfiniteLoader,
  List,
  WindowScroller,
  AutoSizer,
  Index,
} from 'react-virtualized';
import { GithubUserBaseData } from '../../api/types';
import GithubUserRow from '../GithubUserRow';
import styles from './styles.module.css';
import EmptyUsersListPlaceholder from '../EmptyUsersListPlaceholder';
import { SearchUsersLoader } from '../loaders';
import { ListRowRenderer } from 'react-virtualized/dist/es/List';

type PropTypes = {
  hasNextPage: boolean;
  isLoading: boolean;
  isLoadingNextPage: boolean;
  users: GithubUserBaseData[];
  onFetchMoreUsersData: VoidFunction;
};

const GithubUsersList: React.FC<PropTypes> = ({
  users,
  isLoading,
  hasNextPage,
  isLoadingNextPage,
  onFetchMoreUsersData,
}) => {
  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <SearchUsersLoader />
      </div>
    );
  }

  if (users.length === 0) {
    return <EmptyUsersListPlaceholder />;
  }

  // react-virtualized specific stuff
  const rowCount = hasNextPage ? users.length + 1 : users.length;
  const onLoadMoreRows = isLoadingNextPage ? () => {} : onFetchMoreUsersData;
  const isRowLoaded = ({ index }: Index): boolean =>
    !hasNextPage || index < users.length;
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = 'Loading...';
    } else {
      const user = users[index];
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
              rowCount={users.length}
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
