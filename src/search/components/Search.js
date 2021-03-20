import React, { useState } from 'react';
import AddressDetails from '../../address-details/components/AddressDetails';
import SearchForm from './SearchForm';


const Search = () => {
  const [address, setAddress] = useState();

  return (
    <div>
      <h2 className="header text-center mb-4">Znajdź ośrodek podstawowej opieki zdrowotnej (POZ)</h2>
      <SearchForm onSubmit={setAddress}/>
      { address && (<AddressDetails address={address} className="d-flex justify-content-center mt-5"/>)}
    </div>
  );
};

export default Search;