import React from 'react';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux'
import rootReducer, { history } from 'reducers';
import rootEpics from 'epics';
import 'index.css';
import App from 'App';
import THEME from 'constants/theme';
import * as serviceWorker from './serviceWorker';

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(
    routerMiddleware(history),
    epicMiddleware,
  )
);

epicMiddleware.run(rootEpics);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={THEME}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
