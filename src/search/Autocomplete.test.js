import React from 'react';

import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';

import getByValue from './testUtils';

import Autocomplete from './Autocomplete';

describe('<Autocomplete/>', () => {
  it('calls onChange with correct value when input changes', async () => {
    const onChange = jest.fn();
    
    render(<Autocomplete onChange={onChange} aria-label='autocomplete' />);
    const input = screen.getByLabelText('autocomplete');
    
    await user.type(input, 'va');

    expect(onChange).toBeCalledWith('va');
  });

  it('sets suggestions from onSearch when value length is equal to minLength', async () => {
    const onSearch = jest.fn().mockResolvedValue(['Idzikowskiego']);

    const { container } = render(<Autocomplete onSearch={onSearch} aria-label='autocomplete' />);
    const input = screen.getByLabelText('autocomplete');

    await user.type(input, 'abc');

    expect(onSearch).toBeCalledWith('abc');

    waitFor(() => {
      const suggestion = getByValue(container, 'Idzikowskiego');
      expect(suggestion).toBeTruthy();
    });
  });
});