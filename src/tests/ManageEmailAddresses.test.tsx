import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManageEmailAddresses from '../components/email-addresses/ManageEmailAddresses';

test('renders ManageEmailAddresses with initial state from .json file', () => {
  render(<ManageEmailAddresses/>);
  expect(screen.getByText('ann@timescale.com')).toBeInTheDocument();
  expect(screen.queryByText('brian@qwerty.com')).toBeNull();
});

test('expands selected groups', () => {
  render(<ManageEmailAddresses/>);
  expect(screen.queryByText('brian@qwerty.com')).toBeNull();
  fireEvent.click(screen.getByText('Company Recipients'));
  expect(screen.getByText('brian@qwerty.com')).toBeInTheDocument();

  expect(screen.queryByText('mike@hello.com')).toBeNull();
  fireEvent.click(screen.getByText('Email Recipients'));
  expect(screen.getByText('mike@hello.com')).toBeInTheDocument();
});

test('can select individual recipient', () => {
  render(<ManageEmailAddresses/>);
  expect(screen.getByText('ann@timescale.com')).toBeInTheDocument();
  fireEvent.click(screen.getByText('ann@timescale.com'));
  expect(screen.queryByText('ann@timescale.com')).toBeNull();

  fireEvent.click(screen.getByText('Email Recipients'));
  expect(screen.getByText('ann@timescale.com')).toBeInTheDocument();
});

test('can select domain group', () => {
  render(<ManageEmailAddresses/>);
  expect(screen.getByText('timescale.com')).toBeInTheDocument();
  fireEvent.click(screen.getByText('timescale.com'));
  expect(screen.queryByText('ann@timescale.com')).toBeNull();

  fireEvent.click(screen.getByText('Company Recipients'));
  expect(screen.getByText('ann@timescale.com')).toBeInTheDocument();
  expect(screen.getByText('bob@timescale.com')).toBeInTheDocument();
});

test('can add valid recipient', () => {
  render(<ManageEmailAddresses/>);

  const input = screen.getByPlaceholderText('Search'); 
  fireEvent.change(input, { target: { value: 'invalid value' } });
  expect(screen.queryByText('Add recipient')).toBeNull();
  fireEvent.change(input, { target: { value: 'lindsay@timescale.com' } });
  expect(screen.getByText('Add recipient')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Add recipient'));
  expect(input.getAttribute('value')).toBe('');
  expect(screen.getByText('lindsay@timescale.com')).toBeInTheDocument();
});