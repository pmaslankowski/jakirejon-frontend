import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

import styles from './Autocomplete.module.css';

const Autocomplete = props => {
  const { value, onSearch, onChange, onSuggestionSelected, minLength, ...other } = props;
  
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

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

  const handleSuggestionSelected = suggestion => {
    setSuggestions([]);
    inputRef.current.focus();
    onSuggestionSelected(suggestion);
  }

  const renderSuggestions = () => {
    return suggestions.length > 0 && (
      <ul className={styles.suggestionsList}>
        {suggestions.map(renderSuggestion)}
      </ul>
    )
  }

  const renderSuggestion = suggestion => (
    <li className={styles.suggestion}
        key={suggestion}
        onClick={() => handleSuggestionSelected(suggestion)}>
      {suggestion}
    </li>
  );

  return (
    <div className={styles.container}>
      <Form.Control 
        type="text" 
        onChange={handleChange}
        value={value}
        ref={inputRef} 
        {...other}/>
      {renderSuggestions()}
    </div>
  )
}

Autocomplete.defaultProps = {
  value: '',
  minLength: 3,
  onSearch: async () => {},
  onChange: () => {},
  onSuggestionSelected: () => {}
};

Autocomplete.propTypes = {
  value: PropTypes.string,
  minLength: PropTypes.number,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
  onSuggestionSelected: PropTypes.func
};

export default Autocomplete;