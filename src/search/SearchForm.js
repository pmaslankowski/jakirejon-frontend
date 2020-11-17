import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { fetchMatchingStreets } from './search-api';
import Autocomplete from './Autocomplete';


const SearchForm = props => {
  const { onSubmit } = props;

  const [value, setValue] = useState('');

  return (
    <Form className="text-center">
      <Form.Group>
        <Autocomplete 
          onChange={val => setValue(val)}
          onSearch={getSuggestions}
          value={value}
        />
      </Form.Group>
      <Button className="variant">Szukaj</Button>
    </Form>
  );
};

const parse = text => {
  const regex = /([^\d\s]*)(\s+(.*))?/;
  const match = text.match(regex);
  return { street: match[1], apartment: match[3] };
}

const getSuggestions = async val => {
  const { street } = parse(val);
  return await fetchMatchingStreets(street);
}

export default SearchForm;