import React from 'react';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const DELETE_MODAL_COMPONENT = 'DELETE_MODAL_COMPONENT';

export const ADD_POPOUT_DIALOG = 'ADD_POPOUT_DIALOG';
export const DELETE_POPOUT_DIALOG = 'DELETE_POPOUT_DIALOG';

export interface OpenModalAction {
  type: typeof OPEN_MODAL;
  payload: {
    component: React.ComponentElement<any, any>,
    title? : string,
    disableCloseButton? : boolean
  }
}

export interface CloseModalAction {
  type: typeof CLOSE_MODAL;
  payload? : any;
}

export interface DeleteModalComponentAction {
  type: typeof DELETE_MODAL_COMPONENT;
  payload? : any;
}

export interface AddPopoutDialogAction {
  type: typeof ADD_POPOUT_DIALOG,
  payload: {
    message : string;
    fixedId? : string;
  }
}

export interface DeletePopoutDialogAction {
  type : typeof DELETE_POPOUT_DIALOG,
  payload : string;
}

export type ModalActionTypes =
  OpenModalAction |
  CloseModalAction |
  DeleteModalComponentAction |
  AddPopoutDialogAction |
  DeletePopoutDialogAction;
