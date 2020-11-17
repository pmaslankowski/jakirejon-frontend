import React, { useState } from 'react';

import SearchForm from './search/SearchForm';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';


const App = () => (
  <Container className="h-100">
    <div class="h-100 d-flex flex-wrap justify-content-center align-items-center">
    <div>
    <h1 className="header text-center">Znajdź ośrodek podstawowej opieki zdrowotnej (POZ)</h1>
    <SearchForm onSubmit={selected => console.log(' sel' + selected)}/>
    </div>
    </div>
  </Container>
);

export default App;