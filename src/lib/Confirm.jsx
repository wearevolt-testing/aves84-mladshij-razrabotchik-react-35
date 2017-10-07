import React from 'react';
import {Button, Modal} from 'react-bootstrap';


export default props => <Modal show={props.show} onHide={props.onHide}>
  <Modal.Header>
    <Modal.Title>Confirmation required</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {props.message}
  </Modal.Body>

  <Modal.Footer>
    <Button bsStyle='primary' onClick={props.onHide}>Cancel</Button>
    <Button bsStyle='danger' onClick={props.confirm}>Confirm</Button>
  </Modal.Footer>
</Modal>;
