import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {connect, Provider} from 'react-redux';

import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';

import {Helmet} from 'react-helmet';

import 'react-select/dist/react-select.css';
import './style.css';

import createListComponent from './EntityList';
import store, {customerActions, productActions, invoiceActions, invoiceItemActions} from './store';
import * as Invoices from './Invoices';


const Customers = createListComponent({
  name: 'customer',
  title: 'Customer',
  fields: [['name', 'Name'], ['address', 'Address'], ['phone', 'Phone']],
  mapState: state => state.customers,
  actions: customerActions
});

const Products = createListComponent({
  name: 'product',
  title: 'Product',
  fields: [['name', 'Name'], ['price', 'Price']],
  mapState: state => state.products,
  actions: productActions
});

const InvoiceList = connect(
  ({invoices, customers}) => ({invoices, customers}),
  {
    ...invoiceActions,
    getCustomerList: customerActions.getList,
    getCustomer: customerActions.read
  }
)(Invoices.List);

const InvoiceCreate = connect(
  ({invoices, customers, products, invoiceItems}) => ({invoices, customers, products, invoiceItems}),
  {
    createInvoice: invoiceActions.create,
    createItem: invoiceItemActions.create,
    getCustomerList: customerActions.getList,
    getProductList: productActions.getList
  }
)(Invoices.Create);

const InvoiceEdit = connect(
  ({invoices, customers, products, invoiceItems}) => ({invoices, customers, products, invoiceItems}),
  {
    ...invoiceItemActions,
    getInvoice: invoiceActions.read,
    updateInvoice: invoiceActions.update,
    deleteInvoice: invoiceActions.del,
    getCustomerList: customerActions.getList,
    getProductList: productActions.getList
  }
)(Invoices.Edit);

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
            <IndexLinkContainer to='/'><NavItem eventKey={1}>Invoices</NavItem></IndexLinkContainer>
            <LinkContainer to='/products'><NavItem eventKey={2}>Products</NavItem></LinkContainer>
            <LinkContainer to='/customers'><NavItem eventKey={3}>Customers</NavItem></LinkContainer>
          </Nav>

        </Navbar>
      </header>

      <Route exact path='/' component={InvoiceList}/>
      <Route path='/invoices/create' component={InvoiceCreate} />
      <Route path='/invoices/:id/edit' component={InvoiceEdit} />
      <Route path='/customers' component={Customers}/>
      <Route path='/products' component={Products}/>
    </div>
  </Router>
</Provider>;

render(<App />, document.getElementById('app-root'));
