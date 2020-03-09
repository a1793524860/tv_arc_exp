import apiClient, { promiseToObservable } from '../config';

export const getTodoList = async () => (
  apiClient.get('/insm/todoList')
);

export const getTodoItem = async (todoId : string) => (
  apiClient.get(`/insm/todo/${todoId}`)
);

export const updateTodo = async (todoId : string, data : any) => (
  apiClient.put(`/insm/todo/${todoId}`, data)
);

export const addTodo = async (data : any) => (
  apiClient.post(`/insm/todo/`, data)
);

(window as any).test = {
  getTodoItem, getTodoList, updateTodo, addTodo
};

export default {
  // getTodoList: promiseToObservable(getTodoList),
};
