// import React from 'react';
import { fromJS } from 'immutable';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  DELETE_MODAL_COMPONENT,
  ModalActionTypes,
  ADD_POPOUT_DIALOG,
  DELETE_POPOUT_DIALOG
} from './actions';
import { SCOPE_NAME } from './constants';

const initialState = fromJS({
  component: undefined,
  title: undefined,
  show: false,
  popout: {},
});

const name = SCOPE_NAME;

const reducer = (state = initialState, action : ModalActionTypes) => {
  const { payload, type } = action;
  switch (type) {
    case OPEN_MODAL:
      return state
        .set('component', payload.component)
        .set('title', payload.title)
        .set('disableCloseButton', !!payload.disableCloseButton)
        .set('show', true);
    case CLOSE_MODAL:
      return state
        .set('show', false);
    case DELETE_MODAL_COMPONENT:
      return state
        .set('component', undefined)
        .set('title', undefined);

    case ADD_POPOUT_DIALOG:
        const { fixedId } = payload;
        return state
          .setIn(['popout', `${fixedId || (new Date()).getTime()}`], fromJS(payload))

    case DELETE_POPOUT_DIALOG:
      return state.deleteIn(['popout', payload]);

    default:
      return state;
  }
}

export default {
  name,
  reducer
}
