import React from 'react';
import ContentLoader from 'react-content-loader';

const SearchUsersLoader: React.FC = () => (
  <ContentLoader
    speed={2}
    width={600}
    height={500}
    viewBox="0 0 600 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="30" cy="30" r="30" />
    <rect x="80" y="0" rx="5" ry="5" width="500" height="60" />
    <circle cx="30" cy="130" r="30" />
    <rect x="80" y="100" rx="5" ry="5" width="500" height="60" />
    <circle cx="30" cy="230" r="30" />
    <rect x="80" y="200" rx="5" ry="5" width="500" height="60" />
    <circle cx="30" cy="330" r="30" />
    <rect x="80" y="300" rx="5" ry="5" width="500" height="60" />
    <circle cx="30" cy="430" r="30" />
    <rect x="80" y="400" rx="5" ry="5" width="500" height="60" />
  </ContentLoader>
);

export default SearchUsersLoader;
