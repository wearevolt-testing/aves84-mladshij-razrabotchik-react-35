import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import {createAction} from 'redux-actions';
import request from 'superagent';

import createApiActions from './createApiActions';
import createApiReducer from './createApiReducer';


export const customerActions = createApiActions('customer', 'customers');
export const productActions = createApiActions('product', 'products');
export const invoiceActions = createApiActions('invoice', 'invoices');
export const invoiceItemActions = {
  getList:  createAction(
    'ITEM_LIST',
    async invoice_id => (await request.get(`/api/invoices/${invoice_id}/items`)).body
  ),
  create: createAction(
    'ITEM_CREATE',
    async (invoice_id, data) => (await request.post(`/api/invoices/${invoice_id}/items`).send(data)).body
  ),
  read: createAction(
    'ITEM__READ',
    async (invoice_id, id) => (await request.get(`/api/invoices/${invoice_id}/items/${id}`)).body
  ),
  update: createAction(
    'ITEM_UPDATE',
    async (invoice_id, id, data) => (await request.put(`/api/invoices/${invoice_id}/items/${id}`).send(data)).body
  ),
  del: createAction(
    'ITEM_DELETE',
    async (invoice_id, id) => (await request.delete(`/api/invoices/${invoice_id}/items/${id}`)).body
  ),
  clear: createAction('CLEAR_ITEMS')
};


export default createStore(
  combineReducers({
    customers: createApiReducer(customerActions),
    products: createApiReducer(productActions),
    invoices: createApiReducer(invoiceActions),
    invoiceItems: createApiReducer(invoiceItemActions, {'CLEAR_ITEMS': () => ({list: [], data: {}})})
  }),
  compose(
    applyMiddleware(promiseMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
