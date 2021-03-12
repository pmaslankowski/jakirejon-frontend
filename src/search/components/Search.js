import React, { useState } from 'react';
import AddressDetails from '../../address-details/components/AddressDetails';
import SearchForm from './SearchForm';


const Search = () => {
  const [address, setAddress] = useState();

  return (
    <div>
      <h1 className="header text-center">Znajdź ośrodek podstawowej opieki zdrowotnej (POZ)</h1>
      <SearchForm onSubmit={setAddress}/>
      { address && (<AddressDetails address={address} className="d-flex justify-content-center mt-5"/>)}
    </div>
  );
};

export default Search;