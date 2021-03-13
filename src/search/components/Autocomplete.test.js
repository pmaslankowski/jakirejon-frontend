import React from 'react';

import user from '@testing-library/user-event'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import Autocomplete from './Autocomplete';

describe('<Autocomplete/>', () => {
  it('calls onChange with correct value when input changes', async () => {
    const onChange = jest.fn();
    
    render(<Autocomplete onChange={onChange} aria-label='autocomplete' />);
    const input = screen.getByLabelText('autocomplete');
    
    await user.type(input, 'va');

    expect(onChange).toBeCalledWith('va');
  });

  it('shows suggestions and handles clicked suggestion', async () => {
    const onSearch = jest.fn().mockResolvedValue(['Idzikowskiego']);
    const onSuggestionSelected = jest.fn();

    render(<Autocomplete
      onSearch={onSearch}
      onSuggestionSelected={onSuggestionSelected}
      aria-label='autocomplete' />
    );

    const input = screen.getByLabelText('autocomplete');

    await user.type(input, 'Idzikows');

    const suggestion = await screen.findByText('Idzikowskiego');
    user.click(suggestion);
    
    expect(screen.queryByText('Idzikowskiego')).toBeFalsy();
    expect(onSuggestionSelected).toBeCalledWith('Idzikowskiego');
    expect(input).toHaveFocus();
  });

  it('should hide suggestion when suggestions contain current value', async () => {
    const onSearch = jest.fn().mockResolvedValue(['Idzikowskiego']);
    const onSuggestionSelected = jest.fn();

    render(<Autocomplete
      onSearch={onSearch}
      onSuggestionSelected={onSuggestionSelected}
      aria-label='autocomplete' />
    );

    const input = screen.getByLabelText('autocomplete');

    await user.type(input, 'Idzikows');
    const suggestion = await screen.findByText('Idzikowskiego');
    expect(suggestion).toBeTruthy();
    
    user.type(input, 'Idzikowskiego', { delay: 1});
    await waitForElementToBeRemoved(screen.queryByText('Idzikowskiego'));
  });

  it('should hide suggestions when user deletes the value', async () => {
    const onSearch = jest.fn().mockResolvedValue(['Idzikowskiego']);
    const onSuggestionSelected = jest.fn();

    render(<Autocomplete
      onSearch={onSearch}
      onSuggestionSelected={onSuggestionSelected}
      aria-label='autocomplete' />
    );
    
    const input = screen.getByLabelText('autocomplete');
    
    await user.type(input, 'Idzikowsk');
    expect(await screen.findByText('Idzikowskiego')).toBeTruthy();

    await user.type(input, 'Id');
    expect(screen.queryByText('Idzikowskiego')).toBeFalsy();
  });
});