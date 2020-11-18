import React from 'react';

import userEvent from '@testing-library/user-event'
import { render, act, screen } from '@testing-library/react';

import getByValue from './testUtils';

import Autocomplete from './Autocomplete';

describe('<Autocomplete/>', () => {
  it('calls onChange with correct value when input changes', async () => {
    const onChange = jest.fn();
    
    render(<Autocomplete onChange={onChange} aria-label='autocomplete' />);
    const input = screen.getByLabelText('autocomplete');
    
    await act(() => userEvent.type(input, 'va'));

    expect(onChange).toBeCalledWith('va');
  });

  it('calls onSearch with correct value when its length is equal to minLength', async () => {
    const onSearch = jest.fn().mockResolvedValue([]);

    render(<Autocomplete aria-label='autocomplete' onSearch={onSearch} />);
    const input = screen.getByLabelText('autocomplete');

    await act(() => userEvent.type(input, 'abc'));

    expect(onSearch).toBeCalledWith('abc');
  });

  it('sets suggestions from onSearch when value length is equal to minLength', async () => {
    const onSearch = jest.fn().mockResolvedValue(['Idzikowskiego']);

    const { container } = render(<Autocomplete onSearch={onSearch} aria-label='autocomplete' />);
    const input = screen.getByLabelText('autocomplete');

    await act(() => userEvent.type(input, 'val'));

    const suggestion = getByValue(container, 'Idzikowskiego');
    expect(suggestion).toBeTruthy();
  });
});