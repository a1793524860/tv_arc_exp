import React from 'react';
import styled from 'styled-components';

import {
  OpenModalAction,
  CloseModalAction,
  DeleteModalComponentAction,
  OPEN_MODAL,
  CLOSE_MODAL,
  DELETE_MODAL_COMPONENT,
  ADD_POPOUT_DIALOG, AddPopoutDialogAction,
  DELETE_POPOUT_DIALOG, DeletePopoutDialogAction,
} from './actions';

export const addModal = (
  component : React.ComponentElement<any, any>,
  title? : string,
  disableCloseButton? : boolean
) : OpenModalAction => ({
  type: OPEN_MODAL,
  payload: {
    component,
    title,
    disableCloseButton
  }
});

export const closeModal = () : CloseModalAction => ({
  type: CLOSE_MODAL,
  payload: undefined
});

export const deleteModalComponent = () : DeleteModalComponentAction => ({
  type: DELETE_MODAL_COMPONENT,
  payload: undefined
});


const MessageWrapper = styled.div`
  min-width: 400px;
  padding: 20px;
`;

export const displayMessage = (message : string, title : string, disableCloseButton? : boolean) : OpenModalAction => ({
  type: OPEN_MODAL,
  payload : {
    component: (<MessageWrapper>{message}</MessageWrapper>),
    title,
    disableCloseButton
  }
})

export const addPopoutDialog = (message : string, fixedId? : string) : AddPopoutDialogAction=> ({
  type: ADD_POPOUT_DIALOG,
  payload: { message, fixedId }
});

export const deletePopoutDialog = (id : string) : DeletePopoutDialogAction => ({
  type : DELETE_POPOUT_DIALOG,
  payload : id,
});