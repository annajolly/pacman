import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the game header and controls', () => {
  render(<App />);
  expect(screen.getByText('PACMAN')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'PLAY' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'STOP' })).toBeInTheDocument();
});
