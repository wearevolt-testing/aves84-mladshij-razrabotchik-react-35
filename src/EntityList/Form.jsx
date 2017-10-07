import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';

import FieldGroup from '../lib/FieldGroup';

const Form = (props, context) => {
  let form, title, show = true;

  switch (props.type) {
    case 'create': title = `Create new ${context.title}`; break;
    case 'edit': title = `Edit ${context.title}`; break;
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
        {context.fields.map(([k, v]) => <FieldGroup key={k} id={k} label={v} defaultValue={entry[k]} />)}
      </form>
    </Modal.Body>

    <Modal.Footer>
      <Button type='submit' bsStyle='primary' onClick={onSubmit}>Submit</Button>
    </Modal.Footer>
  </Modal>;
};

Form.contextTypes = {
  title: PropTypes.string,
  fields: PropTypes.array
};


export default Form;
