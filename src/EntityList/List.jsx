import React from 'react';
import {Table, Button} from 'react-bootstrap';


class TableRow extends React.PureComponent {
  constructor() {
    super();
  }
  render() {
    return <tr onClick={() => this.props.onClick(this.props.id)}>
      <td>{this.props.i}</td>
      {this.props.fields.map(([k]) => <td key={k}>{this.props[k]}</td>)}
    </tr>;
  }
}


export default props => <div className='list'>
  <h1>{props.title} list</h1><Button onClick={() => props.openForm('create')}>Create</Button>
  <Table condensed hover>
    <thead>
      <tr>
        <th>#</th>
        {props.fields.map(([k, v]) => <th key={k}>{v}</th>)}
      </tr>
    </thead>
    <tbody>
      {props.list.map((e, i) => <TableRow
        key={e}
        i={i}
        fields={props.fields}
        {...props.data[e]}
        onClick={props.openEntry}
      />)}
    </tbody>
  </Table>
</div>;
