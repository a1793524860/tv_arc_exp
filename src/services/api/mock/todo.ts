import MockAdapter from 'axios-mock-adapter';

const genId = () => `todo-${Date.now()}`;

const getTodoFromLocalStorage = (todoId : string) => {
  return JSON.parse(localStorage.getItem(todoId) as string)
}
const setTodoToLocalStorage = (todoId : string, data : any) => {
  localStorage.setItem(todoId, data);
}

const configureTodo = (mock : MockAdapter) => {

  mock.onGet('/insm/todoList').reply(() => {

    const list = Object
      .keys(localStorage)
      .filter(key => (key.indexOf('todo-') === 0))
      .map(key => (key))

    return [
      200,
      { body: list, status: 'Y' }
    ];
  });

  mock.onGet(new RegExp('/insm/todo/(.*)')).reply((config) => {
    const { url } = config;
    const splitted = (url || '').split('/');
    const [,,,todoId] = splitted;
    const data = getTodoFromLocalStorage(todoId);
    return [
      200,
      {
        body: data,
        message: "string",
        status: "Y"

      }
    ]
  });

  mock.onPut(new RegExp('/insm/todo/(.*)')).reply((config) => {
    const { url, data } = config;
    const splitted = (url || '').split('/');
    const [,,,todoId] = splitted;
    setTodoToLocalStorage(todoId, data);
    return [
      200,
      { message: '', status: 'Y' }
    ]
  });

  mock.onPost('/insm/todo/').reply((config) => {
    const { data } = config;
    const todoId = genId();
    setTodoToLocalStorage(todoId, data);
    return [
      200,
      { message: '', status: 'Y' }
    ]
  });
}

export default configureTodo;
