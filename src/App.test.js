import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders GH Users Explorer paragraph', () => {
    render(<App />);
    const paragraphElement = screen.getByText(/GH Users Explorer/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test.skip('', async () => {
    render(<App />);
  });
})
