import { ActionsObservable } from "redux-observable";

import { ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';

import { CLOSE_MODAL, CloseModalAction } from './actions';
import { deleteModalComponent } from './index';

const closeModalEpic = (action$ : ActionsObservable<CloseModalAction>) => action$.pipe(
  ofType(CLOSE_MODAL),
  delay(500),
  mapTo(deleteModalComponent()),
);

export default [
  closeModalEpic
];