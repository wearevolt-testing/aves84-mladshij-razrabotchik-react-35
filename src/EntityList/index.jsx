import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid} from 'react-bootstrap';
import {Helmet} from 'react-helmet';

import List from './List';
import Entry from './Entry';
import Form from './Form';
import Confirm from '../lib/Confirm';
import withContext from '../lib/withContext';


class EntityList extends React.Component {
  static contextTypes = {
    name: PropTypes.string
  };

  state = {};

  componentWillMount() {
    this.props.getList();
  }

  openForm = type => this.setState({form: type});
  closeForm = () => this.setState({form: false});
  openEntry = id => this.setState({id: id});
  closeEntry = () => this.setState({id: null});
  openConfirm = () => this.setState({confirm: true});
  closeConfirm = () => this.setState({confirm: false});

  handleSubmit = (data, type) => {
    switch (type) {
      case 'create': this.props.create(data); break;
      case 'edit': this.props.update(this.state.id, data); break;
    }
    this.closeForm();
  };

  handleDelete = () => {
    this.props.del(this.state.id);
    this.closeConfirm();
    this.closeEntry();
  };

  render() {
    return <Grid className={`${this.context.name} entity-list`}>
      <Helmet>
        <title>{this.props.title}</title>
      </Helmet>

      <List
        list={this.props.list}
        data={this.props.data}
        openForm={this.openForm}
        openEntry={this.openEntry}
      />

      <Entry
        id={this.state.id}
        data={this.props.data}
        openForm={this.openForm}
        onDeleteClick={this.openConfirm}
        onHide={this.closeEntry}
      />

      <Form
        type={this.state.form}
        id={this.state.id}
        list={this.props.list}
        data={this.props.data}
        handleSubmit={this.handleSubmit}
        onHide={this.closeForm}
      />

      <Confirm
        show={this.state.confirm}
        onHide={this.closeConfirm}
        message={this.state.id && `Confirm deletion of the ${this.context.name} ${this.props.data[this.state.id].name}`}
        confirm={this.handleDelete}
      />
    </Grid>;
  }
}


export default function createListComponent({name, title, fields, mapState, actions}) {
  return connect(mapState, actions)(withContext(EntityList, {name, title, fields}));
}
