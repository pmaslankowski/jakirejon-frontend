import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

import styles from './Autocomplete.module.css';


const Autocomplete = props => {
  const { 
    value, 
    onSearch,
    onChange, 
    onSuggestionSelected,
    extractKey,
    minLength, 
  ...other } = props;
  
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [key, setKey] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    const updateSuggestions = async () => {
      if (key.length > minLength) {
        const suggestions = await onSearch(key);
        setSuggestions(suggestions);
        setShowSuggestions(!isSuggested(key));  
      }
    };
    updateSuggestions();
  }, [key]);

  const isSuggested = (key) => {
    return suggestions.map(x => x.toLowerCase()).includes(key.toLowerCase());
  };

  const handleChange = async e => {
    const val = e.target.value;;
    onChange(val);
    setKey(extractKey(val));
  }

  const handleSuggestionSelected = suggestion => {
    setShowSuggestions(false);
    inputRef.current.focus();
    onSuggestionSelected(suggestion);
  }

  const renderSuggestions = () => {
    return showSuggestions && suggestions.length > 0 && (
      <ul className={styles.suggestionsList}>
        {suggestions.map(renderSuggestion)}
      </ul>
    );
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
  extractKey: value => value,
  minLength: 3,
  onSearch: async () => {},
  onChange: () => {},
  onSuggestionSelected: () => {},
};

Autocomplete.propTypes = {
  /** Value visible in autocomplete input. */
  value: PropTypes.string,
  /** Function extracting key from input value. */
  extractKey: PropTypes.func,
  /** Minimal length of value that triggers suggestions. */
  minLength: PropTypes.number,
  /** Callback function providing suggestions for a given key. */
  onSearch: PropTypes.func,
  /** Callback function triggered on every input change. */
  onChange: PropTypes.func,
  /** Callback function triggered when suggestion is selected by user. */
  onSuggestionSelected: PropTypes.func,
};

export default Autocomplete;