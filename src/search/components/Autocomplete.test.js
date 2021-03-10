import React from 'react';

import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';

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

    const { container } = render(<Autocomplete
      onSearch={onSearch}
      onSuggestionSelected={onSuggestionSelected}
      aria-label='autocomplete' />
    );

    const input = screen.getByLabelText('autocomplete');

    await user.type(input, 'abc');

    const suggestion = await screen.findByText('Idzikowskiego');
    await user.click(suggestion);
    
    expect(screen.queryByText('Idzikowskiego')).toBeFalsy();
    expect(onSuggestionSelected).toBeCalledWith('Idzikowskiego');
  });
});