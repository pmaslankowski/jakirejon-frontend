import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';

const Autocomplete = props => {
  const {
    value = '', 
    onSearch = async () => {}, 
    onChange = () => {}, 
        minLength = 3, 
        ...other
  } = props;
  
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
      // TODO: jakieś lepsze id dla tej listy
      <datalist id="suggestions" data-testid="suggestions">
        {suggestionsToRender}
      </datalist>
    )
  }

  return (
    <>
      <Form.Control 
        type="text" 
        list="suggestions"
        onChange={handleChange}
        value={value} 
        {...other} />
      {renderSuggestions()}
    </>
  )
}

export default Autocomplete;