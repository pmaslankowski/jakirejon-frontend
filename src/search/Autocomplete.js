import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

const Autocomplete = props => {
  const suggestionsUuid = uuidv4();

  const { value, onSearch, onChange, minLength, ...other } = props;
  
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async e => {
    const newVal = e.target.value;
    onChange(newVal);
    if (newVal.length >= minLength) {
      const suggestionsFound = await onSearch(newVal);
      setSuggestions(suggestionsFound);
    } else {
      setSuggestions([]);
    }
  }

  const renderSuggestions = () => {
    const suggestionsToRender = suggestions.map(s => (<option value={s} key={s}/>));
    return (
      <datalist id={suggestionsUuid} data-testid="suggestions">
        {suggestionsToRender}
      </datalist>
    )
  }

  return (
    <>
      <Form.Control 
        type="text" 
        list={suggestionsUuid}
        onChange={handleChange}
        value={value} 
        {...other} />
      {renderSuggestions()}
    </>
  )
}

Autocomplete.defaultProps = {
  value: '',
  minLength: 3,
  onSearch: async () => {},
  onChange: () => {}
};

Autocomplete.propTypes = {
  value: PropTypes.string,
  minLength: PropTypes.number,
  onSearch: PropTypes.func,
  onChange: PropTypes.func
};

export default Autocomplete;