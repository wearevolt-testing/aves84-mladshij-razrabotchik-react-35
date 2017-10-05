import React from 'react';
import {createActions, handleActions, combineActions} from 'redux-actions';
import {connect} from 'react-redux';
import {Grid} from 'react-bootstrap';
import {Helmet} from 'react-helmet';
import request from 'superagent';

import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import CustomerModal from './CustomerModal';


const {getCustomerList, createCustomer, editCustomer, deleteCustomer} = createActions({
  GET_CUSTOMER_LIST: async () => await request.get('/api/customers').then(res => res.body),
  CREATE_CUSTOMER: async data => await request.post('/api/customers').send(data).then(res => res.body),
  EDIT_CUSTOMER: async (data, id) => await request.put(`/api/customers/${id}`).send(data).then(res => res.body),
  DELETE_CUSTOMER: async id => await request.delete(`/api/customers/${id}`).then(res => res.body),
});

export const reducer = handleActions({
  [getCustomerList]: (state, action) => action.payload.reduce((s, e) => {
    s.list.push(e.id);
    s.data[e.id] = e;
    return s;
  }, {list: [], data: {}}),
  [combineActions(createCustomer, editCustomer)]: (state, action) => {
    const {id} = action.payload;
    const list = state.list.indexOf(id) === -1 ? state.list.concat(id) : state.list;
    const data = {...state.data, [id]: action.payload};
    return {list, data};
  },
  [deleteCustomer]: (state, action) => {
    const {id} = action.payload;
    return state.list.reduce((s, e) => {
      if (e !== id) {
        s.list.push(e);
        s.data[e] = state.data[e];
      }
      return s;
    }, {list: [], data: {}});
  }
}, {list: [], data: {}});


class Customers extends React.Component {
  state = {};
  
  componentDidMount() {
    this.props.getCustomerList();
  }
  
  openCustomerForm = type => this.setState({showCustomerForm: type});
  closeCustomerForm = () => this.setState({showCustomerForm: false});
  openCustomer = id => this.setState({showCustomer: id});
  closeCustomer = () => this.setState({showCustomer: null});
  
  handleSubmit = (data, type) => {
    switch (type) {
      case 'create': this.props.createCustomer(data); break;
      case 'edit': this.props.editCustomer(data, this.state.showCustomer); break;
    }
    this.closeCustomerForm();
  };
  
  handleDelete = () => {
    this.props.deleteCustomer(this.state.showCustomer);
    this.closeCustomer();
  };
  
  render() {
    return <Grid className='customers'>
      <Helmet>
        <title>Customers</title>
      </Helmet>
      
      <CustomerList
        openCustomerForm={this.openCustomerForm}
        openCustomer={this.openCustomer}
        customers={this.props.customers}
      />
      
      <CustomerModal
        id={this.state.showCustomer}
        customers={this.props.customers.data}
        onHide={this.closeCustomer}
        openCustomerForm={this.openCustomerForm}
        handleDelete={this.handleDelete}
      />
      
      <CustomerForm
        type={this.state.showCustomerForm}
        id={this.state.showCustomer}
        customers={this.props.customers.data}
        onHide={this.closeCustomerForm}
        handleSubmit={this.handleSubmit}
      />
    </Grid>;
  }
}


export default connect(
  ({customers}) => ({customers}),
  {getCustomerList, createCustomer, editCustomer, deleteCustomer}
)(Customers);
