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

type PropTypes = {
  hasNextPage: boolean;
  isLoading: boolean;
  userIds: ImmutableList<number>;
  onFetchMoreUsersData: VoidFunction;
};

const GithubUsersList: React.FC<PropTypes> = ({
  isLoading,
  hasNextPage,
  userIds,
  onFetchMoreUsersData,
}) => {
  // if (isLoading) {
  //   return (
  //     <div className={styles.loaderWrapper}>
  //       <SearchUsersLoader />
  //     </div>
  //   );
  // }

  if (userIds.size === 0) {
    return <EmptyUsersListPlaceholder />;
  }

  // react-virtualized specific stuff
  const rowCount = hasNextPage ? userIds.size + 1 : userIds.size;
  const onLoadMoreRows = isLoading ? () => {} : onFetchMoreUsersData;
  const isRowLoaded = ({ index }: Index): boolean =>
    !hasNextPage || index < userIds.size;
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = 'Loading...';
    } else {
      const userId = userIds.get(index);
      if (!userId) {
        content = 'User not found :(';
      } else {
        content = <GithubUserRow userId={userId} key={userId} />;
      }
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
              rowCount={userIds.size}
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
