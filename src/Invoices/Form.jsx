import React from 'react';
import {Button, Table, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

import FieldGroup from '../lib/FieldGroup';


export default ({
  customers, products, customer_id, product_id,
  discount, list, total,
  handleChange, handleAddProduct, handleQty, handleSubmit, openConfirm
}) => <form onChange={handleChange}>
  <div className='fields'>
    <FieldGroup id='discount' label='Discount (%)' type='number' min={0} max={100} value={discount} />

    <FormGroup controlId='customer_id' >
      <ControlLabel>Customer</ControlLabel>
      <FormControl componentClass='select' placeholder='select' value={customer_id || ''}>
        <option disabled value=''> -- select a customer -- </option>
        {customers.list.map(id => <option key={id} value={id}>
          {customers.data[id].name}
        </option>)}
      </FormControl>
    </FormGroup>

    <FormGroup controlId='product_id'>
      <ControlLabel>Add product</ControlLabel>
      <div className='abreast'>
        <FormControl componentClass='select' placeholder='select' value={product_id || ''} >
          <option disabled value=''> -- select a product -- </option>
          {products.list.map(id => <option key={id} value={id}>
            {products.data[id].name}
          </option>)}
        </FormControl>
        <Button onClick={handleAddProduct}>Add</Button>
      </div>
    </FormGroup>
  </div>

  <Table>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
        <th>Qty</th>
      </tr>
    </thead>
    <tbody>
      {list.map(({id, product_id, quantity}, i) => <tr key={id}>
        <td>{i + 1}</td>
        <td>{products.data[product_id].name}</td>
        <td>{products.data[product_id].price}</td>
        <td><FormControl id={String(i)} type='number' min={0} value={quantity} onChange={handleQty} /></td>
      </tr>)}
    </tbody>
  </Table>

  <h3>Total: {(total || 0).toFixed(2)}</h3>

  <div className='controls'>
    {handleSubmit && <Button onClick={handleSubmit}>Submit</Button>}
    {openConfirm && <Button onClick={openConfirm} bsStyle='danger'>Delete</Button>}
  </div>
</form>;
