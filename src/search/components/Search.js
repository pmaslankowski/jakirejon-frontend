import React from 'react';

import SearchForm from './SearchForm';


const Search = () => {
  return (
    <div class="h-100 d-flex flex-wrap justify-content-center align-items-center">
      <div>
        <h1 className="header text-center">Znajdź ośrodek podstawowej opieki zdrowotnej (POZ)</h1>
        <SearchForm onSubmit={selected => console.log(' sel' + selected)}/>
      </div>
    </div>
  );
};

export default Search;