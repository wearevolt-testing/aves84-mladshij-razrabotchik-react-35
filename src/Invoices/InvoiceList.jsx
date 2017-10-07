import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Table, Button} from 'react-bootstrap';


class TableRow extends React.PureComponent {
  render() {
    return <tr>
      <td>{this.props.i}</td>
      {this.props.fields.map(([k]) => <td key={k}>{this.props[k]}</td>)}
      <td><Link to={`/invoices/${this.props.id}/edit`}>edit</Link></td>
    </tr>;
  }
}

export default class InvoiceList extends React.Component {
  fields = [['customer', 'Customer'], ['discount', 'Discount'], ['total', 'Total'], ['edit', '']];

  componentWillMount() {
    this.props.getList();
    this.props.getCustomerList();
    this.composeListData(this.props.customers, this.props.invoices);
  }

  componentWillReceiveProps(nextProps) {
    this.composeListData(nextProps.customers, nextProps.invoices);
  }

  composeListData(customers, invoices) {
    this.listData = invoices.list.map(e => {
      const {id, customer_id, discount, total} = invoices.data[e];
      const customer = customers.data[customer_id] !== undefined ? customers.data[customer_id].name : 'Unknown';
      return {id, customer, discount, total};
    });
  }

  render() {
    return <Grid className='invoices list'>
      <h1>Invoice list</h1><Button onClick={() => this.props.history.push('/invoices/create')}>Create</Button>
      <Table condensed hover>
        <thead>
          <tr>
            <th>#</th>
            {this.fields.map(([k, v]) => <th key={k}>{v}</th>)}
            <th />
          </tr>
        </thead>
        <tbody>
          {this.listData.map((e, i) => <TableRow key={e.id} fields={this.fields} i={i + 1} {...e} />)}
        </tbody>
      </Table>
    </Grid>;
  }
}
