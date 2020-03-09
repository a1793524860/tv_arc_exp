import MockAdapter from 'axios-mock-adapter'


import configureLogin from './login';
import configureTodo from './todo';

const configureMockApi = (mock : MockAdapter) => {
  [
    configureLogin,
    configureTodo
  ].forEach(func => func(mock));

  mock.onAny().passThrough();
}

export default configureMockApi;