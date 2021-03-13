import React from 'react';
import { findByText, render, screen } from '@testing-library/react';

import addressDetailsApi from '../address-details-api';
import AddressDetails from './AddressDetails';

jest.mock('../address-details-api');

describe('<AddressDetails/>', () => {
  beforeEach(jest.useFakeTimers);
  afterEach(jest.useRealTimers);

  it('fetches address details and renders them', async () => {
    const details = {
      address: 'Testowa 123a',
      hospital: {
        name: 'testowy szpital',
        address: 'Szpitalna 23',
        phone: '123 456 789'
      }
    };

    addressDetailsApi.fetchAddressDetails = jest.fn().mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(details), 100))
    );

    render(<AddressDetails address={'Testowa 123'} />);

    expect(await screen.findByRole(/status/i)).toBeTruthy();

    jest.advanceTimersByTime(200);

    expect(await screen.findByText(/testowa/i)).toBeTruthy();
    expect(await screen.findByText(/testowy szpital/i)).toBeTruthy();
    expect(await screen.findByText(/szpitalna/i)).toBeTruthy();
    expect(await screen.findByText(/123 456 789/i)).toBeTruthy();
  });

  it('shows error message when api returns an error', async () => {
    addressDetailsApi.fetchAddressDetails = jest.fn().mockRejectedValue({
      message: 'error!'
    });

    render(<AddressDetails address={'Testowa 123'} />);
    
    expect(await screen.findByRole(/status/i)).toBeTruthy();
    
    jest.advanceTimersByTime(200);
    
    expect(await screen.findByText('error!')).toBeTruthy();
  });
})