import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import api from './../search-api';
import { parseAddress } from './../address';
import Autocomplete from './Autocomplete';


const SearchForm = props => {
  const { onSubmit } = props;

  const [value, setValue] = useState('');
  const [isInvalid, setInvalid] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    if (value) {
      onSubmit(value);
    } else {
      setInvalid(true);
    }
  };

  const handleChange = val => {
    setValue(val);
    setInvalid(false);
  }

  const handleSuggestionSelected = suggestion => {
    const { apartment } = parseAddress(value);
    const newValue = `${suggestion} ${apartment}`;
    setValue(newValue);
  }

  const getStreet = (address) => {
    const { street } = parseAddress(address);
    return street;
  }

  return (
    <Form className="text-center" >
      <Form.Group>
        <Autocomplete
          aria-label="search-input"
          onChange={handleChange}
          onSearch={getSuggestions}
          onSuggestionSelected={handleSuggestionSelected}
          extractKey={getStreet}
          value={value}
          className={isInvalid && "is-invalid"}
        />

        { isInvalid && (
          <div>
            <span className="text-danger">
              Wprowadź poprawny adres
            </span>      
          </div>
        )}
      </Form.Group>
      <Button className="variant" onClick={handleClick}>Szukaj</Button>
    </Form>
  );
};

const getSuggestions = async street => {
  return await api.fetchMatchingStreets(street);
}

SearchForm.defaultProps = {
  onSubmit: () => {}
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func
};

export default SearchForm;