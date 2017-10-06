import React from 'react';
import {createActions, handleActions, combineActions} from 'redux-actions';
import {connect} from 'react-redux';
import {Grid} from 'react-bootstrap';
import {Helmet} from 'react-helmet';
import request from 'superagent';

import List from './List';
import Entry from './Entry';
import Form from './Form';
import ConfirmModal from './Confirm';

export default function createListComponent({name, url, fields, stateName}) {
  const NAME = name.toUpperCase();
  const title = name[0].toUpperCase() + name.substring(1);
  
  const actions = createActions({
    [`${NAME}_LIST`]: async () => (await request.get(`/api/${url}`)).body,
    [`${NAME}_CREATE`]: async data => (await request.post(`/api/${url}`).send(data)).body,
    [`${NAME}_UPDATE`]: async (data, id) => (await request.put(`/api/${url}/${id}`).send(data)).body,
    [`${NAME}_DELETE`]: async id => (await request.delete(`/api/${url}/${id}`)).body,
  });

  const {
    [`${name}List`]: getList,
    [`${name}Create`]: create,
    [`${name}Update`]: update,
    [`${name}Delete`]: del,
  } = actions;
  
  const reducer = handleActions({
    [getList]: (state, action) => action.payload.reduce((s, e) => {
      s.list.push(e.id);
      s.data[e.id] = e;
      return s;
    }, {list: [], data: {}}),
    [combineActions(create, update)]: (state, action) => {
      const {id} = action.payload;
      const list = state.list.indexOf(id) === -1 ? state.list.concat(id) : state.list;
      const data = {...state.data, [id]: action.payload};
      return {list, data};
    },
    [del]: (state, action) => {
      const {id} = action.payload;
      return state.list.reduce((s, e) => {
        if (e !== id) {
          s.list.push(e);
          s.data[e] = state.data[e];
        }
        return s;
      }, {list: [], data: {}});
    }
  }, {list: [], data: {}});

  const Component = connect(state => state[stateName], {getList, create, update, del})(
    class extends React.Component {
      state = {};
      
      componentDidMount() {
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
          case 'edit': this.props.update(data, this.state.id); break;
        }
        this.closeForm();
      };
      
      handleDelete = () => {
        this.props.del(this.state.id);
        this.closeConfirm();
        this.closeEntry();
      };
      
      render() {
        return <Grid className={`${name} entity-list`}>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          
          <List
            title={title}
            fields={fields}
            list={this.props.list}
            data={this.props.data}
            openForm={this.openForm}
            openEntry={this.openEntry}
          />
          
          <Entry
            title={title}
            fields={fields}
            id={this.state.id}
            data={this.props.data}
            openForm={this.openForm}
            onDeleteClick={this.openConfirm}
            onHide={this.closeEntry}
          />
          
          <Form
            title={title}
            fields={fields}
            type={this.state.form}
            id={this.state.id}
            list={this.props.list}
            data={this.props.data}
            handleSubmit={this.handleSubmit}
            onHide={this.closeForm}
          />
          
          <ConfirmModal
            show={this.state.confirm}
            onHide={this.closeConfirm}
            message={this.state.id && `Confirm deletion of the ${name} ${this.props.data[this.state.id].name}`}
            confirm={this.handleDelete}
          />
        </Grid>;
      }
    }
  );

  return {Component, reducer};
}
