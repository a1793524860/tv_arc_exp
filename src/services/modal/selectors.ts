import { useSelector } from 'react-redux';
import { SCOPE_NAME } from './constants';
import { fromJS } from 'immutable';

export const useModalComponent = () =>
  useSelector((state : any) => state[SCOPE_NAME].get('component'));

export const useModalTitle = () =>
  useSelector((state : any) => state[SCOPE_NAME].get('title'));

export const useModalToggle = () =>
  useSelector((state : any) => state[SCOPE_NAME].get('show'));

export const useModalDisableCloseBUtton = () =>
  useSelector((state : any) => state[SCOPE_NAME].get('disableCloseButton'));

export const usePopoutDialog = () =>
  useSelector((state : any) => state[SCOPE_NAME].get('popout'), fromJS({}));