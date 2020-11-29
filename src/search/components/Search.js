import React, { useState } from 'react';
import { Redirect } from 'react-router';
import SearchForm from './SearchForm';


const Search = () => {
  const [address, setAddress] = useState();

  const renderForm = () => (
    <div>
      <h1 className="header text-center">Znajdź ośrodek podstawowej opieki zdrowotnej (POZ)</h1>
      <SearchForm onSubmit={setAddress}/>
    </div>
  );

  const renderRedirect = () => (
    <Redirect to={`/address?address=${address}`} />
  );

  return address ? renderRedirect() : renderForm();
};

export default Search;