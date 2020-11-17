import React from 'react';
import Autocomplete from './Autocomplete';

import userEvent from '@testing-library/user-event'
import { render, act, fireEvent, waitForElement, screen } from '@testing-library/react';


describe('<Autocomplete/>', () => {
  it('calls onChange with correct value when input changes', async () => {
    const onChange = jest.fn();
    
    render(<Autocomplete onChange={onChange} aria-label='autocomplete' />);
    const input = screen.getByLabelText('autocomplete');
    
    await act(() => userEvent.type(input, 'va'));

    expect(onChange).toBeCalledWith('va');
  });

  it('sets empty suggestions when typed value is smaller than minLength', async () => {    
    render(<Autocomplete aria-label='autocomplete' />);
    const input = screen.getByLabelText('autocomplete');
    
    await act(() => userEvent.type(input, 'ab'));

    const suggestions = screen.getByTestId('suggestions');
    expect(suggestions.children).toHaveLength(0);
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

    render(<Autocomplete onSearch={onSearch} aria-label='autocomplete' />);
    const input = screen.getByLabelText('autocomplete');

    await act(() => userEvent.type(input, 'val'));

    const suggestions = await screen.findByTestId('suggestions');
    expect(suggestions.children[0].value).toEqual('Idzikowskiego');
  });
});