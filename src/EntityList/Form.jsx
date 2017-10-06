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
    case 'create': title = `Create new ${props.title}`; break;
    case 'edit': title = `Edit ${props.title}`; break;
    default: show = false;
  }

  function onSubmit() {
    props.handleSubmit(Array.prototype.reduce.call(
      form.querySelectorAll('input'),
      (s, e) => (s[e.id] = e.value, s), {}
    ), props.type);
  }

  const entry = props.data[props.id] || {};
  return <Modal show={show} onHide={props.onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
      <form onSubmit={onSubmit} ref={c => form = c}>
        {props.fields.map(([k, v]) => <FieldGroup key={k} id={k} label={v} defaultValue={entry[k]} />)}
      </form>
    </Modal.Body>
    
    <Modal.Footer>
      <Button type='submit' bsStyle='primary' onClick={onSubmit}>Submit</Button>
    </Modal.Footer>
  </Modal>;
};
