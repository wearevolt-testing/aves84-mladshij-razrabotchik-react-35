import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import promiseMiddleware from 'redux-promise';

import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {Helmet} from 'react-helmet';

import 'react-select/dist/react-select.css';
import './style.css';

import Customers, {reducer as customersReducer} from './Customers';

const store = createStore(combineReducers({
  customers: customersReducer
}), compose(
  applyMiddleware(promiseMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

const App = () => <Provider store={store}>
  <Router>
    <div>
      <Helmet>
        <title>App</title>
      </Helmet>
      
      <header>
        <Navbar>
          <Navbar.Header><Navbar.Brand>Invoice App</Navbar.Brand></Navbar.Header>
          <Nav>
            <LinkContainer to='/invoices'><NavItem eventKey={1}>Invoices</NavItem></LinkContainer>
            <LinkContainer to='/products'><NavItem eventKey={2}>Products</NavItem></LinkContainer>
            <LinkContainer to='/customers'><NavItem eventKey={3}>Customers</NavItem></LinkContainer>
          </Nav>
          
        </Navbar>
      </header>
      
      <Route path='/customers' component={Customers}/>
    </div>
  </Router>
</Provider>;

render(<App />, document.getElementById('app-root'));
