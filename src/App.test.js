import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders GH Users Explorer paragraph', () => {
  const { getByText } = render(<App />);
  const paragraphElement = getByText(/GH Users Explorer/i);
  expect(paragraphElement).toBeInTheDocument();
});
