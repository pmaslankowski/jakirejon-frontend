import React from 'react';

import user from '@testing-library/user-event';
import { render, waitFor, screen } from '@testing-library/react';

import getByValue from '../../testUtils';
import SearchForm from './SearchForm';
import api from '../search-api';

jest.mock('../search-api');

const inputLabel = /search-input/i;
const submitText = /szukaj/i;
const errorText = /poprawny adres/i;

describe('<SearchForm/>', () => {
  it('handles user typing', async () => {
    const { container } = render(<SearchForm/>);
    
    api.fetchMatchingStreets = jest.fn().mockResolvedValue(['Idzikowskiego']);

    const input = screen.getByLabelText(inputLabel);
    await user.type(input, 'idzik');

    const error = screen.queryByText(errorText);
    expect(error).toBeFalsy();

    waitFor(() => {
      const suggestion = getByValue(container, 'Idzikowskiego');
      expect(suggestion).toBeTruthy();
    });
  });

  it('shows error when user submits empty address', () => {
    render(<SearchForm/>);

    const submit = screen.getByText(submitText);

    user.click(submit);

    const error = screen.getByText(errorText);
    expect(error).toBeTruthy();
  });

  it('handles typing and valid submission', async () => {
    const onSubmit = jest.fn();

    const { container } = render(<SearchForm onSubmit={onSubmit}/>);

    api.fetchMatchingStreets = jest.fn().mockResolvedValue(['Idzikowskiego']);

    const input = screen.getByLabelText(inputLabel);
    await user.type(input, 'idzikowskiego 123a');
    user.click(screen.getByText(submitText));

    const error = screen.queryByText(errorText);
    expect(error).toBeFalsy();

    expect(onSubmit).toHaveBeenCalledWith('idzikowskiego 123a');

    waitFor(() => {
      const suggestion = getByValue(container, 'Idzikowskiego');
      expect(suggestion).toBeTruthy();
    });
  });

  it('handles suggestion selection and valid submission', async () => {
    const onSubmit = jest.fn();

    const { container } = render(<SearchForm onSubmit={onSubmit}/>);

    api.fetchMatchingStreets = jest.fn().mockResolvedValue(['Idzikowskiego']);

    const input = screen.getByLabelText(inputLabel);
    await user.type(input, 'idzikawskiego-with-mistake 123a');
    
    const suggestion = await screen.findByText('Idzikowskiego');
    await user.click(suggestion);

    await user.click(screen.getByText(submitText));
    expect(onSubmit).toHaveBeenCalledWith('Idzikowskiego 123a');
  });

  it('handles typing after incorrect submission', async () => {
    const { container } = render(<SearchForm/>);

    api.fetchMatchingStreets = jest.fn().mockResolvedValue(['Idzikowskiego']);

    const input = screen.getByLabelText(inputLabel);
    user.click(screen.getByText(submitText));
    await user.type(input, 'val');

    const error = screen.queryByText(errorText);
    expect(error).toBeFalsy();

    waitFor(() => {
      const suggestion = getByValue(container, 'Idzikowskiego');
      expect(suggestion).toBeTruthy();
    });
  });
});