import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

import Search from './search/components/Search';
import AddressDetails from './address-details/components/AddressDetails';

import Container from 'react-bootstrap/Container';

import './App.css';


const App = () => (
  <Router>
    <Page/>
  </Router>
);

const Page = () => {
  let query = useQuery();

  return (
    <Container className="h-100">
      <Switch>
        <Route path="/address">
          <AddressDetails address={query.get('address')}/>
        </Route>
        <Route path="/">
          <Search/>
        </Route>
      </Switch>
    </Container>
  );
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default App;
