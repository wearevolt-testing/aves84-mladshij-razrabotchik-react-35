import React from 'react';
import shortid from 'shortid';
import {Grid} from 'react-bootstrap';

import Form from './Form';


export default class InvoiceCreate extends React.Component {
  state = {discount: 0, list: []};

  componentWillMount() {
    this.props.getCustomerList();
    this.props.getProductList();
  }

  handleChange = e => {
    const {id, value} = e.target;

    this.calcTotal(this.state.list);
    this.setState({[id]: value});
  }

  handleQty = e => {
    e.stopPropagation();
    const {id: i, value} = e.target;
    const {list} = this.state;

    list[i].quantity = value;

    this.calcTotal(list);
    this.setState({list});
  }

  handleAddProduct = e => {
    if (this.state.product_id === undefined) return;

    const list = this.state.list.concat({
      id: shortid.generate(),
      product_id: this.state.product_id,
      quantity: 1
    });

    this.calcTotal(list);
    this.setState({list, product_id: undefined});
  }

  calcTotal(list) {
    let total = 0;
    for (const {product_id, quantity} of list)
      total += this.props.products.data[product_id].price * quantity;

    total = Math.round(total * (100 - this.state.discount)) / 100;

    this.setState({total});
  }

  handleSubmit = async () => {
    const {customer_id, discount, total, list} = this.state;
    const {payload: {id}} = (await this.props.createInvoice({customer_id, discount, total}));
    list.forEach(({product_id, quantity}) => quantity && this.props.createItem(id, {product_id, quantity}));
    this.props.history.push('/');
  }

  render() {
    const {
      handleChange, handleAddProduct, handleQty, handleSubmit,
      props: {customers, products},
      state: {customer_id, product_id, discount, list, total}
    } = this;
    return <Grid className='invoices edit'>
      <h1>Create invoice</h1>
      <Form {...{
        customers, products, customer_id, product_id,
        discount, list, total,
        handleChange, handleAddProduct, handleQty, handleSubmit
      }}/>
    </Grid>;
  }
}
