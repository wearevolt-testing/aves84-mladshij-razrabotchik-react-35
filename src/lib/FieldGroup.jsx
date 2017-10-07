import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

export default ({id, label, help, ...props}) => <FormGroup controlId={id}>
  <ControlLabel>{label}</ControlLabel>
  <FormControl {...props} />
  {help && <HelpBlock>{help}</HelpBlock>}
</FormGroup>;
