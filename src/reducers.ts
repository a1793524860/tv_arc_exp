import { combineReducers, Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import Modal from 'services/modal/reducer';
import Login from 'services/login/reducer';

export const history = createBrowserHistory({ basename: '/insm' });

const reducers : { [name: string] : Reducer } = {
};

interface ReducerObjectInterface {
  name : string;
  reducer : Reducer<any, any>
}

const addReducer = ({ name, reducer } : ReducerObjectInterface) => {
  reducers[name] = reducer;
}

[
  Modal,
  Login,
].forEach(reducer => addReducer(reducer));

export const createRootReducer = (history : any) =>  combineReducers({
  router: connectRouter(history),
  ...reducers
});

export default createRootReducer(history);
