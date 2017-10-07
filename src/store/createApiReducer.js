import {handleActions, combineActions} from 'redux-actions';


export default function createApiReducer({getList, create, read, update, del}, additional = {}) {
  return handleActions({
    [getList]: (state, action) => action.payload.reduce((s, e) => {
      s.list.push(e.id);
      s.data[e.id] = e;
      return s;
    }, {list: [], data: {}}),
    [combineActions(create, read, update)]: (state, action) => {
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
    },
    ...additional
  }, {list: [], data: {}});
}
