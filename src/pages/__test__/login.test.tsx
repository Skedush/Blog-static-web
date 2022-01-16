import 'jest';
import Login from '../Login';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
global.React = React;

const mockDispatch = jest.fn();
jest.mock('umi', () => ({
  useDispatch: () => mockDispatch,
}));

test('unit test', async () => {
  render(<Login />);

  expect(screen.queryByRole('button')).toBeVisible();
  expect(screen.queryByRole('button')).toHaveTextContent('登 录');
  expect(mockDispatch).toBeCalledTimes(0);
  await waitFor(() => fireEvent.click(screen.queryByRole('button')));
  expect(mockDispatch).toBeCalledTimes(1);
});
