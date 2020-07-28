import React from 'react';
import { render } from '@testing-library/react';
import App from './index';

test('renders search form', () => {
  const { getByTestId } = render(<App />);
  const searchForm = getByTestId('search-form');
  expect(searchForm).toBeInTheDocument();
});
