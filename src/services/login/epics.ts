import { ActionsObservable } from "redux-observable";
import { push } from 'connected-react-router';
import { ofType } from 'redux-observable';
import { of, empty } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import api from 'services/api'

import { updateSessionHeaders } from 'services/api/config';

import { displayMessage, closeModal } from 'services/modal';

import * as routes from 'constants/routes';
import {
  LOGIN, LoginAction,
  LOGOUT, LogoutAction
} from './actions';
import { receivedUserProfile } from './index';

const loginEpic = (action$ : ActionsObservable<LoginAction>) => action$.pipe(
  ofType(LOGIN),
  switchMap(({ payload }) => {
    return api.login(payload)
      .pipe(
        switchMap((ret) => {
          const { data } = ret || { };
          const { body } = data || {};
          const { jti } = body || {};
          if (!jti) {
            return of(displayMessage('登入失敗', '登入失敗'));
          } else {
            updateSessionHeaders(jti);
            return (
              of(
                receivedUserProfile(body),
                push(routes.MAIN),
                closeModal(),
              )
            );
          }
        }),
        catchError(() => of(
          displayMessage('登入失敗', '登入失敗')
        ))
      )
  }),
);

const logoutEpic = (
  action$ : ActionsObservable<LogoutAction>
) => action$.pipe(
  ofType(LOGOUT),
  switchMap(() => (
    empty()
  ))
);

export default [
  loginEpic,
  logoutEpic
];
