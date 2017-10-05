import React from 'react';
import {Table, Button} from 'react-bootstrap';


class TableRow extends React.PureComponent {
  constructor() {
    super();
  }
  render() {
    return <tr onClick={() => this.props.onClick(this.props.id)}>
      <td>{this.props.i}</td>
      <td>{this.props.name}</td>
      <td>{this.props.address}</td>
      <td>{this.props.phone}</td>
    </tr>;
  }
}


export default props => <div className='list'>
  <h1>Customer list</h1><Button onClick={() => props.openCustomerForm('create')}>Create</Button>
  <Table condensed hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Address</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      {props.customers.list.map((e, i) => <TableRow
        key={e}
        i={i}
        {...props.customers.data[e]}
        onClick={props.openCustomer}
      />)}
    </tbody>
  </Table>
</div>;
