import React from 'react';

import Search from './search/components/Search';
import Container from 'react-bootstrap/Container';

import './App.css';


const App = () => {

  return (
    <Container className="h-100">
      <div className="h-25"/>
      <div className="d-flex flex-wrap justify-content-center">
        <Search/>
      </div>
    </Container>
  );
};

export default App;
