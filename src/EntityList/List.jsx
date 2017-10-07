import React from 'react';
import PropTypes from 'prop-types';
import {Table, Button} from 'react-bootstrap';


class TableRow extends React.PureComponent {
  render() {
    return <tr onClick={() => this.props.onClick(this.props.id)}>
      <td>{this.props.i}</td>
      {this.props.fields.map(([k]) => <td key={k}>{this.props[k]}</td>)}
    </tr>;
  }
}

const List = (props, context) => <div className='list'>
  <h1>{context.title} list</h1><Button onClick={() => props.openForm('create')}>Create</Button>
  <Table condensed hover>
    <thead>
      <tr>
        <th>#</th>
        {context.fields.map(([k, v]) => <th key={k}>{v}</th>)}
      </tr>
    </thead>
    <tbody>
      {props.list.map((e, i) => <TableRow
        key={e}
        fields={context.fields}
        i={i + 1}
        {...props.data[e]}
        onClick={props.openEntry}
      />)}
    </tbody>
  </Table>
</div>;

List.contextTypes = {
  title: PropTypes.string,
  fields: PropTypes.array
};


export default List;
