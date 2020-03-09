export const LOGIN = 'LOGIN';
export const RECEIVED_USER_PROFILE = 'RECEIVED_USER_PROFILE';

export const LOGOUT = 'LOGOUT';

export interface LoginAction {
  type: typeof LOGIN;
  payload: {
    channel : string,
    username : string,
    password : string
  };
}

export interface ReceivedUserProfileAction {
  type: typeof RECEIVED_USER_PROFILE;
  payload: any;
}

export interface LogoutAction {
  type: typeof LOGOUT;
  payload : any
}

export type LoginActionTypesForReducer = (
  ReceivedUserProfileAction |
  LogoutAction
);