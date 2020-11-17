import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import SearchForm from './search/SearchForm';

import Container from 'react-bootstrap/Container';

import './App.css';


const App = () => (
  <Container className="h-100">
    <Router>
      <Switch>
        <Route path="/street">
          <Street/>
        </Route>
        <Route path="/">
          <Search/>
        </Route>
      </Switch>
    </Router>
  </Container>
);

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

const Street = () => {
  return (
    <h2>Street TODO</h2>
  );
}

export default App;
