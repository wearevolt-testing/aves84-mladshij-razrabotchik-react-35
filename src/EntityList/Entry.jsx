import React from 'react';
import {Button, Modal} from 'react-bootstrap';


const ListEntry = props => <li>
  <h5>{props.header}</h5>
  <p>{props.value}</p>
</li>;


export default props => {
  const entry = props.data[props.id];
  
  return <Modal show={entry != null} onHide={props.onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
  
      
    {entry != null && <Modal.Body>
      <ul className='headers'>
        {props.fields.map(([k, v]) => <ListEntry key={k} header={v} value={entry[k]} />)}
      </ul>
    </Modal.Body>}
    
    <Modal.Footer>
      <Button bsStyle='warning' onClick={() => props.openForm('edit')}>Edit</Button>
      <Button bsStyle='danger' onClick={props.onDeleteClick}>Delete</Button>
    </Modal.Footer>
  </Modal>;
};
