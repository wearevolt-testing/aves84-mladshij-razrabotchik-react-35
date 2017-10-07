import {createAction} from 'redux-actions';
import request from 'superagent';


export default function createApiActions(name, url) {
  const NAME = name.toUpperCase();

  return {
    getList:  createAction(
      `${NAME}_LIST`,
      async () => (await request.get(`/api/${url}`)).body
    ),
    create: createAction(
      `${NAME}_CREATE`,
      async data => (await request.post(`/api/${url}`).send(data)).body
    ),
    read: createAction(
      `${NAME}_READ`,
      async id => (await request.get(`/api/${url}/${id}`)).body
    ),
    update: createAction(
      `${NAME}_UPDATE`,
      async (id, data) => (await request.put(`/api/${url}/${id}`).send(data)).body
    ),
    del: createAction(
      `${NAME}_DELETE`,
      async id => (await request.delete(`/api/${url}/${id}`)).body
    )
  };
}
