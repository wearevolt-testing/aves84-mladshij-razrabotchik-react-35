import React from 'react';
import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';


const FieldGroup = ({id, label, help, ...props}) => <FormGroup controlId={id}>
  <ControlLabel>{label}</ControlLabel>
  <FormControl {...props} />
  {help && <HelpBlock>{help}</HelpBlock>}
</FormGroup>;


export default props => {
  let form, title, show = true;
  
  switch (props.type) {
    case 'create': title = 'Create new customer'; break;
    case 'edit': title = 'Edit customer'; break;
    default: show = false;
  }

  function onSubmit() {
    props.handleSubmit(Array.prototype.reduce.call(
      form.querySelectorAll('input'),
      (s, e) => (s[e.id] = e.value, s), {}
    ), props.type);
  }

  const {name, address, phone} = props.customers[props.id] || {};

  return <Modal show={show} onHide={props.onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
      <form onSubmit={onSubmit} ref={c => form = c}>
        <FieldGroup id={'name'} label={'Name'} defaultValue={name} />
        <FieldGroup id={'address'} label={'Address'} defaultValue={address} />
        <FieldGroup id={'phone'} label={'Phone'} defaultValue={phone} />
      </form>
    </Modal.Body>
    
    <Modal.Footer>
      <Button type='submit' bsStyle='primary' onClick={onSubmit}>Submit</Button>
    </Modal.Footer>
  </Modal>;
};
