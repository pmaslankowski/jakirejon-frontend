import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Search from './search/components/Search';

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

const Street = () => {
  return (
    <h2>Street TODO</h2>
  );
}

export default App;
