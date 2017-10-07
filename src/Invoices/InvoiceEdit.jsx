import React from 'react';
import shortid from 'shortid';
import {Grid} from 'react-bootstrap';

import Form from './Form';
import Confirm from '../lib/Confirm';

export default class InvoiceEdit extends React.Component {
  state = {discount: 0, list: []};

  componentWillMount() {
    this.props.clear();
    this.props.getCustomerList();
    this.props.getProductList();
    this.invoice_id = this.props.match.params.id;
    this.props.getInvoice(this.invoice_id);
    this.props.getList(this.invoice_id);
  }

  componentWillReceiveProps(nextProps) {
    const invoice = nextProps.invoices.data[this.invoice_id];
    if (invoice) {
      const {discount, customer_id, total} = invoice;
      this.setState({customer_id, discount, total});
    }

    this.setState({list: nextProps.invoiceItems.list.map(e => {
      const {id, product_id, quantity} = nextProps.invoiceItems.data[e];
      return {id, product_id, quantity};
    })});
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

  dataToState(props) {

  }

  handleSubmit = async () => {
    const {customer_id, discount, total} = this.state;

    this.props.updateInvoice(this.invoice_id, {customer_id, discount, total});

    this.state.list.forEach(({id, product_id, quantity}, i) => {
      if (this.props.invoiceItems.list[i]) {
        if (quantity == 0)
          this.props.del(this.invoice_id, id);
        else if (quantity != this.props.invoiceItems.data[id].quantity)
          this.props.update(this.invoice_id, id, {product_id, quantity});

      } else {
        this.props.create(this.invoice_id, {product_id, quantity});
      }
    });

    this.props.history.push('/');
  }

  openConfirm = () => this.setState({confirm: true});
  closeConfirm = () => this.setState({confirm: false});

  handleDelete = () => {
    this.props.deleteInvoice(this.invoice_id);
    this.props.history.push('/');
  }

  render() {
    const {
      handleChange, handleAddProduct, handleQty, handleSubmit,
      handleDelete, openConfirm, closeConfirm,
      props: {customers, products},
      state: {customer_id, product_id, list, discount, total, confirm}
    } = this;
    return <Grid className='invoices edit'>
      <h1>Edit invoice</h1>
      <Form {...{
        customers, products, customer_id, product_id,
        discount, list, total,
        handleChange, handleAddProduct, handleQty, handleSubmit, openConfirm
      }}/>

      <Confirm
        show={confirm}
        onHide={closeConfirm}
        message={`Confirm deletion of the invoice ${this.invoice_id}`}
        confirm={handleDelete}
      />
    </Grid>;
  }
}
