import React from 'react';
import {Button, Modal} from 'react-bootstrap';


const ListEntry = props => <li>
  <h5>{props.header}</h5>
  <p>{props.value}</p>
</li>;


export default props => {
  const customer = props.customers[props.id];
  
  return <Modal show={customer != null} onHide={props.onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Customer</Modal.Title>
    </Modal.Header>
  
      
    {customer != null && <Modal.Body>
      <ul className='headers'>
        <ListEntry header='Name' value={customer.name} />
        <ListEntry header='Address' value={customer.address} />
        <ListEntry header='Phone' value={customer.phone} />
      </ul>
    </Modal.Body>}
    
    <Modal.Footer>
      <Button bsStyle='warning' onClick={() => props.openCustomerForm('edit')}>Edit</Button>
      <Button bsStyle='danger' onClick={props.handleDelete}>Delete</Button>
    </Modal.Footer>
  </Modal>;
};
